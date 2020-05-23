import React from 'react';
import { ThemeProvider, createGlobalStyle } from '../../styledComponents';

type IAvailableThemeColors =
  | 'BASE'
  | 'BASE_LIGHT'
  | 'BASE_DARK'
  | 'RED'
  | 'GREEN'
  | 'BLUE'
  | 'WHITE'
  | 'BLACK'
  | 'LIGHT_GREY_1'
  | 'LIGHT_GREY_2'
  | 'LIGHT_GREY_3'
  | 'LIGHT_GREY_4'
  | 'DARK_GREY_1'
  | 'DARK_GREY_2'
  | 'DARK_GREY_3'
  | 'DARK_GREY_4';

export type IThemeColors = {
  [key in IAvailableThemeColors]: string;
};

export const themeColors: IThemeColors = {
  BASE: '#1771d8',
  BASE_DARK: '#184b84',
  BASE_LIGHT: '#185eae',

  LIGHT_GREY_1: '#e2e4e5',
  LIGHT_GREY_2: '#c6c8cb',
  LIGHT_GREY_3: '#a9adb1',
  LIGHT_GREY_4: '#8c9298',

  DARK_GREY_1: '#192430',
  DARK_GREY_2: '#363f4a',
  DARK_GREY_3: '#535b64',
  DARK_GREY_4: '#6f767e',

  BLACK: '#000000',
  WHITE: '#FFFFFF',
  BLUE: '#2d75ce',
  GREEN: '#00a596',
  RED: '#dc2d30',
};

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Times';
    /* transition: 0s !important;
    animation-duration: 0s !important; */
  }

  .tooltip--error {
    .ant-tooltip-arrow::before, .ant-tooltip-inner {
      background: ${themeColors.RED};
    }
  }
`;

export const ThemeColorsContextProvider: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={themeColors}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
