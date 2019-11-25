import * as React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Text } from '../text';
import { ContestantResultSnapshot } from '../../models/contestant-result';
import { color, spacing } from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mergeAll, flatten } from 'ramda';

export interface ResultCardProps {
  /**
   * The result to display in the card
   */
  result: ContestantResultSnapshot;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[];
}

const CONTAINER: ViewStyle = {
  height: 150,
  flex: 1,
  backgroundColor: color.top,
  margin: spacing[3],
  alignItems: 'flex-start',
  elevation: 2,
};

const PARTICIPANT: TextStyle = {
  color: color.primary,
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
};

const ICON_CONTAINER: ViewStyle = {
  margin: 10,
};

const CARD_TITLE: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const personIcon = <Icon name="user-circle" size={40} color={color.primary} />;

/**
 *
 * Component to display information about a contestant's result
 */
export function ResultCard(props: ResultCardProps) {
  const { result, style } = props;
  const statusStyle = { backgroundColor: result.status === 1 ? color.top : color.underground };
  const resultContainer = mergeAll(flatten([style, CONTAINER, statusStyle]));

  return (
    <View style={resultContainer}>
      <View style={CARD_TITLE}>
        <View style={ICON_CONTAINER}>{personIcon}</View>
        <Text style={PARTICIPANT}>{result.firstName} </Text>
        <Text style={PARTICIPANT}>{result.lastName}</Text>
      </View>
      <View style={CARD_TITLE}>
        <Text style={PARTICIPANT}> GRADE: {result.grade}</Text>
      </View>
    </View>
  );
}
