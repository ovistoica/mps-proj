import { ContestSnapshot, RoundSnapshot, SeriesSnapshot, ParticipantSnapshot } from '../models';
export function normalizeContest(contest: any): ContestSnapshot {
  return {
    id: contest.id,
    type: contest.type,
    name: contest.name,
    password: contest.password,
    startTime: Date.parse(contest.start_time),
    endTime: Date.parse(contest.end_time),
    rounds: [],
    status: 'offline',
  };
}

export function normalizeContestRounds(round: any, contestId: number): RoundSnapshot {
  return {
    contestId,
    id: round.id,
    startTime: round.start_time,
    endTime: round.end_time,
    roundNumber: round.round_no,
  };
}

export function normalizeRoundSeries(series: any): SeriesSnapshot {
  return {
    id: series.id,
    startTime: series.start_time,
    endTime: series.end_time,
    seriesNumber: series.jseries_no,
  };
}

export function normalizeParticipant(participant: any): ParticipantSnapshot {
  return {
    id: participant.id,
    startTime: participant.start_time,
    endTime: participant.end_time,
    contestId: participant.vote,
    firstName: participant.first_name,
    lastName: participant.last_name,
  };
}
