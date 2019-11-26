import { ContestResulsModel, ContestResuls } from './contest-resuls';

test('can be created', () => {
  const instance: ContestResuls = ContestResulsModel.create({
    contestId: 30,
    currentRound: 2,
    results: [],
  });

  expect(instance).toBeTruthy();
});
