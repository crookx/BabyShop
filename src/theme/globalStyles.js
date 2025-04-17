import { css } from '@emotion/react';
import { tokens } from './theme';

export const globalStyles = (theme) => css`
  :root {
    ${Object.entries(tokens.colors).map(([key, value]) => 
      Object.entries(value).map(([shade, color]) => 
        `--color-${key}-${shade}: ${color};`
      ).join('\n')
    )}
  }

  body {
    margin: 0;
    padding: 0;
    transition: background-color 0.2s ease-in-out;
  }

  .user-is-tabbing *:focus {
    outline: 3px solid ${theme.palette.primary.main} !important;
    outline-offset: 2px !important;
  }

  [dir="rtl"] {
    .MuiIcon-root {
      transform: scaleX(-1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;