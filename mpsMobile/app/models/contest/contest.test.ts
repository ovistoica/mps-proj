import { ContestModel, Contest } from './contest';

test('can be created', () => {
  const instance: Contest = ContestModel.create({
    endTime: 'acum',
    startTime: 'maine',
    id: 30,
    name: 'Danseaza pt saraci',
    password: 'Test',
    rounds: [],
    status: 'success',
    type: 'battle',
    currentRoundId: 2,
    results: [],
  });

  expect(instance).toBeTruthy();
});
