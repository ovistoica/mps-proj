import { ApisauceInstance, create, ApiResponse } from "apisauce";
import { getGeneralApiProblem } from "./api-problem";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import * as Types from "./api.types";
import { normalizeContestantResult } from "../../utils/contest.utils";

import { ContestantResultSnapshot } from "../../models/contestant-result";
export interface UserCredentials {
  password: string;
  username: string;
}
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
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  setToken(userToken: string) {
    this.token = userToken;
    this.apisauce.setHeader("Authorization", "Bearer " + userToken);
    this.apisauce.setHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
  }

  /**
   * Makes login request for Juror
   */
  async login(credentials: UserCredentials): Promise<Types.GetLoginResult> {
    const data = new FormData();
    data.append("username", credentials.username);
    data.append("password", credentials.password);
    data.append("grant_type", "password");

    const response: ApiResponse<any> = await this.apisauce.post(
      "/auth/token/",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic MzZqSjZTRThsVlNrZmVUOWxvUTduaWk1YjE3c3paRElMOFk4MldGaTo1QzJpS3NMelJsa3dua3VscUZnbXZmNHJrZEVDREhsVnBNVjUwbkpoTmx0ekNEY3o1REZWNGJ5Yno1MjN1TjVoQVNLeFFvcW9tenZqem9pVnczNEt5WlZVQ1dEVnQ2R29TblNsSmh1b1NRbWhpNzZKOTlXRThHd3BYbDE0cDJZWA=="
        }
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    } else {
      const token: string = response.data.access_token;
      this.setToken(token);
      const email = response.data.email ? response.data.email : "";

      return { kind: "ok", token, email };
    }
  }

  async logout(): Promise<void> {
    const data = new FormData();
    data.append("token", this.token);
    data.append("client_id", "36jJ6SE8lVSkfeT9loQ7nii5b17szZDIL8Y82WFi");
    data.append(
      "client_secret",
      "5C2iKsLzRlkwnkulqFgmvf4rkdECDHlVpMV50nJhNltzCDcz5DFV4bybz523uN5hASKxQoqomzvjzoiVw34KyZVUCWDVt6GoSnSlJhuoSQmhi76J99WE8GwpXl14p2YX"
    );
    await this.apisauce.post("/auth/revoke_token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + this.token
      }
    });
    this.setToken(null);
  }

  async getContestResults(contestId: number): Promise<Types.GetResults> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/rezultat/${contestId}`
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    const results: ContestantResultSnapshot[] = response.data.map(result =>
      normalizeContestantResult(result)
    );
    return {
      kind: "ok",
      results
    };
  }
}
