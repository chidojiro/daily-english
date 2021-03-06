import * as styledComponents from 'styled-components';
import { IThemeColors } from '../contexts';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = (styledComponents as unknown) as styledComponents.ThemedStyledComponentsModule<IThemeColors>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
