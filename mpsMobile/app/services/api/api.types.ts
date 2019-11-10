import { GeneralApiProblem } from './api-problem';
import { ContestSnapshot } from '../../models/contest';

export type GetLoginResult = { kind: 'ok'; token: string; email: string } | GeneralApiProblem;
export type GetContestsResult = { kind: 'ok'; contests: ContestSnapshot[] } | GeneralApiProblem;
