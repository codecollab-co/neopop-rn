/**
 * Skia layer barrel — exports Skia-backed rendering primitives.
 *
 * - `NeoPop3DSurface`:    five-surface Skia Canvas renderer (face + four parallelogram edges)
 * - `deriveEdgeColors`:   auto-derives darker edge tones from a face color
 * - `computeTiltGeometry`: geometry helper for the tilted-button 3D effect
 * - `SkiaLoadingGuard`:   renders a fallback until the Skia engine is ready
 */
export { NeoPop3DSurface } from './NeoPop3DSurface';
export { deriveEdgeColors } from './EdgeColorDeriver';
export { computeTiltGeometry } from './NeoPopTiltGeometry';
export { SkiaLoadingGuard } from './SkiaLoadingGuard';
export type { NeoPop3DSurfaceProps } from './NeoPop3DSurface';
export type { DerivedEdgeColors, EdgeColorInput } from './EdgeColorDeriver';
export type { TiltConfig, TiltGeometryResult } from './NeoPopTiltGeometry';
