import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { ContestCard } from './';

declare var module;

storiesOf('ContestCard', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ContestCard
          contest={{
            name: 'Test Contest',
            type: 'Battle',
            currentRound: 0,
            numberOfRounds: 3,
            id: 100,
            startTime: Date.now(),
            endTime: Date.now(),
            password: 'password',
          }}
        />
      </UseCase>
    </Story>
  ));
