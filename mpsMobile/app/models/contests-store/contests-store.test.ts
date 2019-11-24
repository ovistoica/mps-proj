import { ContestsStoreModel, ContestsStore } from './contests-store';

it('can be created', () => {
  const instance: ContestsStore = ContestsStoreModel.create({
    contests: [],
    status: 'pending',
  });

  expect(instance).toBeTruthy();
});
