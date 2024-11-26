export const WOD_TYPES = [
  { value: "WOD", label: "WOD" },
  { value: "Conditioning", label: "Conditioning" },
  { value: "Weightlifting", label: "Weightlifting" },
  { value: "Gymnastic", label: "Gymnastic" },
];
export const WOD_FORMATS = [
  { value: "AMRAP", label: "AMRAP" },
  { value: "For Time", label: "For Time" },
  { value: "EMOM", label: "EMOM" },
];
export const EXERCISES = [
  { type: "Bodyweight", skill: "Pull-up", requiresWeight: false },
  { type: "Bodyweight", skill: "Chest-to-bar", requiresWeight: false },
  { type: "Bodyweight", skill: "Bar Muscle-up", requiresWeight: false },
  { type: "Bodyweight", skill: "Ring Muscle-up", requiresWeight: false },
  { type: "Bodyweight", skill: "Air Squat", requiresWeight: false },
  { type: "Bodyweight", skill: "Pistol Squat", requiresWeight: false },
  { type: "Bodyweight", skill: "Burpee", requiresWeight: false },
  { type: "Bodyweight", skill: "Push-up", requiresWeight: false },
  { type: "Bodyweight", skill: "Handstand Push-up", requiresWeight: false },
  {
    type: "Bodyweight",
    skill: "Free Handstand Push-up",
    requiresWeight: false,
  },
  { type: "Bodyweight", skill: "Handstand Walk", requiresWeight: false },
  { type: "Bodyweight", skill: "Dip", requiresWeight: false },
  { type: "Bodyweight", skill: "Sit-up", requiresWeight: false },
  { type: "Bodyweight", skill: "Toes-to-bar", requiresWeight: false },
  { type: "Bodyweight", skill: "L-sit", requiresWeight: false },
  { type: "Bodyweight", skill: "Rope Climb", requiresWeight: false },
  { type: "Bodyweight", skill: "Legless Rope Climb", requiresWeight: false },
  { type: "Bodyweight", skill: "Pull-over", requiresWeight: false },
  { type: "Bodyweight", skill: "Skin the Cat", requiresWeight: false },
  { type: "Weightlifting", skill: "Deadlift", requiresWeight: true },
  { type: "Weightlifting", skill: "Dumbbell Snatch", requiresWeight: true },
  { type: "Weightlifting", skill: "Hang Snatch", requiresWeight: true },
  { type: "Weightlifting", skill: "Hang Clean", requiresWeight: true },
  { type: "Weightlifting", skill: "Hang Clean & Jerk", requiresWeight: true },
  { type: "Weightlifting", skill: "Clean", requiresWeight: true },
  { type: "Weightlifting", skill: "Clean & Jerk", requiresWeight: true },
  { type: "Weightlifting", skill: "Snatch", requiresWeight: true },
  { type: "Weightlifting", skill: "Front Squat", requiresWeight: true },
  { type: "Weightlifting", skill: "Back Squat", requiresWeight: true },
  { type: "Weightlifting", skill: "Overhead Squat", requiresWeight: true },
  { type: "Weightlifting", skill: "Squat Snatch", requiresWeight: true },
  { type: "Weightlifting", skill: "Squat Clean", requiresWeight: true },
  { type: "Weightlifting", skill: "Push Press", requiresWeight: true },
  { type: "Weightlifting", skill: "Jerk", requiresWeight: true },
  { type: "Weightlifting", skill: "Lunge", requiresWeight: true },
  { type: "Weightlifting", skill: "Bench Press", requiresWeight: true },
  { type: "Weightlifting", skill: "Farmers Carry", requiresWeight: true },
  { type: "Weightlifting", skill: "Thruster", requiresWeight: true },
  { type: "Weightlifting", skill: "Cluster", requiresWeight: true },
  { type: "Weightlifting", skill: "Turkish Get-up", requiresWeight: true },
  { type: "Weightlifting", skill: "Russian Swing", requiresWeight: true },
  { type: "Weightlifting", skill: "American Swing", requiresWeight: true },
  { type: "Weightlifting", skill: "Medicine-ball Clean", requiresWeight: true },
  { type: "Weightlifting", skill: "Wall-ball Shot", requiresWeight: true },
  { type: "Weightlifting", skill: "Zercher Squat", requiresWeight: true },
  { type: "Cardio", skill: "Row", requiresWeight: false },
  { type: "Cardio", skill: "Skierg", requiresWeight: false },
  { type: "Cardio", skill: "Bikerg", requiresWeight: false },
  { type: "Cardio", skill: "Echo Bike", requiresWeight: false },
  { type: "Cardio", skill: "Assault Bike", requiresWeight: false },
  { type: "Cardio", skill: "Run", requiresWeight: false },
  { type: "Cardio", skill: "Crossover", requiresWeight: false },
  { type: "Cardio", skill: "Single-under", requiresWeight: false },
  { type: "Cardio", skill: "Double-under", requiresWeight: false },
  { type: "Cardio", skill: "Box Jump", requiresWeight: false },
  { type: "Cardio", skill: "Box Step-up", requiresWeight: true },
  { type: "Cardio", skill: "Burpee Box Jump-over", requiresWeight: false },
];

export const EXERCISE_STYLES = {
  Weightlifting: ["Hang", "Muscle", "Squat"],
  Bodyweight: ["Kipping", "Butterfly", "Strict"],
  Cardio: [], // Si la catégorie cardio n'a pas de styles spécifiques, laisser vide
};

export const TOOLS = {
  Weightlifting: [
    "Barbell",
    "Dumbbell",
    "Double Dumbbells",
    "Kettlebell",
    "Double Kettlebells",
  ],
  Bodyweight: [],
  Cardio: [],
};
