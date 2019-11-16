import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { SeriesModel, SeriesSnapshot } from '../series';
import { Api } from '../../services/api';

/**
 * Model description here for TypeScript hints.
 */
export const RoundModel = types
  .model('Round')
  .props({
    id: types.number,
    contestId: types.number,
    startTime: types.string,
    endTime: types.string,
    roundNumber: types.number,
    series: types.optional(types.array(SeriesModel), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setSeries: (series: SeriesSnapshot[]) => {
      self.series.replace(series as any);
    },
  }))
  .actions(self => ({
    fetchSeries: () => {
      const api: Api = getEnv(self);
      api.getRoundSeries(self.id).then(res => {
        if (res.kind === 'ok') {
          self.setSeries(res.series);
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

type RoundType = Instance<typeof RoundModel>;
export interface Round extends RoundType {}
type RoundSnapshotType = SnapshotOut<typeof RoundModel>;
export interface RoundSnapshot extends RoundSnapshotType {}
