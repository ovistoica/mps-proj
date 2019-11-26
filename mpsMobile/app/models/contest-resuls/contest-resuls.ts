import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { ContestantResultModel, ContestantResultSnapshot } from '../contestant-result';
import { withEnvironment, withStatus } from '../extensions';

/**
 * Model description here for TypeScript hints.
 */
export const ContestResulsModel = types
  .model('ContestResuls')
  .props({
    results: types.optional(types.array(ContestantResultModel), []),
    currentRound: types.number,
    contestId: types.number,
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setResults: (results: ContestantResultSnapshot[]) => {
      self.results.replace(results as any);
    },
  }))
  .actions(self => ({
    getCurrentResults: async () => {
      const api = self.environment.api;
      self.setStatus('pending');
      api.getContestResults(self.contestId).then(res => {
        if (res.kind !== 'ok') {
          self.setStatus('error');
        } else {
          self.setResults(res.results);
          self.setStatus('done');
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

type ContestResulsType = Instance<typeof ContestResulsModel>;
export interface ContestResuls extends ContestResulsType {}
type ContestResulsSnapshotType = SnapshotOut<typeof ContestResulsModel>;
export interface ContestResulsSnapshot extends ContestResulsSnapshotType {}
