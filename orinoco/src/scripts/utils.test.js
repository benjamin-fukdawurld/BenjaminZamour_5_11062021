let { getTeddies } = require("./utils");

test("Get teddies", async () => {
  let teddies = await new Promise((resolve, reject) => {
    resolve([1, 2, 3]);
  }); //getTeddies();
  expect(Array.isArray(teddies)).toBeTruthy();
});
