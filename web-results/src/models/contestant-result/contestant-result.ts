import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const ContestantResultModel = types
  .model('ContestantResult')
  .props({
    id: types.number,
    firstName: types.string,
    lastName: types.string,
    status: types.number,
    grade: types.number,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ContestantResultType = Instance<typeof ContestantResultModel>;
export interface ContestantResult extends ContestantResultType {}
type ContestantResultSnapshotType = SnapshotOut<typeof ContestantResultModel>;
export interface ContestantResultSnapshot extends ContestantResultSnapshotType {}
