import { ContestModel, Contest } from "./contest"

test("can be created", () => {
  const instance: Contest = ContestModel.create({})

  expect(instance).toBeTruthy()
})