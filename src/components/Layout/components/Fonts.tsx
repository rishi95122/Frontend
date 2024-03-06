import { Global } from "@emotion/react"

const Fonts = () => (
	<Global
		styles={`
      /* latin */
      @font-face {
        font-family: 'Satoshi Italic';
        font-style: bold;
        font-weight: 900;
        font-display: swap;
        src: url('/assets/fonts/Satoshi-BlackItalic.woff2') format('woff2'), url('./fonts/Satoshi-BlackItalic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Satoshi';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Satoshi-Variable.woff2') format('woff2'), url('./fonts/Satoshi-Variable.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
	/>
)

export default Fonts
