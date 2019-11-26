import { UserModel, User } from './user';

test('can be created', () => {
  const instance: User = UserModel.create({
    email: 'test@test.com',
    name: 'Mihai',
    status: 'offline',
    token: 'DEDFAULT_TOKEN',
  });

  expect(instance).toBeTruthy();
});
