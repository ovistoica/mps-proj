import { ContestsStoreModel, ContestsStore } from "./contests-store"

test("can be created", () => {
  const instance: ContestsStore = ContestsStoreModel.create({})

  expect(instance).toBeTruthy()
})