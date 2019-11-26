import { Instance, SnapshotOut, types, getEnv } from 'mobx-state-tree';
import { RoundModel, RoundSnapshot } from '../round';
import { Api } from '../../services/api';
import { ContestResulsModel } from '../contest-resuls';
/**
 * Model description here for TypeScript hints.
 */
export const ContestModel = types
  .model('Contest')
  .props({
    id: types.number,
    name: types.string,
    type: types.string,
    startTime: types.string,
    endTime: types.string,
    password: types.string,
    rounds: types.optional(types.array(RoundModel), []),
    status: types.optional(types.enumeration(['success', 'error', 'offline']), 'offline'),
    results: types.maybeNull(ContestResulsModel),
    currentRoundId: types.maybeNull(types.number),
  })
  .views(self => ({
    /**
     * Get the ordered rounds by start time
     */
    get orderedRounds(): RoundSnapshot[] {
      return self.rounds.sort((a, b) => {
        const startA = Date.parse(a.startTime);
        const startB = Date.parse(b.startTime);

        return startA - startB;
      });
    },
    getRound: (roundId: number) => self.rounds.find(round => round.id === roundId),
  }))
  .views(self => ({
    get currentRound() {
      return self.getRound(self.currentRoundId);
    },
    get lastRound() {
      if (self.orderedRounds && self.orderedRounds.length) {
        return self.orderedRounds[self.orderedRounds.length - 1];
      }
      return null;
    },
  }))
  .actions(self => ({
    setRounds: (rounds: RoundSnapshot[]) => {
      self.rounds.replace(rounds as any);
    },
    setStatus: (newStatus: 'success' | 'error' | 'offline') => {
      self.status = newStatus;
    },
    setCurrentRoundId: (roundId: number) => {
      self.currentRoundId = roundId;
    },
  }))
  .actions(self => ({
    fetchRounds: (userToken: string) => {
      const api: Api = getEnv(self).api;
      api.getContestRounds(self.id, self.password).then(res => {
        if (res.kind !== 'ok') {
          self.setStatus('error');
        } else {
          self.setRounds(res.rounds);
        }
      });
    },
    afterCreate: () => {
      if (!self.currentRoundId) {
        self.currentRoundId = 1;
      }
      self.results = ContestResulsModel.create({
        contestId: self.id,
        currentRound: self.currentRoundId,
        results: [],
      });
    },
  }));

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ContestType = Instance<typeof ContestModel>;
export interface Contest extends ContestType {}
type ContestSnapshotType = SnapshotOut<typeof ContestModel>;
export interface ContestSnapshot extends ContestSnapshotType {}
