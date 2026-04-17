import { defineConfig } from "astro/config";

const normalizeBase = (value) => {
  if (!value || value === "/") {
    return "/";
  }

  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
};

export default defineConfig({
  site: process.env.SITE_URL || "https://example.com",
  base: normalizeBase(process.env.SITE_BASE_PATH)
});
