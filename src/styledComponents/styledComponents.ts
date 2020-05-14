import * as styledComponents from 'styled-components';
import { IThemeColors } from '../components/themeColors';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeColors>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
