import { GlobalStyles } from '@mui/material';

const globalStyles = <GlobalStyles styles={`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html, body, #root {
  height: 100%;
}

:root {
  /* Base */
  --color-white: #ffffff;
  --color-background: #f5f5f5;
  --color-background-alt: #f5f5f7;
  --color-background-header-row: #fafafa;

  /* Borders */
  --color-border-light: #e0e0e0;
  --color-border-medium: #C4C4C4;
  --color-border-thumbnail: #ECECEB;

  /* Primary */
  --color-primary: #242EDB;
  --color-primary-stroke: #367AFF;
  --color-primary-hover: #1e26b8;
  --color-primary-action-hover: #303f9f;

  /* Accent */
  --color-accent: #3C538E;
  --color-accent-pagination: #797FEA;

  /* Selection */
  --color-selected-row: #f0f4ff;
  --color-selected-row-hover: #e8edff;

  /* Text */
  --color-text-header: #c7c7cc;
  --color-text-muted: #9e9e9e;
  --color-text-dark: #1a1a2e;

  /* Status */
  --color-rating-danger: #f44336;

  /* Gradient */
  --gradient-card: linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%);

  /* Shadows */
  --shadow-card: 0 2px 20px rgba(0, 0, 0, 0.06);
  --shadow-logo: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.04);
}

body {
  background-color: var(--color-background);
  margin: 0;
}

`} />;

export default globalStyles;
