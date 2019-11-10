import { ContestSnapshot } from '../models/contest';
export function normalizeContest(contest: any): ContestSnapshot {
  return {
    id: contest.id,
    type: contest.type,
    currentRound: contest.current_round,
    name: contest.name,
    password: contest.password,
    numberOfRounds: contest.round_nums,
    startTime: Date.parse(contest.start_time),
    endTime: Date.parse(contest.end_time),
  };
}
