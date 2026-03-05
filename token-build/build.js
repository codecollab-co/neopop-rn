const StyleDictionary = require('style-dictionary');
const path = require('path');

const sd = new StyleDictionary({
  source: [path.join(__dirname, 'tokens.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'neopop',
      buildPath: '../tokens/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: { outputReferences: false },
      }],
    },
    figma: {
      transformGroup: 'js',
      buildPath: '../tokens/figma/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested',
      }],
    },
    android: {
      transformGroup: 'android',
      buildPath: '../tokens/android/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.type === 'color',
        },
        {
          destination: 'dimens.xml',
          format: 'android/dimens',
          filter: (token) => token.type === 'dimension',
        },
      ],
    },
    ios: {
      transformGroup: 'ios-swift',
      buildPath: '../tokens/ios/',
      files: [{
        destination: 'NeoPopTokens.swift',
        format: 'ios-swift/class.swift',
        className: 'NeoPopTokens',
        filter: (token) => ['color', 'dimension'].includes(token.type),
      }],
    },
  },
});

sd.buildAllPlatforms();
