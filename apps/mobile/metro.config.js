const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// const monorepoPackages = {
//   "@repo/ui": path.resolve(monorepoRoot, "packages/ui"),
//   "@repo/types": path.resolve(monorepoRoot, "packages/types"),
//   "@repo/constants": path.resolve(monorepoRoot, "packages/constants"),
//   "@repo/eslint-config": path.resolve(monorepoRoot, "packages/eslint-config"),
// };

// config.resolver.extraNodeModules = monorepoPackages;
// config.watchFolders = [monorepoRoot, ...Object.values(monorepoPackages)];
config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: "./global.css" });
