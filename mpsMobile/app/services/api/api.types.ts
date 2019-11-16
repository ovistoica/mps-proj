import { GeneralApiProblem } from './api-problem';
import { ContestSnapshot, RoundSnapshot } from '../../models';

export type GetLoginResult = { kind: 'ok'; token: string; email: string } | GeneralApiProblem;
export type GetContestsResult = { kind: 'ok'; contests: ContestSnapshot[] } | GeneralApiProblem;
export type GetRoundsResult = { kind: 'ok'; rounds: RoundSnapshot[] } | GeneralApiProblem;
