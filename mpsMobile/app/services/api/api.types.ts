import { GeneralApiProblem } from './api-problem';
import { ContestSnapshot, RoundSnapshot, SeriesSnapshot, ParticipantSnapshot } from '../../models';

export type GetLoginResult = { kind: 'ok'; token: string; email: string } | GeneralApiProblem;
export type GetContestsResult = { kind: 'ok'; contests: ContestSnapshot[] } | GeneralApiProblem;
export type GetRoundsResult = { kind: 'ok'; rounds: RoundSnapshot[] } | GeneralApiProblem;
export type GetSeriesResult = { kind: 'ok'; series: SeriesSnapshot[] } | GeneralApiProblem;
export type GetParticipantsResult =
  | { kind: 'ok'; participants: ParticipantSnapshot[] }
  | GeneralApiProblem;
export type GetSubmitVoteResult = { kind: 'ok' } | GeneralApiProblem;
