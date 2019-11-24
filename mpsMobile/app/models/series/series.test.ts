import { SeriesModel, Series } from './series';

test('can be created', () => {
  const instance: Series = SeriesModel.create({
    endTime: 'now',
    startTime: 'still now',
    id: 4,
    participants: [],
    seriesNumber: 2,
  });

  expect(instance).toBeTruthy();
});
