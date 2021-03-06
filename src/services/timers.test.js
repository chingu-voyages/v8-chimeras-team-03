import { timeParser } from "./timers";

test("Does time parser exists", () => {
  expect(timeParser).toBeDefined();
});

test("function should return object {hours: 0, minutes: 10, seconds: 10}", () => {
  expect(timeParser(610)).toEqual({ hours: 0, minutes: 10, seconds: 10 });
});
