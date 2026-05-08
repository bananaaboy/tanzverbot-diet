import { Sex, calcDateOnDiet } from "./tanzverbot_diet.ts";

let fromWeight = 78.0;
let toWeight = 100.0;
let height = 1.88;
let age = 38;
let sex = Sex.Male;
let days = calcDateOnDiet(fromWeight, toWeight, height, age, sex);
console.log(`You need to diet for ${days} days to reach your target.`);
