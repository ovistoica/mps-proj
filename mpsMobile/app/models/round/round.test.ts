import { RoundModel, Round } from "./round"

test("can be created", () => {
  const instance: Round = RoundModel.create({})

  expect(instance).toBeTruthy()
})
