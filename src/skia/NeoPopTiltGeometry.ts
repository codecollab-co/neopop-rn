/**
 * Computes the parallelogram geometry for NeoPopTiltedButton.
 * All angle constants mirror the Flutter kTiltedButtonAngle / kTiltedButtonPlunkAngle.
 */

export interface TiltConfig {
  width: number;
  height: number;
  depth: number;
  /** Tilt angle in radians. Default: 2π/5 (72°) */
  angle?: number;
  /** Shadow/plunk angle in radians. Default: π/3 (60°) */
  plunkAngle?: number;
  /** Shadow offset distance. Default: 20 */
  shadowDistance?: number;
  /** 'left' tilts top-left, 'right' tilts top-right. Default: 'left' */
  direction?: 'left' | 'right';
}

export interface TiltGeometryResult {
  /** Four corners of the face parallelogram [TL, TR, BR, BL] */
  facePoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
  ];
  /** Four corners of the plunk/shadow parallelogram */
  plunkPoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
  ];
  /** Total canvas width (face + shadow offset) */
  canvasWidth: number;
  /** Total canvas height */
  canvasHeight: number;
}

const DEFAULT_ANGLE       = (2 * Math.PI) / 5;  // 72°
const DEFAULT_SHADOW_DIST = 20;

export function computeTiltGeometry(config: TiltConfig): TiltGeometryResult {
  const {
    width,
    height,
    depth: _depth,
    angle          = DEFAULT_ANGLE,
    shadowDistance = DEFAULT_SHADOW_DIST,
    direction      = 'left',
  } = config;

  const dx = height * Math.tan(angle) * (direction === 'left' ? 1 : -1);
  const canvasWidth  = width + Math.abs(dx) + shadowDistance;
  const canvasHeight = height + shadowDistance;

  // Face parallelogram — skewed horizontally
  const offsetX = direction === 'left' ? Math.abs(dx) : 0;
  const facePoints: TiltGeometryResult['facePoints'] = [
    { x: offsetX + dx, y: 0 },            // Top-left
    { x: offsetX + dx + width, y: 0 },    // Top-right
    { x: offsetX + width, y: height },     // Bottom-right
    { x: offsetX, y: height },             // Bottom-left
  ];

  // Plunk/shadow — offset below and to the right
  const plunkPoints: TiltGeometryResult['plunkPoints'] = [
    { x: facePoints[2].x,                    y: facePoints[2].y },
    { x: facePoints[3].x,                    y: facePoints[3].y },
    { x: facePoints[3].x + shadowDistance,   y: facePoints[3].y + shadowDistance },
    { x: facePoints[2].x + shadowDistance,   y: facePoints[2].y + shadowDistance },
  ];

  return { facePoints, plunkPoints, canvasWidth, canvasHeight };
}
