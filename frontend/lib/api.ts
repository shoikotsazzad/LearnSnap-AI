import type { ApiError, ApiSuccess, PrescriptionResult, WhiteboardResult } from "./types";
import type { Language } from "./i18n";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export class ApiRequestError extends Error {}

async function postImage<T>(
  path: string,
  file: File,
  language: Language,
  networkErrorMessage: string
): Promise<T> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("language", language);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ApiRequestError(networkErrorMessage);
  }

  const body = (await response.json().catch(() => null)) as
    | ApiSuccess<T>
    | ApiError
    | null;

  if (!response.ok || !body || body.success === false) {
    throw new ApiRequestError(body?.success === false ? body.message : "Analysis failed");
  }

  return body.data;
}

export function analyzeWhiteboard(
  file: File,
  language: Language,
  networkErrorMessage: string
): Promise<WhiteboardResult> {
  return postImage<WhiteboardResult>("/api/whiteboard/analyze", file, language, networkErrorMessage);
}

export function analyzePrescription(
  file: File,
  language: Language,
  networkErrorMessage: string
): Promise<PrescriptionResult> {
  return postImage<PrescriptionResult>(
    "/api/prescription/analyze",
    file,
    language,
    networkErrorMessage
  );
}
