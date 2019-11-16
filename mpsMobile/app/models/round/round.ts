import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const RoundModel = types
  .model('Round')
  .props({
    id: types.number,
    contestId: types.number,
    startTime: types.Date,
    endTime: types.Date,
    roundNumber: types.number,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RoundType = Instance<typeof RoundModel>;
export interface Round extends RoundType {}
type RoundSnapshotType = SnapshotOut<typeof RoundModel>;
export interface RoundSnapshot extends RoundSnapshotType {}
