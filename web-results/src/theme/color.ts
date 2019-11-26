import { palette } from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  /**
   * The screen background.
   */
  background: palette.cream[2],

  /**
   * Inactive areas or form inputs
   */
  underground: palette.cream[3],

  /**
   * The color used for top surfaces like modals and headers
   */
  top: palette.white[1],
  /**
   * The color for basic sheets existing on top of the main screens: Ideas borders, Articles, Topic Boxes
   */
  surface: palette.cream[1],

  /**
   * The main text color
   */
  text: palette.black[2],
  /**
   * The secondary text color. Used in elements with lower importance
   */
  textSecondary: palette.darkBlue,
  /**
   * The color for text on deactivated items
   */
  textMuted: palette.gray[2],

  /**
   * The color for text on items like buttons or items with primary/secondary colors
   */
  textInverted: palette.white[2],
  /**
   * The main tinting color.
   */
  primary: palette.grayBlue[1],
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.grayBlue[2],

  /**
   * The second tinting color
   */
  secondary: palette.orange[4],
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,

  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
};
