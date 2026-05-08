export function fallbackTutorAnswer(question: string): string;
export function handleTutorRequest(payload: unknown, env?: Record<string, string | undefined>): Promise<{
  status: number;
  body: Record<string, unknown>;
}>;
