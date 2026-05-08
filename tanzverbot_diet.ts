export enum Sex {
  Male = "m",
  Female = "f",
}

interface FoodItem {
  name: string;
  caloriesPerServing: number;
  servingsPerDay: number;
}

const DIET_FOOD_ITEMS: FoodItem[] = [
  { name: "Kellogg's Tresor", caloriesPerServing: 137, servingsPerDay: 4 },
  { name: "Weihenstephan Haltbare Milch", caloriesPerServing: 64, servingsPerDay: 8 },
  { name: "Mühle Frikadellen", caloriesPerServing: 271, servingsPerDay: 4 },
  { name: "Volvic Tee", caloriesPerServing: 40, servingsPerDay: 12 },
  { name: "Neuburger lockerer Sahnepudding", caloriesPerServing: 297, servingsPerDay: 1 },
  { name: "Lagnese Viennetta", caloriesPerServing: 125, servingsPerDay: 6 },
  { name: "Schöller 10ForTwo", caloriesPerServing: 482, servingsPerDay: 2 },
  { name: "Ristorante Pizza Salame", caloriesPerServing: 835, servingsPerDay: 2 },
  { name: "Schweppes Ginger Ale", caloriesPerServing: 37, servingsPerDay: 25 },
  { name: "Mini Babybel", caloriesPerServing: 59, servingsPerDay: 20 },
];

const CALORIES_PER_KG_FAT = 9000;

function calculateBMR(
  weightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  if (sex === Sex.Male) {
    return Math.ceil(
      66.47 + 13.7 * weightKg + 5.003 * (heightM * 100) - 6.75 * ageY,
    );
  }
  return Math.ceil(
    655.1 + 9.563 * weightKg + 1.85 * (heightM * 100) - 4.676 * ageY,
  );
}

function validateQualification(
  weightGainKg: number,
  heightM: number,
  ageY: number,
): void {
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
}

function calculateDailyCaloriesOnDiet(): number {
  return DIET_FOOD_ITEMS.reduce(
    (total, item) => total + item.caloriesPerServing * item.servingsPerDay,
    0,
  );
}

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;

  validateQualification(weightGainKg, heightM, ageY);

  const dailyCaloriesOnDiet = calculateDailyCaloriesOnDiet();

  const dailyCaloriesBasicMetabolicRate = calculateBMR(
    currentWeightKg,
    heightM,
    ageY,
    sex,
  );

  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((CALORIES_PER_KG_FAT * weightGainKg) / dailyExcessCalories);
}
