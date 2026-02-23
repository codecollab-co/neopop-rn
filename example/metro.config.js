const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const root = path.resolve(__dirname, '..');
const config = getDefaultConfig(__dirname);

// Watch the parent library source
config.watchFolders = [root];

// Resolve node_modules from both example/ and root
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(root, 'node_modules'),
];

// Map 'neopop-rn' to the library source for local development
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'neopop-rn') {
    return {
      filePath: path.resolve(root, 'src/index.ts'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
