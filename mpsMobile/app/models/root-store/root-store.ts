import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { NavigationStoreModel } from '../../navigation/navigation-store';
import { UserModel, UserSnapshot } from '../user';
import { ContestSnapshot, ContestModel } from '../contest';
import { Api } from '../../services/api';
import { UserCredentials } from '../../screens/auth-screen';
import { NavigationActions } from 'react-navigation';
import { GetContestsResult } from '../../services/api';

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    user: types.optional(UserModel, {}),
    contests: types.array(ContestModel),
    status: types.optional(types.enumeration(['pending', 'loading', 'done', 'error']), 'pending'),
  })
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
      login: (userCredentials: UserCredentials) => {
        api.login(userCredentials).then(res => {
          if (res.kind !== 'ok') {
            self.user.setStatus('error');
          } else {
            const newSignedInUser: UserSnapshot = {
              name: userCredentials.username,
              token: res.token,
              email: res.email,
              status: 'success',
            };
            self.user.setUser(newSignedInUser);
            self.navigationStore.dispatch(NavigationActions.navigate({ routeName: 'contests' }));
          }
        });
      },
      getContests: () => {
        api.getContests(self.user.token).then(res => {
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
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
