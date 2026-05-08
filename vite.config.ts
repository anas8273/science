import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error Shared server module is authored as ESM for Vercel and Vite dev middleware.
import { handleTutorRequest } from "./server/aiTutor.mjs";

export default defineConfig({
  base: '/science/',
  server: {
    allowedHosts: true,
  },
  plugins: [
    react(),
    {
      name: "science-api-dev-middleware",
      configureServer(server) {
        server.middlewares.use("/api/ai-tutor", async (req, res) => {
          const request = req as any;
          const response = res as any;
          if (request.method !== "POST") {
            response.statusCode = 405;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify({ error: "method_not_allowed" }));
            return;
          }

          let rawBody = "";
          request.on("data", (chunk: any) => {
            rawBody += chunk;
          });
          request.on("end", async () => {
            try {
              const payload = rawBody ? JSON.parse(rawBody) : {};
              const result = await handleTutorRequest(payload);
              response.statusCode = result.status;
              response.setHeader("Content-Type", "application/json; charset=utf-8");
              response.end(JSON.stringify(result.body));
            } catch {
              response.statusCode = 500;
              response.setHeader("Content-Type", "application/json; charset=utf-8");
              response.end(JSON.stringify({ error: "ai_tutor_failed", answer: "حدث خطأ مؤقت في المساعد الذكي." }));
            }
          });
        });
      },
    },
  ],
});
