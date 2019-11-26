import { ContestantResultModel, ContestantResult } from './contestant-result';

test('can be created', () => {
  const instance: ContestantResult = ContestantResultModel.create({
    firstName: 'Mihai',
    grade: 360,
    id: 15,
    lastName: 'Mihai',
    status: 1,
  });

  expect(instance).toBeTruthy();
});
