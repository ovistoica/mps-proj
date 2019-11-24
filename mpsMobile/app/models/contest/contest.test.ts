import { ContestModel, Contest } from './contest';

test('can be created', () => {
  const instance: Contest = ContestModel.create({
    endTime: new Date(),
    startTime: new Date(),
    id: 30,
    name: 'Danseaza pt saraci',
    password: 'Test',
    rounds: [],
    status: 'success',
    type: 'battle',
  });

  expect(instance).toBeTruthy();
});
