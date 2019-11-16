import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { RoundCard } from './';

declare var module;

storiesOf('RoundCard', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <RoundCard
          round={{
            id: 1,
            startTime: 'the start time',
            endTime: 'the end time',
            roundNumber: 2,
            contestId: 2,
          }}
        />
      </UseCase>
    </Story>
  ));
