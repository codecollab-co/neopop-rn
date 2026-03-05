/**
 * token-build/tokens.js
 *
 * This script re-exports the NeoPop RN design tokens as a Style Dictionary-
 * compatible JSON input file (tokens.json).
 *
 * Because the source tokens are TypeScript files, we hard-code the extracted
 * values here. When the source primitives change, update this file and re-run:
 *
 *   node tokens.js
 *
 * The generated tokens.json is then consumed by build.js (Style Dictionary).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const tokens = {
  color: {
    black:       { value: '#0d0d0d', type: 'color', comment: 'Base black' },
    white:       { value: '#ffffff', type: 'color', comment: 'Base white' },
    red:         { value: '#EE4D37', type: 'color', comment: 'Base red' },
    yellow:      { value: '#F08D32', type: 'color', comment: 'Base yellow' },
    blue:        { value: '#144CC7', type: 'color', comment: 'Base blue' },
    green:       { value: '#06C270', type: 'color', comment: 'Base green' },
    transparent: { value: 'transparent', type: 'color' },

    popBlack: {
      100: { value: '#8A8A8A', type: 'color', comment: 'Pop Black lightest' },
      200: { value: '#3D3D3D', type: 'color' },
      300: { value: '#161616', type: 'color' },
      400: { value: '#121212', type: 'color' },
      500: { value: '#0d0d0d', type: 'color', comment: 'Pop Black darkest' },
    },

    popWhite: {
      100: { value: '#D2D2D2', type: 'color', comment: 'Pop White darkest' },
      200: { value: '#E0E0E0', type: 'color' },
      300: { value: '#EFEFEF', type: 'color' },
      400: { value: '#FBFBFB', type: 'color' },
      500: { value: '#ffffff', type: 'color', comment: 'Pop White lightest' },
    },

    // Brand palettes (8 steps: lightest → darkest, index 0–7)
    poliPurple: {
      0: { value: '#F5F0FF', type: 'color' },
      1: { value: '#E8DFFF', type: 'color' },
      2: { value: '#D4C4FF', type: 'color' },
      3: { value: '#B59EFF', type: 'color' },
      4: { value: '#7C5CFC', type: 'color', comment: 'NeoPop brand purple' },
      5: { value: '#5B35D5', type: 'color' },
      6: { value: '#3A1FA0', type: 'color' },
      7: { value: '#20104D', type: 'color' },
    },

    orangeSunshine: {
      0: { value: '#FFF5EF', type: 'color' },
      1: { value: '#FFEFE6', type: 'color' },
      2: { value: '#FFD9BF', type: 'color' },
      3: { value: '#FFB985', type: 'color' },
      4: { value: '#FF8C3B', type: 'color', comment: 'NeoPop brand orange' },
      5: { value: '#D96020', type: 'color' },
      6: { value: '#A03610', type: 'color' },
      7: { value: '#4D2914', type: 'color' },
    },

    parkGreen: {
      0: { value: '#F0FFF8', type: 'color' },
      1: { value: '#DDFFF1', type: 'color' },
      2: { value: '#AAFFD9', type: 'color' },
      3: { value: '#6AFFB8', type: 'color' },
      4: { value: '#2ECC84', type: 'color', comment: 'NeoPop brand green' },
      5: { value: '#1A9960', type: 'color' },
      6: { value: '#0F6640', type: 'color' },
      7: { value: '#124D34', type: 'color' },
    },

    pinkPong: {
      0: { value: '#FFF0F3', type: 'color' },
      1: { value: '#FFE1E9', type: 'color' },
      2: { value: '#FFC2D1', type: 'color' },
      3: { value: '#FF8DAA', type: 'color' },
      4: { value: '#FF4D72', type: 'color', comment: 'NeoPop brand pink' },
      5: { value: '#CC2248', type: 'color' },
      6: { value: '#99132C', type: 'color' },
      7: { value: '#4D1421', type: 'color' },
    },

    mannna: {
      0: { value: '#FFFDF0', type: 'color' },
      1: { value: '#FFF8E5', type: 'color' },
      2: { value: '#FFF0BF', type: 'color' },
      3: { value: '#FFE080', type: 'color' },
      4: { value: '#FFCC33', type: 'color', comment: 'NeoPop brand mannna yellow' },
      5: { value: '#CC9900', type: 'color' },
      6: { value: '#996600', type: 'color' },
      7: { value: '#4D3D15', type: 'color' },
    },

    neoPaccha: {
      0: { value: '#FAFFF0', type: 'color' },
      1: { value: '#FBFFE6', type: 'color' },
      2: { value: '#F2FFBF', type: 'color' },
      3: { value: '#E0FF80', type: 'color' },
      4: { value: '#BBFF33', type: 'color', comment: 'NeoPop brand neo paccha' },
      5: { value: '#88CC00', type: 'color' },
      6: { value: '#557A00', type: 'color' },
      7: { value: '#454C13', type: 'color' },
    },

    yoyo: {
      0: { value: '#FAF0FF', type: 'color' },
      1: { value: '#F4E5FF', type: 'color' },
      2: { value: '#E8CCFF', type: 'color' },
      3: { value: '#D1A3FF', type: 'color' },
      4: { value: '#A94DFF', type: 'color', comment: 'NeoPop brand yoyo purple' },
      5: { value: '#7B1FD4', type: 'color' },
      6: { value: '#52119E', type: 'color' },
      7: { value: '#33134D', type: 'color' },
    },

    semantic: {
      error: {
        0: { value: '#FCE2DD', type: 'color' },
        1: { value: '#F9C4BB', type: 'color' },
        2: { value: '#F59D90', type: 'color' },
        3: { value: '#F17060', type: 'color' },
        4: { value: '#EE4D37', type: 'color', comment: 'Semantic error default' },
      },
      warning: {
        0: { value: '#FBDDC2', type: 'color' },
        1: { value: '#F8C49A', type: 'color' },
        2: { value: '#F5A870', type: 'color' },
        3: { value: '#F29848', type: 'color' },
        4: { value: '#F08D32', type: 'color', comment: 'Semantic warning default' },
      },
      info: {
        0: { value: '#C2D0F2', type: 'color' },
        1: { value: '#9BB0E8', type: 'color' },
        2: { value: '#6E8EDC', type: 'color' },
        3: { value: '#4068CF', type: 'color' },
        4: { value: '#144CC7', type: 'color', comment: 'Semantic info default' },
      },
      success: {
        0: { value: '#E6F9F1', type: 'color' },
        1: { value: '#BFEDDA', type: 'color' },
        2: { value: '#86DDB8', type: 'color' },
        3: { value: '#3ECA8A', type: 'color' },
        4: { value: '#06C270', type: 'color', comment: 'Semantic success default' },
      },
    },
  },

  spacing: {
    0:   { value: 0,  type: 'dimension' },
    1:   { value: 4,  type: 'dimension' },
    2:   { value: 8,  type: 'dimension' },
    3:   { value: 12, type: 'dimension' },
    4:   { value: 16, type: 'dimension' },
    5:   { value: 20, type: 'dimension' },
    6:   { value: 24, type: 'dimension' },
    7:   { value: 28, type: 'dimension' },
    8:   { value: 32, type: 'dimension' },
    9:   { value: 36, type: 'dimension' },
    10:  { value: 40, type: 'dimension' },
    12:  { value: 48, type: 'dimension' },
    14:  { value: 56, type: 'dimension' },
    16:  { value: 64, type: 'dimension' },
    xs:  { value: 4,  type: 'dimension', comment: 'Extra small spacing' },
    sm:  { value: 8,  type: 'dimension', comment: 'Small spacing' },
    md:  { value: 16, type: 'dimension', comment: 'Medium spacing' },
    lg:  { value: 24, type: 'dimension', comment: 'Large spacing' },
    xl:  { value: 32, type: 'dimension', comment: 'Extra large spacing' },
    '2xl': { value: 48, type: 'dimension', comment: '2x extra large spacing' },
    buttonDepth:             { value: 3,  type: 'dimension', comment: 'Button 3D depth' },
    buttonDepthTilted:       { value: 8,  type: 'dimension', comment: 'Tilted button 3D depth' },
    cardDepth:               { value: 3,  type: 'dimension', comment: 'Card 3D depth' },
    bottomSheetNotchHeight:  { value: 4,  type: 'dimension' },
    bottomSheetNotchWidth:   { value: 40, type: 'dimension' },
    bottomSheetBorderRadius: { value: 16, type: 'dimension' },
  },

  opacity: {
    0:        { value: 0,    type: 'other' },
    5:        { value: 0.05, type: 'other' },
    10:       { value: 0.1,  type: 'other' },
    20:       { value: 0.2,  type: 'other' },
    30:       { value: 0.3,  type: 'other' },
    40:       { value: 0.4,  type: 'other' },
    50:       { value: 0.5,  type: 'other' },
    60:       { value: 0.6,  type: 'other' },
    70:       { value: 0.7,  type: 'other' },
    80:       { value: 0.8,  type: 'other' },
    90:       { value: 0.9,  type: 'other' },
    95:       { value: 0.95, type: 'other' },
    100:      { value: 1,    type: 'other' },
    disabled: { value: 0.4,  type: 'other', comment: 'Disabled element opacity' },
    overlay:  { value: 0.6,  type: 'other', comment: 'Overlay opacity' },
    shimmer:  { value: 0.5,  type: 'other', comment: 'Shimmer opacity' },
    pressed:  { value: 0.8,  type: 'other', comment: 'Pressed state opacity' },
    hint:     { value: 0.6,  type: 'other', comment: 'Hint text opacity' },
  },

  typography: {
    fontFamily: {
      heading:      { value: 'System',  type: 'fontFamily' },
      caps:         { value: 'System',  type: 'fontFamily' },
      body:         { value: 'System',  type: 'fontFamily' },
      serifHeading: { value: 'Georgia', type: 'fontFamily' },
    },
    fontWeight: {
      extraBold: { value: '800', type: 'fontWeight' },
      bold:      { value: '700', type: 'fontWeight' },
      semiBold:  { value: '600', type: 'fontWeight' },
      medium:    { value: '500', type: 'fontWeight' },
      regular:   { value: '400', type: 'fontWeight' },
      thin:      { value: '300', type: 'fontWeight' },
    },
    lineHeightMultiplier: {
      heading:      { value: 1.2,  type: 'other' },
      caps:         { value: 1.3,  type: 'other' },
      body:         { value: 1.5,  type: 'other' },
      serifHeading: { value: 1.15, type: 'other' },
    },
    letterSpacing: {
      heading:      { value: -0.5, type: 'other' },
      caps:         { value: 1.5,  type: 'other' },
      body:         { value: 0,    type: 'other' },
      serifHeading: { value: -0.3, type: 'other' },
    },
  },

  button: {
    size: {
      big: {
        height:            { value: 50, type: 'dimension' },
        paddingHorizontal: { value: 30, type: 'dimension' },
        iconHeight:        { value: 20, type: 'dimension' },
        fontSize:          { value: 16, type: 'dimension' },
        borderRadius:      { value: 0,  type: 'dimension' },
      },
      medium: {
        height:            { value: 40, type: 'dimension' },
        paddingHorizontal: { value: 20, type: 'dimension' },
        iconHeight:        { value: 16, type: 'dimension' },
        fontSize:          { value: 14, type: 'dimension' },
        borderRadius:      { value: 0,  type: 'dimension' },
      },
      small: {
        height:            { value: 30, type: 'dimension' },
        paddingHorizontal: { value: 25, type: 'dimension' },
        iconHeight:        { value: 14, type: 'dimension' },
        fontSize:          { value: 12, type: 'dimension' },
        borderRadius:      { value: 0,  type: 'dimension' },
      },
    },
  },
};

const outPath = path.join(__dirname, 'tokens.json');
fs.writeFileSync(outPath, JSON.stringify(tokens, null, 2) + '\n', 'utf8');
console.log('Written:', outPath);
