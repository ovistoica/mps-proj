import * as React from 'react';
import { View, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { Text } from '../text';
import { ParticipantSnapshot } from '../../models';
import { color, spacing } from '../../theme';
import { mergeAll, flatten } from 'ramda';
import moment from 'moment';
import { TimeStatus, getTimeStatus } from '../../utils/contest.utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../button';

type VotingStatus = 'voted' | 'inactive' | 'not-voted';

export interface ParticipantCardProps {
  /**
   * The round to display in the card
   */
  participant: ParticipantSnapshot;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * On press function
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * The status of the series of the participant. Used for rendering active or inactive
   */
  seriesStatus?: TimeStatus;
}

const ACTIVE: ViewStyle = {
  height: 150,
  flex: 1,
  backgroundColor: color.top,
  margin: spacing[3],
  alignItems: 'flex-start',
  elevation: 2,
};

const INACTIVE: ViewStyle = {
  height: 150,
  flex: 1,
  backgroundColor: color.surface,
  margin: spacing[3],
  alignItems: 'flex-start',
  elevation: 2,
};

const IN_PROGRESS: TextStyle = {
  color: color.palette.angry,
  textAlign: 'center',
};

const PARTICIPANT: TextStyle = {
  color: color.primary,
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
};

const DATE_TEXT: TextStyle = {
  color: color.textMuted,
  fontSize: 12,
  textAlign: 'left',
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
 * Component to display information about a participant
 */
export function ParticipantCard(props: ParticipantCardProps) {
  const { participant, style } = props;
  const activeParticipantContainer = mergeAll(flatten([style, ACTIVE]));
  const inactiveParticipantContainer = mergeAll(flatten([style, INACTIVE]));

  const participantStatus = getTimeStatus(participant);

  let roundText: string;
  let displayTime: string;
  switch (participantStatus) {
    case 'in-progress':
      roundText = 'Started ';
      displayTime = moment(participant.startTime).calendar();
      break;
    case 'not-started':
      roundText = 'Will Start ';
      displayTime = moment(participant.startTime).calendar();
      break;
    case 'finished':
      roundText = 'Finished ';
      displayTime = moment(participant.endTime).calendar();
  }

  const votingStatus: VotingStatus =
    props.seriesStatus === 'not-started' || participantStatus === 'not-started'
      ? 'inactive'
      : participant.voted
      ? 'voted'
      : 'not-voted';

  const renderInactiveParticipant = () => (
    <View style={inactiveParticipantContainer}>
      <View style={CARD_TITLE}>
        <View style={ICON_CONTAINER}>{personIcon}</View>
        <Text style={PARTICIPANT}>{participant.firstName} </Text>
        <Text style={PARTICIPANT}>{participant.lastName}</Text>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={DATE_TEXT}>
          {roundText}
          <Text preset="bold" style={DATE_TEXT}>
            {displayTime}
          </Text>
        </Text>
      </View>
    </View>
  );

  const participantStatusText = participantStatus === 'in-progress' ? '- Dancing Now' : '';

  const renderActiveParticipant = () => (
    <View style={activeParticipantContainer}>
      <View style={CARD_TITLE}>
        <View style={ICON_CONTAINER}>{personIcon}</View>
        <Text style={PARTICIPANT}>{participant.firstName} </Text>
        <Text style={PARTICIPANT}>{participant.lastName}</Text>
        <Text style={IN_PROGRESS}> {participantStatusText}</Text>
      </View>

      <View style={{ marginLeft: 10 }}>
        <Text style={DATE_TEXT}>
          {roundText}
          <Text preset="bold" style={DATE_TEXT}>
            {displayTime}
          </Text>
        </Text>
      </View>
      <View style={{ marginLeft: 8 }}></View>
      {votingStatus === 'not-voted' ? (
        <Button
          text="VOTE"
          textStyle={{ color: color.secondary, fontSize: 18, fontWeight: 'bold' }}
          style={{ backgroundColor: color.top }}
        />
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: color.textMuted, fontSize: 18, fontWeight: 'bold' }}>VOTED</Text>
        </View>
      )}
    </View>
  );

  return votingStatus === 'inactive' ? renderInactiveParticipant() : renderActiveParticipant();
}
