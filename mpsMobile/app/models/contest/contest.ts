import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const ContestModel = types.model('Contest').props({
  id: types.identifier,
  contest_id: types.number,
  type: types.string,
  numberOfRounds: types.number,
  currentRound: types.number,
  startTime: types.Date,
  endTime: types.Date,
  password: types.string,
});

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ContestType = Instance<typeof ContestModel>;
export interface Contest extends ContestType {}
type ContestSnapshotType = SnapshotOut<typeof ContestModel>;
export interface ContestSnapshot extends ContestSnapshotType {}
