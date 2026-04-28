// Here we'll have the subject categories and stuff that we support for reusability across the app
export type SubjectTag =
  | "STEM"
  | "LANGUAGE"
  | "HISTORY"
  | "ARTS & MUSIC"
  | "MATH"
  | "CHEMISTRY"
  | "BIOLOGY";

export const SUBJECT_OPTIONS: SubjectTag[] = [
  "STEM",
  "LANGUAGE",
  "HISTORY",
  "ARTS & MUSIC",
  "MATH",
  "CHEMISTRY",
  "BIOLOGY",
];

export const SUBJECT_LABELS: Record<SubjectTag, string> = {
  STEM: "Stem",
  LANGUAGE: "Language",
  HISTORY: "History",
  "ARTS & MUSIC": "Arts & music",
  MATH: "Math",
  CHEMISTRY: "Chemistry",
  BIOLOGY: "Biology",
};

// Same idea here: only these age labels are valid across the portal
// TODO: verify if these categories are the desired ones by Hewitt
export type AgeTag = "0-5" | "5-7" | "7-9" | "9-12" | "12+";

export const AGE_OPTIONS: AgeTag[] = ["0-5", "5-7", "7-9", "9-12", "12+"];

export const AGE_LABELS: Record<AgeTag, string> = {
  "0-5": "0-5 (prereaders)",
  "5-7": "5-7 (early readers)",
  "7-9": "7-9 (transitional readers)",
  "9-12": "9-12 (intermediate readers)",
  "12+": "12+ (advanced readers)",
};

// Shared shape for game cards
// Every place that uses game data (grid, filters, card links) relies on this interface
export interface PortalGame {
  id: string;
  name: string;
  description: string;
  subject: SubjectTag;
  age: AgeTag;
  href: string;
  imageUrl?: string;
}
