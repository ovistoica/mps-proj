import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export type UserStatusType = 'success' | 'error' | 'offline';

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User')
  .props({
    name: types.maybeNull(types.string),
    token: types.optional(types.string, 'DEFAULT_TOKEN_123'),
    email: types.optional(types.string, ''),
    status: types.optional(types.enumeration(['success', 'error', 'offline']), 'offline'),
  })
  .actions(self => ({
    setStatus: (newStatus: UserStatusType) => {
      self.status = newStatus;
    },
    setUser: (newUser: UserSnapshot) => {
      self.email = newUser.email;
      self.token = newUser.token;
      self.status = newUser.status;
      self.name = newUser.name;
    },
  }));
// eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
