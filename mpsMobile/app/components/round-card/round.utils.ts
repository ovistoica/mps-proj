import { RoundSnapshot } from '../../models';
import moment from 'moment';

export type RoundStatus = 'finished' | 'in-progress' | 'not-started';

export const getRoundStatus = (round: RoundSnapshot): RoundStatus => {
  const startDate = moment(round.startTime);
  const endDate = moment(round.endTime);

  const presentMoment = moment();
  const roundIsInProgress: boolean = presentMoment.isBetween(startDate, endDate);
  if (roundIsInProgress) {
    return 'in-progress';
  }
  const timeDifference = presentMoment.diff(endDate);
  if (timeDifference > 0) {
    return 'finished';
  }
  return 'not-started';
};
