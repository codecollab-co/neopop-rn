import { deriveEdgeColor } from '../utils/colorUtils';

export interface EdgeColorInput {
  faceColor: string;
  overrides?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export interface DerivedEdgeColors {
  top: string | null;
  right: string;
  bottom: string;
  left: string | null;
}

/**
 * Derive all four edge surface colors from a face color,
 * with optional per-edge manual overrides.
 */
export function deriveEdgeColors(input: EdgeColorInput): DerivedEdgeColors {
  const { right, bottom } = deriveEdgeColor(input.faceColor);
  return {
    top:    input.overrides?.top    ?? null,
    right:  input.overrides?.right  ?? right,
    bottom: input.overrides?.bottom ?? bottom,
    left:   input.overrides?.left   ?? null,
  };
}
