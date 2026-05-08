export enum Sex {
  Male = "m",
  Female = "f",
}

// TODO: Use a structured data type (e.g., array of objects) instead of parallel arrays
const foodNames: string[] = [
  "Kellogg's Tresor",
  "Weihenstephan Haltbare Milch",
  "Mühle Frikadellen",
  "Volvic Tee",
  "Neuburger lockerer Sahnepudding",
  "Lagnese Viennetta",
  "Schöller 10ForTwo",
  "Ristorante Pizza Salame",
  "Schweppes Ginger Ale",
  "Mini Babybel",
];
const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  // TODO: Validation logic could be extracted or improved
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  // TODO: Avoid for...in on arrays and implicit index access
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }
  let dailyCaloriesBasicMetabolicRate = 0;
  if (sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // TODO: Extract BMR calculation logic to separate functions or use polymorphism
      // Harris-Benedict-Formula (Male)
      66.47 + 13.7 * currentWeightKg + 5.003 * heightM * 100.0 - 6.75 * ageY,
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * currentWeightKg + 1.85 * heightM * 100.0 - 4.676 * ageY,
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  // TODO: Use constants for magic numbers like 9000
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}
