import { ContestantResultSnapshot } from "../models/contestant-result";

export function normalizeContestantResult(
  participant: any
): ContestantResultSnapshot {
  return {
    id: participant.id,
    firstName: participant.first_name,
    lastName: participant.last_name,
    grade: participant.nota,
    status: participant.status
  };
}
