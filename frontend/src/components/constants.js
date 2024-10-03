export const WOD_TYPES = ["WOD", "Conditioning", "Weighlifting", "Gym"];
export const WOD_FORMATS = ["AMRAP", "For Time", "EMOM"];
export const EXERCISES = [
  { type: "Cardio", skill: "Burpees", requiresWeight: false },
  { type: "Gym", skill: "Pull-ups", requiresWeight: false },
  { type: "Weight", skill: "Squats", requiresWeight: true },
  { type: "Weight", skill: "Deadlifts", requiresWeight: true },
  { type: "Weight", skill: "Clean & Jerk", requiresWeight: true },
];
