import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ParticipantCard } from "./"

declare var module

storiesOf("ParticipantCard", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ParticipantCard text="ParticipantCard" />
      </UseCase>
    </Story>
  ))
