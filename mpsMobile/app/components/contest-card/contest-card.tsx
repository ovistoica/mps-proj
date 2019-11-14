import * as React from 'react';
import { View, ViewStyle, TextStyle, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text } from '../text';
import { ContestSnapshot } from '../../models/contest';
import { color, typography, spacing } from '../../theme';
import { mergeAll, flatten } from 'ramda';

export interface ContestCardProps {
  /**
   * Function triggered when the card is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * The contest to display in the card
   */
  contest: ContestSnapshot;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;
}
const TEXT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
};

const BOLD: TextStyle = { fontWeight: 'bold' };

const CONTEST: ViewStyle = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.top,
  padding: spacing[4],
  marginVertical: spacing[3],
};

const CONTEST_INFO: TextStyle = {
  ...TEXT,
  ...BOLD,
};
const CONTEST_NAME: TextStyle = {
  ...CONTEST_INFO,
  alignSelf: 'flex-start',
};

const NAME_CONTAINER: ViewStyle = {
  marginLeft: spacing[3],
  justifyContent: 'flex-start',
  flexDirection: 'row',
  width: 150,
};

import Icon from 'react-native-vector-icons/FontAwesome';

const trophyIcon = <Icon name="trophy" size={30} color={color.secondary} />;

/**
 * Small Contest Card showing basic information about the Contest
 */
export function ContestCard(props: ContestCardProps) {
  // grab the props
  const { onPress, contest, style } = props;
  const containerStyle = mergeAll(flatten([CONTEST, style]));

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View>{trophyIcon}</View>

      <View style={NAME_CONTAINER}>
        <Text style={CONTEST_NAME}>{contest.name} </Text>
      </View>

      <View>
        <Text style={CONTEST_INFO}>Type: {contest.type} </Text>
        <Text style={CONTEST_INFO}>Round: {contest.currentRound} </Text>
      </View>
    </TouchableOpacity>
  );
}
