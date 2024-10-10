import sharedConfig from "@repo/tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/stories/**/*.{ts,tsx}", "../../packages/ui/components/**/*.{ts,tsx}"],
  presets: [sharedConfig],
};

export default config;
