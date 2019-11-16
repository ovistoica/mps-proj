import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { ContestModel, ContestSnapshot } from '../index';
import { Api } from '../../services/api';
/**
 * Model description here for TypeScript hints.
 */
export const ContestsStoreModel = types
  .model('ContestsStore')
  .props({
    contests: types.array(ContestModel),
    status: types.optional(types.enumeration(['pending', 'loading', 'done', 'error']), 'pending'),
  })
  .views(self => ({
    getContest: (contestId: number) => self.contests.find(contest => contest.id === contestId),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setContests: (contests: ContestSnapshot[]) => {
      self.contests.replace(contests as any);
    },
    setStatus: (status: 'pending' | 'loading' | 'done' | 'error') => {
      self.status = status;
    },
  }))
  .actions(self => {
    const api: Api = getEnv(self).api;
    return {
      fetchContests: () => {
        api.getContests().then(res => {
          if (res.kind !== 'ok') {
            self.setStatus('error');
          } else {
            self.setContests(res.contests);
          }
        });
      },
    };
  });
/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ContestsStoreType = Instance<typeof ContestsStoreModel>;
export interface ContestsStore extends ContestsStoreType {}
type ContestsStoreSnapshotType = SnapshotOut<typeof ContestsStoreModel>;
export interface ContestsStoreSnapshot extends ContestsStoreSnapshotType {}
