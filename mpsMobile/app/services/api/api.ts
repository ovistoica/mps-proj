import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';
import { UserCredentials } from '../../screens/auth-screen';
import { ContestSnapshot } from '../../models/contest';
import { normalizeContest } from '../../utils/contest.utils';

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
      },
    });
  }
  /**
   * Requests all contests that the user will vote on
   */
  async getContests(userToken: string): Promise<Types.GetContestsResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      '/contest',
      {},
      { headers: { Authorization: `Bearer ${userToken}` } },
    );
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
    console.log('RESPONSE BABYYY', response);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const token: string = response.data.access_token;
    const email = response.data.email ? response.data.email : '';

    return { kind: 'ok', token, email };
  }
}
