const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

const monorepoPackages = {
  //   "@repo/ui": path.resolve(monorepoRoot, "packages/ui"),
  //   "@repo/types": path.resolve(monorepoRoot, "packages/types"),
  //   "@repo/constants": path.resolve(monorepoRoot, "packages/constants"),
  //   "@repo/eslint-config": path.resolve(monorepoRoot, "packages/eslint-config"),
};
config.watchFolders = [monorepoRoot, ...Object.values(monorepoPackages)];

config.resolver.extraNodeModules = monorepoPackages;
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: "./global.css" });
