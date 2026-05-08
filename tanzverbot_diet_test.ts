import { assertEquals, assertThrows } from "@std/assert";
import { calcDateOnDiet, Sex, DIET_FOOD_ITEMS_2018 } from "./tanzverbot_diet.ts";

Deno.test("Tanzverbot Diet - Male 74kg to 100kg", () => {
  assertEquals(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 37);
});

Deno.test("Tanzverbot Diet - Female 60kg to 70kg", () => {
  assertEquals(calcDateOnDiet(60, 70, 1.70, 30, Sex.Female), 13);
});

Deno.test("Tanzverbot Diet 2018 - Male 74kg to 100kg", () => {
  assertEquals(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male, DIET_FOOD_ITEMS_2018), 49);
});

Deno.test("Tanzverbot Diet - Error: Weight Loss", () => {
  assertThrows(
    () => calcDateOnDiet(100, 90, 1.86, 38, Sex.Male),
    Error,
    "This diet is for gaining weight, not loosing it!",
  );
});

Deno.test("Tanzverbot Diet - Error: Too Young", () => {
  assertThrows(
    () => calcDateOnDiet(74, 100, 1.86, 15, Sex.Male),
    Error,
    "You do not qualify for this kind of diet.",
  );
});

Deno.test("Tanzverbot Diet - Error: Too Short", () => {
  assertThrows(
    () => calcDateOnDiet(74, 100, 1.49, 38, Sex.Male),
    Error,
    "You do not qualify for this kind of diet.",
  );
});
