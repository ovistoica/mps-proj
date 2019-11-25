import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '../text';
import { TimeStatus } from '../../utils/contest.utils';
import moment from 'moment';
import { SeriesSnapshot } from '../../models';
import { color } from '../../theme';
import { Button } from '../button';

export interface SectionTitleProps {
  /**
   * Text which is looked up via i18n.
   */
  sectionStatus: TimeStatus;

  /**
   *
   */
  series: SeriesSnapshot;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function SectionTitle(props: SectionTitleProps) {
  // grab the props
  const { style, series, sectionStatus } = props;
  const textStyle = {};

  let roundText: string;
  switch (sectionStatus) {
    case 'in-progress':
      roundText = 'In Progress ';
      break;
    case 'not-started':
      roundText = 'Not Started';
      break;
    case 'finished':
      roundText = 'Finished ';
  }

  return (
    <View style={[style, { flexDirection: 'row', alignItems: 'center' }]}>
      <Text preset="header" style={{ color: color.primary }}>
        Series no. {series.seriesNumber}{' '}
      </Text>
      <Text
        preset="header"
        style={{
          color:
            sectionStatus === 'finished'
              ? color.textMuted
              : sectionStatus === 'in-progress'
              ? color.palette.angry
              : color.primary,
        }}
      >
        {roundText}
      </Text>
      <Button text="See Results" textStyle={{ color: color.textInverted }} />
    </View>
  );
}
