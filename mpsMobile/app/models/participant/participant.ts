import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { JuryVote } from '../../screens/voting-screen';
import { withEnvironment } from '../extensions';

/**
 * Model description here for TypeScript hints.
 */
export const ParticipantModel = types
  .model('Participant')
  .props({
    id: types.number,
    firstName: types.string,
    lastName: types.string,
    startTime: types.string,
    endTime: types.string,
    contestId: types.number,
    voted: types.boolean,
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    markVoted: () => {
      self.voted = true;
    },
  }))
  .actions(self => ({
    submitVote: (vote: JuryVote) => {
      const api = self.environment.api;
      api.submitParticipantVote(self.contestId, self.id, vote).then(res => {
        if (res.kind === 'ok') {
          self.markVoted();
        }
      });
    },
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ParticipantType = Instance<typeof ParticipantModel>;
export interface Participant extends ParticipantType {}
type ParticipantSnapshotType = SnapshotOut<typeof ParticipantModel>;
export interface ParticipantSnapshot extends ParticipantSnapshotType {}
