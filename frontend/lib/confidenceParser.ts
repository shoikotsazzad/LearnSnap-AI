export interface ConfidenceSegment {
  text: string;
  uncertain: boolean;
}

const MARKER_PATTERN = /\[\?\]([\s\S]*?)\[\/\?\]/g;

export function parseConfidenceSegments(input: string): ConfidenceSegment[] {
  if (!input) return [];

  const segments: ConfidenceSegment[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(MARKER_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ text: input.slice(lastIndex, index), uncertain: false });
    }
    segments.push({ text: match[1], uncertain: true });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < input.length) {
    segments.push({ text: input.slice(lastIndex), uncertain: false });
  }

  return segments;
}

export function stripConfidenceMarkers(input: string): string {
  return input ? input.replace(MARKER_PATTERN, "$1") : "";
}
