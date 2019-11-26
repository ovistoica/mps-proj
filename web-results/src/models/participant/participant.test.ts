import { ParticipantModel, Participant } from './participant';

test('can be created', () => {
  const instance: Participant = ParticipantModel.create({
    contestId: 2,
    endTime: 'now',
    startTime: 'stillNow',
    firstName: 'Alin',
    lastName: 'Coman',
    id: 2,
    voted: false,
  });

  expect(instance).toBeTruthy();
});
