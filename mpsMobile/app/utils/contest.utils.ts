import { ContestSnapshot, RoundSnapshot } from '../models';
export function normalizeContest(contest: any): ContestSnapshot {
  return {
    id: contest.id,
    type: contest.type,
    name: contest.name,
    password: contest.password,
    startTime: Date.parse(contest.start_time),
    endTime: Date.parse(contest.end_time),
    rounds: [],
  };
}

export function normalizeContestRounds(round: any, contestId: number): RoundSnapshot {
  return {
    contestId,
    id: round.id,
    startTime: Date.parse(round.start_time),
    endTime: Date.parse(round.end_time),
    roundNumber: round.round_no,
  };
}
