import { assertEquals } from "@std/assert";
import { calcDateOnDiet, Sex } from "./tanzverbot_diet.ts";

Deno.test("Tanzverbot Diet - Male 74kg to 100kg", () => {
  assertEquals(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 36);
});

Deno.test("Tanzverbot Diet - Female 60kg to 70kg", () => {
  // BMR (Female): 655.1 + (9.563 * 60) + (1.85 * 170) - (4.676 * 30)
  // = 655.1 + 573.78 + 314.5 - 140.28 = 1403.1
  // Math.ceil(1403.1) = 1404
  // Diet Sum: 8410
  // Excess: 8410 - 1404 = 7006
  // Gain: 10 * 9000 = 90000
  // Days: 90000 / 7006 = 12.84 -> 13
  assertEquals(calcDateOnDiet(60, 70, 1.70, 30, Sex.Female), 13);
});
