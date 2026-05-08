import { handleTutorRequest } from "../server/aiTutor.mjs";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    const result = await handleTutorRequest(req.body ?? {});
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({
      error: "ai_tutor_failed",
      answer: "حدث خطأ مؤقت في المساعد الذكي. أعيدي المحاولة بعد لحظات.",
    });
  }
}
