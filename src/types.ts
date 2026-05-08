export type GradeId = "first" | "third";

export type AppView =
  | "home"
  | "learn"
  | "lab"
  | "games"
  | "assistant"
  | "quiz"
  | "progress"
  | "resources"
  | "evidence";

export type LessonKind =
  | "inquiry"
  | "force-motion"
  | "simple-machines"
  | "matter"
  | "atoms"
  | "rocks"
  | "earthquakes"
  | "cells"
  | "electricity"
  | "generic";

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface Lesson {
  id: string;
  gradeId: GradeId;
  unitId: string;
  title: string;
  kind: LessonKind;
  objective: string;
  summary: string[];
  concepts: Array<{
    title: string;
    description: string;
  }>;
  dailyExample: string;
  thinkingQuestion: string;
  quiz: QuizQuestion[];
}

export interface Unit {
  id: string;
  gradeId: GradeId;
  title: string;
  subtitle: string;
  icon: string;
  accent: "blue" | "teal" | "violet" | "green" | "amber";
  lessons: Lesson[];
}

export interface Experiment {
  id: string;
  title: string;
  gradeId: GradeId;
  kind:
    | "force"
    | "circuit"
    | "classification"
    | "buoyancy"
    | "volcano"
    | "magnetism"
    | "atom-builder"
    | "seismograph";
  objective: string;
  tools: string[];
  steps: string[];
  observation: string;
  conclusion: string;
  practicalTools?: string[];
  safety?: string;
  sourceUrl?: string;
}

export interface StandaloneQuiz {
  id: string;
  title: string;
  gradeId: GradeId;
  unitId: string;
  questions: QuizQuestion[];
}

export interface ProgressState {
  completedLessons: string[];
  completedExperiments: string[];
  quizScores: Record<string, number>;
}

export interface ToastMessage {
  id: number;
  type: "success" | "info" | "warning";
  message: string;
}
