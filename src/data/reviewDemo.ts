export type ReviewRating = "hard" | "medium" | "easy";

export interface ReviewDemoCard {
  id: string;
  front: string;
  back: string;
  example: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
}

export interface ReviewRatingOption {
  id: ReviewRating;
  label: string;
  note: string;
}

export interface ReviewHistoryEntry {
  id: number;
  cardId: string;
  front: string;
  rating: ReviewRating;
  nextIntervalDays: number;
  nextReviewLabel: string;
}

export interface ReviewDemoState {
  currentIndex: number;
  reviewedCount: number;
  nextHistoryId: number;
  cards: ReviewDemoCard[];
  history: ReviewHistoryEntry[];
}

export const reviewRatingOptions: ReviewRatingOption[] = [
  {
    id: "hard",
    label: "Hard",
    note: "Keep it in short rotation and bring it back soon.",
  },
  {
    id: "medium",
    label: "Medium",
    note: "The card was manageable, so it can wait a bit longer.",
  },
  {
    id: "easy",
    label: "Easy",
    note: "Confidence was high, so the next review moves further out.",
  },
];

export const reviewDemoInitialState: ReviewDemoState = {
  currentIndex: 0,
  reviewedCount: 0,
  nextHistoryId: 1,
  cards: [
    {
      id: "bewerbung",
      front: "die Bewerbung",
      back: "application",
      example: "Ich habe gestern meine Bewerbung abgeschickt.",
      intervalDays: 0,
      easeFactor: 2.3,
      repetitions: 0,
    },
    {
      id: "vereinbaren",
      front: "vereinbaren",
      back: "to arrange / agree on",
      example: "Wir mussen noch einen Termin vereinbaren.",
      intervalDays: 1,
      easeFactor: 2.4,
      repetitions: 1,
    },
    {
      id: "zuverlassig",
      front: "zuverlassig",
      back: "reliable",
      example: "Sie ist sehr zuverlassig und arbeitet sorgfaltig.",
      intervalDays: 2,
      easeFactor: 2.5,
      repetitions: 2,
    },
    {
      id: "kenntnis",
      front: "die Kenntnis",
      back: "knowledge",
      example: "Programmierkenntnisse waren fur das Projekt wichtig.",
      intervalDays: 3,
      easeFactor: 2.35,
      repetitions: 2,
    },
    {
      id: "fortschritt",
      front: "der Fortschritt",
      back: "progress",
      example: "Der Fortschritt war nach jeder Lerneinheit sichtbar.",
      intervalDays: 4,
      easeFactor: 2.55,
      repetitions: 3,
    },
  ],
  history: [],
};
