import { ContestsStoreModel, ContestsStore } from './contests-store';

it('can be created', () => {
  const instance: ContestsStore = ContestsStoreModel.create({
    contests: [],
    status: 'pending',
    currentContestId: 2,
  });

  expect(instance).toBeTruthy();
});
