const GemmaServiceError = require('../utils/GemmaServiceError');
const { buildWhiteboardPrompt } = require('./prompts/whiteboardPrompt');
const { buildPrescriptionPrompt } = require('./prompts/prescriptionPrompt');

const MODEL = process.env.GEMMA_MODEL || 'gemma-4-31b-it';
const API_BASE = process.env.GEMMA_API_BASE || 'https://generativelanguage.googleapis.com/v1beta';

function extractJson(rawText) {
  const fenced = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : rawText;

  try {
    return JSON.parse(candidate.trim());
  } catch {
    throw new GemmaServiceError('Gemma returned a response that could not be parsed as JSON', 502);
  }
}

async function callGemmaVision({ promptText, imageBase64, mimeType }) {
  const apiKey = process.env.GEMMA_API_KEY;

  if (!apiKey) {
    throw new GemmaServiceError(
      'GEMMA_API_KEY is not configured on the server, add it to backend/.env',
      503
    );
  }

  const url = `${API_BASE}/models/${MODEL}:generateContent`;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }, { inlineData: { mimeType, data: imageBase64 } }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingLevel: 'minimal' },
        },
      }),
    });
  } catch (err) {
    throw new GemmaServiceError(`Failed to reach Gemma API: ${err.message}`, 502);
  }

  if (!response.ok) {
    const errBody = await response.text().catch(() => '');
    throw new GemmaServiceError(
      `Gemma API request failed (${response.status}): ${errBody || response.statusText}`,
      502
    );
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];

  if (!candidate || candidate.finishReason === 'SAFETY' || !candidate.content?.parts?.length) {
    throw new GemmaServiceError('Gemma did not return usable content for this image', 502);
  }

  const text = candidate.content.parts.map((p) => p.text || '').join('');

  if (!text.trim()) {
    throw new GemmaServiceError('Gemma returned an empty response', 502);
  }

  return text;
}

function sanitizeWhiteboardResult(result) {
  return {
    ...result,
    flashcards: (result.flashcards || []).filter(
      (card) => typeof card?.question === 'string' && typeof card?.answer === 'string'
    ),
    quiz: (result.quiz || []).filter(
      (q) =>
        typeof q?.question === 'string' &&
        Array.isArray(q?.options) &&
        q.options.length === 4 &&
        q.options.every((opt) => typeof opt === 'string') &&
        Number.isInteger(q?.correctIndex) &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3
    ),
  };
}

async function analyzeWhiteboardImage({ imageBase64, mimeType, language }) {
  const promptText = buildWhiteboardPrompt(language);
  const rawText = await callGemmaVision({ promptText, imageBase64, mimeType });
  return sanitizeWhiteboardResult(extractJson(rawText));
}

async function analyzePrescriptionImage({ imageBase64, mimeType, language }) {
  const promptText = buildPrescriptionPrompt(language);
  const rawText = await callGemmaVision({ promptText, imageBase64, mimeType });
  return extractJson(rawText);
}

module.exports = { analyzeWhiteboardImage, analyzePrescriptionImage };
