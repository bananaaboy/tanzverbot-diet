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

  const dailyCaloriesOnDiet = DIET_FOOD_ITEMS.reduce(
    (total, item) => total + item.caloriesPerServing * item.servingsPerDay,
    0,
  );

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
