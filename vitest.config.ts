import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: ["**/node_modules", "**/dist", ".github", ".git", ".cache"],
		passWithNoTests: true,
		coverage: {
			enabled: true,
			all: true,
			reporter: ["text"],
			provider: "c8",
			include: ["src"],
			exclude: ["**/index.{js,ts}"]
		}
	}
});
