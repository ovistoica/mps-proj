import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { NavigationStoreModel } from '../../navigation/navigation-store';
import { UserModel, UserSnapshot } from '../user';
import { ContestsStoreModel } from '../contests-store';
import { Api } from '../../services/api';
import { UserCredentials } from '../../screens/auth-screen';
import { NavigationActions } from 'react-navigation';

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    contestsStore: types.optional(ContestsStoreModel, {}),
    user: types.optional(UserModel, {}),
  })
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
