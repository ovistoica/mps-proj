import { ContestResulsModel, ContestResuls } from "./contest-resuls"

test("can be created", () => {
  const instance: ContestResuls = ContestResulsModel.create({})

  expect(instance).toBeTruthy()
})