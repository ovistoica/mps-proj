import { GeneralApiProblem } from "./api-problem";
import { ContestantResultSnapshot } from "../../models/contestant-result";

export type GetLoginResult =
  | { kind: "ok"; token: string; email: string }
  | GeneralApiProblem;

export type GetResults =
  | { kind: "ok"; results: ContestantResultSnapshot[] }
  | GeneralApiProblem;
