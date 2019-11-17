import { SeriesModel, Series } from "./series"

test("can be created", () => {
  const instance: Series = SeriesModel.create({})

  expect(instance).toBeTruthy()
})
