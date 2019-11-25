import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import { UserCredentials } from '../../screens/auth-screen';
import { ContestSnapshot } from '../../models/contest';
import {
  normalizeContest,
  normalizeContestRounds,
  normalizeRoundSeries,
  normalizeParticipant,
  normalizeContestantResult,
} from '../../utils/contest.utils';
import { RoundSnapshot, SeriesSnapshot, ParticipantSnapshot } from '../../models';
import { JuryVote } from '../../screens/voting-screen';
import { isNumberLiteralTypeAnnotation } from '@babel/types';
import { ContestantResultSnapshot } from '../../models/contestant-result';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   *
   * The token after the user has been logged in
   */
  token: string;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the boot up
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  setToken(userToken: string) {
    this.token = userToken;
    this.apisauce.setHeader('Authorization', 'Bearer ' + userToken);
    this.apisauce.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  }

  /**
   * Requests all contests that the user will vote on
   */
  async getContests(): Promise<Types.GetContestsResult> {
    const response: ApiResponse<any> = await this.apisauce.get('/contest/');
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const contestSnapshots: ContestSnapshot[] = response.data.results.map(contest =>
      normalizeContest(contest),
    );
    return {
      kind: 'ok',
      contests: contestSnapshots,
    };
  }

  /**
   * Requests all rounds of a contest
   *
   * @param userToken The authentication token for the user. Provided after login
   *
   * @param contestId The id of the contest
   *
   * @param contestPassword The password to be granted access to the contest
   */
  async getContestRounds(
    contestId: number,
    contestPassword: string,
  ): Promise<Types.GetRoundsResult> {
    const data = new FormData();
    data.append('password', contestPassword);

    const response: ApiResponse<any> = await this.apisauce.post(`/round/${contestId}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this.token} `,
      },
    });
    console.log('RESPONSE', response);
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const rounds: RoundSnapshot[] = response.data.map(round =>
      normalizeContestRounds(round, contestId),
    );

    return { kind: 'ok', rounds };
  }

  /**
   * Fetches  all the series for the round
   * @param roundId the id of  the round
   */
  async getRoundSeries(roundId: number): Promise<Types.GetSeriesResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/series/${roundId}`,
      {},
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const series: SeriesSnapshot[] = response.data.map(serie => normalizeRoundSeries(serie));

    return { kind: 'ok', series };
  }

  async getParticipants(seriesId: number): Promise<Types.GetParticipantsResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/participant/${seriesId}`,
      {},
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const participants: ParticipantSnapshot[] = response.data.map(participant =>
      normalizeParticipant(participant),
    );

    return { kind: 'ok', participants };
  }

  async submitParticipantVote(
    contestId: number,
    participantId: number,
    vote: JuryVote,
  ): Promise<Types.GetSubmitVoteResult> {
    const data = new FormData();
    data.append('contest_id', contestId);
    data.append('participant_id', participantId);
    data.append('ritm', vote.rhythm);
    data.append('coregrafie', vote.choreography);
    data.append('corectitudine', vote.correctitude);
    data.append('componentaArtistica', vote.artisticComponent);

    const response: ApiResponse<any> = await this.apisauce.post('/note/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this.token} `,
      },
    });
    console.log(response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    return { kind: 'ok' };
  }

  /**
   * Makes login request for Juror
   */
  async login(credentials: UserCredentials): Promise<Types.GetLoginResult> {
    const data = new FormData();
    data.append('username', credentials.username);
    data.append('password', credentials.password);
    data.append('grant_type', 'password');

    const response: ApiResponse<any> = await this.apisauce.post('/auth/token/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic MzZqSjZTRThsVlNrZmVUOWxvUTduaWk1YjE3c3paRElMOFk4MldGaTo1QzJpS3NMelJsa3dua3VscUZnbXZmNHJrZEVDREhsVnBNVjUwbkpoTmx0ekNEY3o1REZWNGJ5Yno1MjN1TjVoQVNLeFFvcW9tenZqem9pVnczNEt5WlZVQ1dEVnQ2R29TblNsSmh1b1NRbWhpNzZKOTlXRThHd3BYbDE0cDJZWA==',
      },
    });
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    } else {
      const token: string = response.data.access_token;
      this.setToken(token);
      const email = response.data.email ? response.data.email : '';

      return { kind: 'ok', token, email };
    }
  }

  async logout(): Promise<void> {
    const data = new FormData();
    data.append('token', this.token);
    data.append('client_id', '36jJ6SE8lVSkfeT9loQ7nii5b17szZDIL8Y82WFi');
    data.append(
      'client_secret',
      '5C2iKsLzRlkwnkulqFgmvf4rkdECDHlVpMV50nJhNltzCDcz5DFV4bybz523uN5hASKxQoqomzvjzoiVw34KyZVUCWDVt6GoSnSlJhuoSQmhi76J99WE8GwpXl14p2YX',
    );
    await this.apisauce.post('/auth/revoke_token/', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token,
      },
    });
    this.setToken(null);
  }

  async getContestResults(contestId: number): Promise<Types.GetResults> {
    const response: ApiResponse<any> = await this.apisauce.get(`/rezultat/${contestId}`);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const results: ContestantResultSnapshot[] = response.data.map(result =>
      normalizeContestantResult(result),
    );
    return {
      kind: 'ok',
      results,
    };
  }
}
