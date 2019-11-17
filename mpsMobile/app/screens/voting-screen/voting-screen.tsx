import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, TextInput, TextStyle } from 'react-native';
import { Text } from '../../components/text';
import { Header } from '../../components/header';
import { Screen } from '../../components/screen';
import { FormRow } from '../../components/form-row';
import { useStores } from '../../models/root-store';
import { color, spacing } from '../../theme';
import { NavigationScreenProps } from 'react-navigation';
import { Button } from '../../components/button';

export interface JuryVote {
  rhythm: number;
  choreography: number;
  artisticComponent: number;
  correctitude: number;
}

export interface VotingScreenProps extends NavigationScreenProps<{}> {}

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  alignItems: 'center',
};

const FORM_INPUT: ViewStyle = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
  justifyContent: 'flex-start',
};

const TEXT_INPUT: TextStyle = {
  width: 50,
  color: color.primary,
  backgroundColor: color.top,
  marginHorizontal: 10,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  justifyContent: 'center',
};

const ERROR_MSG: ViewStyle = {
  ...FORM_INPUT,
  borderColor: color.palette.angry,
  position: 'absolute',
  bottom: 0,
};
const INPUT_LABEL: TextStyle = {
  flex: 0.7,
  color: color.primary,
  fontWeight: 'bold',
  marginHorizontal: 10,
};
const HEADER: ViewStyle = {
  backgroundColor: color.primary,
};

const TITLE: TextStyle = {
  color: color.textInverted,
  fontSize: 20,
  fontWeight: 'bold',
};

export const VotingScreen: React.FunctionComponent<VotingScreenProps> = observer(props => {
  const { contestsStore } = useStores();
  const [vote, setVote] = React.useState<JuryVote>({
    rhythm: null,
    artisticComponent: null,
    choreography: null,
    correctitude: null,
  });
  const [error, setError] = React.useState<boolean>(false);

  const roundId = props.navigation.getParam('roundId' as never);
  const contestId = props.navigation.getParam('contestId' as never);
  const seriesId = props.navigation.getParam('seriesId' as never);
  const participantId = props.navigation.getParam('participantId' as never);

  const participant = contestsStore
    .getContest(contestId)
    .getRound(roundId)
    .getSerie(seriesId)
    .getParticipant(participantId);

  const canSubmitVote = (): boolean => {
    for (const key in vote) {
      if (vote[key] === null || vote[key] < 1 || vote[key] > 10) {
        return false;
      }
    }
    return true;
  };

  const onPress = () => {
    if (canSubmitVote() && !error) {
      participant.submitVote(vote);
      props.navigation.pop();
    }
  };

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.background}>
        <Header
          style={HEADER}
          leftIcon="back"
          onLeftPress={() => props.navigation.pop()}
          headerText={'Vote'}
          titleStyle={TITLE}
        />

        <FormRow preset={'clear'} style={FORM_INPUT}>
          <Text preset="header" style={INPUT_LABEL}>
            Rhythm
          </Text>
          <TextInput
            style={TEXT_INPUT}
            onChangeText={rhythmScore => {
              const rhythm = parseInt(rhythmScore);
              if (rhythm < 1 || rhythm > 10) {
                setError(true);
              } else {
                setVote({ ...vote, rhythm });
                setError(false);
              }
            }}
            value={vote.rhythm && vote.rhythm.toString()}
            autoCapitalize="none"
            maxLength={2}
            keyboardType="numeric"
          />
        </FormRow>
        <FormRow preset={'clear'} style={FORM_INPUT}>
          <Text preset="header" style={INPUT_LABEL}>
            Artistic Component
          </Text>
          <TextInput
            style={TEXT_INPUT}
            onChangeText={artisticScore => {
              const artisticComponent = parseInt(artisticScore);
              if (artisticComponent < 1 || artisticComponent > 10) {
                setError(true);
              } else {
                setVote({ ...vote, artisticComponent });
                setError(false);
              }
            }}
            value={vote.artisticComponent && vote.artisticComponent.toString()}
            autoCapitalize="none"
            maxLength={2}
            keyboardType={'numeric'}
          />
        </FormRow>
        <FormRow preset={'clear'} style={FORM_INPUT}>
          <Text preset="header" style={INPUT_LABEL}>
            Choreography
          </Text>
          <TextInput
            style={TEXT_INPUT}
            onChangeText={choreographyScore => {
              const choreography = parseInt(choreographyScore);
              if (choreography < 1 || choreography > 10) {
                setError(true);
              } else {
                setVote({ ...vote, choreography });
                setError(false);
              }
            }}
            value={vote.choreography && vote.choreography.toString()}
            autoCapitalize="none"
            maxLength={2}
            keyboardType="numeric"
          />
        </FormRow>
        <FormRow preset={'clear'} style={FORM_INPUT}>
          <Text preset="header" style={INPUT_LABEL}>
            Correctitude
          </Text>

          <TextInput
            style={TEXT_INPUT}
            onChangeText={correctitudeScore => {
              const correctitude = parseInt(correctitudeScore);
              if (correctitude < 1 || correctitude > 10) {
                setError(true);
              } else {
                setVote({ ...vote, correctitude });
                setError(false);
              }
            }}
            value={vote.correctitude && vote.correctitude.toString()}
            autoCapitalize="none"
            maxLength={2}
            keyboardType="numeric"
          />
        </FormRow>

        {error && (
          <FormRow preset={'soloRound'} style={ERROR_MSG}>
            <Text>Grades can only be between 1 and 10</Text>
          </FormRow>
        )}
        <Button
          preset="primary"
          text="VOTE"
          textStyle={{
            color: error || !canSubmitVote() ? color.textMuted : color.textInverted,
            fontSize: 20,
            fontWeight: 'bold',
          }}
          style={{
            backgroundColor: error || !canSubmitVote() ? color.underground : color.secondary,
            marginTop: 50,
          }}
          onPress={onPress}
        />
      </Screen>
    </View>
  );
});
