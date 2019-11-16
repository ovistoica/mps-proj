import * as React from 'react';
import { View, ViewStyle, TextStyle, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Text } from '../text';
import { RoundSnapshot } from '../../models';
import { color, spacing } from '../../theme';
import { mergeAll, flatten } from 'ramda';
import moment from 'moment';
import { RoundStatus, getRoundStatus } from './round.utils';

export interface RoundCardProps {
  /**
   * The round to display in the card
   */
  round: RoundSnapshot;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * On press function
   */
  onPress?: (event: GestureResponderEvent) => void;
}

const ACTIVE: ViewStyle = {
  height: 100,
  flex: 1,
  backgroundColor: color.top,
  margin: spacing[3],
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

const INACTIVE: ViewStyle = {
  height: 100,
  flex: 1,
  backgroundColor: color.underground,
  margin: spacing[3],
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

const IN_PROGRESS: TextStyle = {
  color: color.palette.angry,
  textAlign: 'center',
};

const ROUND: TextStyle = {
  color: color.secondary,
  textAlign: 'center',
};

const DATE_TEXT: TextStyle = {
  color: color.text,
  fontSize: 16,
};
/**
 *
 * Component to display information about a contest round in the form of a card
 */
export function RoundCard(props: RoundCardProps) {
  // grab the props
  const { round, style } = props;
  const activeRoundContainer = mergeAll(flatten([style, ACTIVE]));
  const inactiveRoundContainer = mergeAll(flatten([style, INACTIVE]));

  const roundStatus = getRoundStatus(round);

  let roundText: string;
  let displayTime: string;
  switch (roundStatus) {
    case 'in-progress':
      roundText = 'Started ';
      displayTime = moment(round.startTime).calendar();
      break;
    case 'not-started':
      roundText = 'Will Start ';
      displayTime = moment(round.startTime).calendar();
      break;
    case 'finished':
      roundText = 'Ended ';
      displayTime = moment(round.endTime).calendar();
  }

  const roundStatusText = roundStatus === 'in-progress' ? 'In Progress' : '';

  const renderActiveRound = () => (
    <TouchableOpacity style={activeRoundContainer} onPress={props.onPress}>
      <Text preset="header" style={ROUND}>
        Round {round.roundNumber}
      </Text>
      <Text style={DATE_TEXT}>
        {roundText}
        <Text preset="bold" style={DATE_TEXT}>
          {displayTime}
        </Text>
      </Text>
      <Text style={IN_PROGRESS}> {roundStatusText}</Text>
    </TouchableOpacity>
  );

  const renderEndedRound = () => (
    <View style={inactiveRoundContainer}>
      <Text preset="header" style={[ROUND, { color: color.textMuted }]}>
        Round {round.roundNumber}
      </Text>
      <Text style={[DATE_TEXT, { color: color.textMuted }]}>
        {roundText}
        <Text preset="bold" style={{ color: color.textMuted }}>
          {displayTime}
        </Text>
      </Text>
      <Text style={IN_PROGRESS}> {roundStatusText}</Text>
    </View>
  );

  const renderInTheFutureRound = () => (
    <View style={[inactiveRoundContainer, { backgroundColor: color.surface }]}>
      <Text preset="header" style={[ROUND, { color: color.text }]}>
        Round {round.roundNumber}
      </Text>
      <Text style={[DATE_TEXT, { color: color.textSecondary }]}>
        {roundText}
        <Text preset="bold">{displayTime}</Text>
      </Text>
      <Text style={IN_PROGRESS}> {roundStatusText}</Text>
    </View>
  );

  return roundStatus === 'in-progress'
    ? renderActiveRound()
    : roundStatus === 'finished'
    ? renderEndedRound()
    : renderInTheFutureRound();
}
