'use client';
import { createGlobalStyle } from 'styled-components';
import { COLORS, WEIGHTS, } from './constants';


const GlobalStyles = createGlobalStyle`
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

/* DESIGN TOKENS */
html {
  --color-white: ${COLORS.white};
  --color-gray: ${COLORS.gray};
  --color-black: ${COLORS.black};
  
  --font-weight-regular: ${WEIGHTS.regular};
  --font-weight-bold: ${WEIGHTS.bold};
  --font-family: '__Inter_e66fe9', '__Inter_Fallback_e66fe9', Arial, sans-serif;



  /* font shorthand follows pattern: 
  font-style font-weight font-size/line-height font-family */

  /* h1 used for time display */
  --font-h1-desktop: normal var(--font-weight-bold) 12.5rem/12.5rem var(--font-family);
  --font-h1-tablet: normal var(--font-weight-bold) 10.9375rem/10.9375rem var(--font-family);
  --font-h1-mobile: normal var(--font-weight-bold) 6.25rem/6.25rem var(--font-family);

  /* h2 used in expanded details values, e.g. Timezone, day/month/week  */
  --font-h2-desktop: normal var(--font-weight-bold) 3.5rem/normal var(--font-family);
  --font-h2-tablet: normal var(--font-weight-bold) 2.5rem/normal var(--font-family);
  --font-h2-mobile: normal var(--font-weight-bold) 1.25rem/normal var(--font-family);

  /* h3 used in "in {location}" text */
  --font-h3-desktop: normal var(--font-weight-bold) 1.5rem/1.75rem var(--font-family);
  --font-h3-tablet: normal var(--font-weight-bold) 1.125rem/1.75rem var(--font-family);
  --font-h3-mobile: normal var(--font-weight-bold) 0.9375rem/1.75rem var(--font-family);


  /* h4 used in good morning text */
  --font-h4-desktop: normal var(--font-weight-regular) 1.25rem/1.75rem var(--font-family);
  --font-h4-tablet: normal var(--font-weight-regular) 1.125rem/1.75rem var(--font-family);
  --font-h4-mobile: normal var(--font-weight-regular) 0.9375rem/1.5625rem var(--font-family);

  /* h5 used in quote name attribution */
  --font-h5-desktop: normal var(--font-weight-bold) 1.125rem/1.75rem var(--font-family);
  --font-h5-tablet: normal var(--font-weight-bold) 1.125rem/1.75rem var(--font-family);
  --font-h5-mobile: normal var(--font-weight-bold) 0.75rem/1.375rem var(--font-family);

  /* h6 used in expanded details item names e.g. current timezone */
  --font-h6-desktop: normal var(--font-weight-regular) 0.9375rem/1.75rem var(--font-family);
  --font-h6-tablet: normal var(--font-weight-regular) 0.8125rem/1.75rem var(--font-family);
  --font-h6-mobile: normal var(--font-weight-regular) 0.625rem/1.75rem var(--font-family);

  
  /* body font used for quote text */
  --font-body-desktop: normal var(--font-weight-regular) 1.125rem/1.75rem var(--font-family);
  --font-body-tablet: normal var(--font-weight-regular) 1.125rem/1.75rem var(--font-family);
  --font-body-mobile: normal var(--font-weight-regular) 0.75rem/1.375rem var(--font-family);
  
  /* button font used within more/less toggle buttons */
  --font-button-desktop: normal var(--font-weight-bold) 1rem/1.75rem var(--font-family);
  --font-button-tablet: normal var(--font-weight-bold) 1rem/1.75rem var(--font-family);
  --font-button-mobile: normal var(--font-weight-bold) 0.75rem/0.875rem var(--font-family);
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

html {
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;
}

html, #root {
  height: 100%;

}

body {
  background-color: var(--color-gray-100);  
  height: fit-content;
}

/*
  Remove default button styles
*/
button {
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyles;