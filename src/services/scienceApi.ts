import { lessons } from "../data/platformData";

export interface TutorResponse {
  answer: string;
  provider?: "openai" | "fallback";
}

export async function askScienceTutor(question: string, context: Record<string, unknown> = {}): Promise<TutorResponse> {
  const response = await fetch("/api/ai-tutor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      context: {
        ...context,
        availableLessons: lessons.map((lesson) => ({
          title: lesson.title,
          grade: lesson.gradeId,
          objective: lesson.objective,
          concepts: lesson.concepts.map((concept) => concept.title),
        })),
      },
    }),
  });

  if (!response.ok) throw new Error("AI tutor request failed");
  return response.json();
}

export interface EarthquakeItem {
  id: string;
  place: string;
  magnitude: number;
  time: string;
  url: string;
}

export async function fetchRecentEarthquakes(): Promise<EarthquakeItem[]> {
  const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson");
  if (!response.ok) throw new Error("Earthquake feed failed");
  const data = await response.json();
  return (data.features ?? []).slice(0, 5).map((feature: any) => ({
    id: feature.id,
    place: feature.properties?.place ?? "موقع غير محدد",
    magnitude: Number(feature.properties?.mag ?? 0),
    time: new Date(feature.properties?.time ?? Date.now()).toLocaleString("ar-SA"),
    url: feature.properties?.url ?? "https://earthquake.usgs.gov/earthquakes/map/",
  }));
}

export interface NasaApod {
  title: string;
  explanation: string;
  url: string;
  mediaType: string;
}

export async function fetchNasaApod(): Promise<NasaApod> {
  const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true");
  if (!response.ok) throw new Error("NASA APOD failed");
  const data = await response.json();
  return {
    title: data.title ?? "صورة علمية من NASA",
    explanation: data.explanation ?? "",
    url: data.thumbnail_url ?? data.url ?? "https://spaceplace.nasa.gov/menu/science/",
    mediaType: data.media_type ?? "image",
  };
}

export interface WikiSummary {
  title: string;
  extract: string;
  url: string;
}

export async function fetchArabicWikiSummary(term: string): Promise<WikiSummary> {
  const response = await fetch(`https://ar.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
  if (!response.ok) throw new Error("Wikipedia summary failed");
  const data = await response.json();
  return {
    title: data.title ?? term,
    extract: data.extract ?? "لم يتوفر ملخص لهذا المفهوم.",
    url: data.content_urls?.desktop?.page ?? `https://ar.wikipedia.org/wiki/${encodeURIComponent(term)}`,
  };
}
