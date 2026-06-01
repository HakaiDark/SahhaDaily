export type WellnessGoal = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  skus: string[];
};

export type RoutineBundle = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  skus: string[];
};

export const wellnessGoals: WellnessGoal[] = [
  {
    id: "daily-energy",
    label: "Daily energy and foundations",
    shortLabel: "Energy",
    description: "Broad daily support for busy routines, tiredness, and nutritional coverage.",
    skus: ["CC0410", "CC0409", "CC0533", "CC0394"]
  },
  {
    id: "immunity",
    label: "Immune support",
    shortLabel: "Immunity",
    description: "Vitamin C, D, zinc, and foundational formulas for everyday natural-defence routines.",
    skus: ["CC0505", "CC0394", "CC0410", "CC0513"]
  },
  {
    id: "beauty",
    label: "Beauty, hair and skin",
    shortLabel: "Beauty",
    description: "Collagen, biotin, and beauty-from-within support for skin, hair, and nails routines.",
    skus: ["CC0224", "CC0349", "CC0544"]
  },
  {
    id: "stress-sleep",
    label: "Calm, focus and evening reset",
    shortLabel: "Calm",
    description: "Gentler routine support for relaxation, focus, and magnesium-led evening habits.",
    skus: ["CC0460", "CC0533", "CC0409"]
  },
  {
    id: "bones-joints",
    label: "Bones, joints and active living",
    shortLabel: "Joints",
    description: "Minerals, vitamin D/K, omega-3, and joint-focused formulas for movement routines.",
    skus: ["CC0288", "CC0009", "CC0394", "CC0350"]
  },
  {
    id: "family",
    label: "Family gummies",
    shortLabel: "Family",
    description: "Easy gummy formats for men, women, and children who prefer chewable supplements.",
    skus: ["CC0543", "CC0544", "CC0513"]
  }
];

export const routineBundles: RoutineBundle[] = [
  {
    id: "daily-core",
    title: "Daily Core Stack",
    eyebrow: "Most universal",
    description: "A simple foundation stack for everyday vitamins, minerals, energy, and immune routines.",
    skus: ["CC0410", "CC0394", "CC0350"]
  },
  {
    id: "beauty-glow",
    title: "Beauty Glow Routine",
    eyebrow: "Hair · skin · nails",
    description: "A beauty-from-within routine built around collagen, biotin, and women's daily gummies.",
    skus: ["CC0224", "CC0349", "CC0544"]
  },
  {
    id: "active-mobility",
    title: "Active Mobility Pack",
    eyebrow: "Bones and joints",
    description: "Support movement routines with joint, mineral, vitamin D/K, and omega-3 products.",
    skus: ["CC0288", "CC0009", "CC0394", "CC0350"]
  }
];

export function getGoalById(goalId: string) {
  return wellnessGoals.find((goal) => goal.id === goalId);
}

export function getGoalsForSku(sku: string) {
  return wellnessGoals.filter((goal) => goal.skus.includes(sku));
}
