import { RoundModel, Round } from './round';

test('can be created', () => {
  const instance: Round = RoundModel.create({
    contestId: 30,
    endTime: 'now',
    startTime: 'still now',
    id: 2,
    roundNumber: 2,
    series: [],
    status: 'success',
  });

  expect(instance).toBeTruthy();
});
