import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { ParticipantModel, ParticipantSnapshot } from '../participant';
import { Api } from '../../services/api';

/**
 * Model description here for TypeScript hints.
 */
export const SeriesModel = types
  .model('Series')
  .props({
    id: types.number,
    startTime: types.string,
    endTime: types.string,
    seriesNumber: types.number,
    participants: types.optional(types.array(ParticipantModel), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setParticipants: (series: ParticipantSnapshot[]) => {
      self.participants.replace(series as any);
    },
  }))
  .actions(self => ({
    fetchParticipants: () => {
      const api: Api = getEnv(self).api;
      api.getParticipants(self.id).then(res => {
        if (res.kind === 'ok') {
          self.setParticipants(res.participants);
        }
      });
    },
  }));

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type SeriesType = Instance<typeof SeriesModel>;
export interface Series extends SeriesType {}
type SeriesSnapshotType = SnapshotOut<typeof SeriesModel>;
export interface SeriesSnapshot extends SeriesSnapshotType {}
