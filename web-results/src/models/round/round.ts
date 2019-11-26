import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { SeriesModel, SeriesSnapshot } from '../series';
import { withEnvironment, withStatus } from '../extensions';

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
    finished: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views(self => ({
    getSerie: seriesId => {
      return self.series.find(serie => serie.id === seriesId);
    },
  }))
  .actions(self => ({
    setSeries: (series: SeriesSnapshot[]) => {
      self.series.replace(series as any);
    },
    markFinished: () => {
      self.finished = true;
    },
  }))
  .actions(self => ({
    fetchSeries: () => {
      const api = self.environment.api;
      self.setStatus('pending');
      api.getRoundSeries(self.id).then(res => {
        if (res.kind !== 'ok') {
          self.setStatus('error');
        } else {
          self.setSeries(res.series);
          self.series.map(serie => serie.fetchParticipants());
          self.setStatus('done');
        }
      });
    },
  }))
  .views(self => ({
    get voted() {
      for (var i = 0; i < self.series.length; ++i) {
        if (!self.series[i].voted) {
          return false;
        }
      }
      return true;
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
