import * as fs from 'fs';

import { deepMutate } from './src/utils/object';
import './src/utils/prototype';

// ================================================================

const PROPERTY_PREFIXES = {
  '--color-': 'colors',
  '--font-family-': 'fontFamily',
  '--box-shadow-': 'boxShadow',
};

const PROPERTY_TRANSFORMS = {
  // colors: propertyDeclaration => `rgba(var(${propertyDeclaration}) / <alpha-value>)`,
  fontFamily: (propertyDeclaration) => `var(${propertyDeclaration})`,
  boxShadow: (propertyDeclaration) => `var(${propertyDeclaration})`,
};

/**
 * Converts HEX color to RGB
 */
export function hexToRGB(hex) {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b].join(' ');
}

/**
 * Transform Color values to rgba()
 */
const transformColor = (declaration: String) => {
  const CSSDeclarationSplit = declaration.replace(';', '').split(':'); // --color-tertiary, var(--color-hermes-orange)
  // const declarationName = String(CSSDeclarationSplit[0]).removeWhitespace(); // --color-tertiary
  const declarationValue = CSSDeclarationSplit[1]; // var(--color-hermes-orange) // rgb(255 0 255)

  // RGB
  if (declarationValue.includes('rgb(')) {
    const [rgb] = declarationValue.split('rgb(')[1].split(')');

    return rgb.includes(',') ? `rgba(${rgb}, <alpha-value>)` : `rgba(${rgb} / <alpha-value>)`;

    // HEX
  } else if (declarationValue.includes('#')) {
    return `rgba(${hexToRGB(declarationValue.replace('#', ''))} / <alpha-value>)`;

    // rgba() || var()
  } else {
    return declarationValue;
  }
};

// ================================================================

/**
 * PostCSS Parse
 */
// export function parseCSS(pathToFile, propertyPrefixes, propertyFormat) {
//   fs.readFile(pathToFile, (err, cssCode) => {
//     postcss([
//       // Plugins
//       // postcssPluginSass(),
//       postcssPluginReporter(),
//     ])
//       // Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to 'CSS file path' or to `undefined` to prevent this warning.
//       .process(cssCode, {
//         from: pathToFile ?? undefined,
//         // parser: postcssPluginSCSS
//       })
//       .then(r => {
//         console.log('------- PostCSS obj');
//         // console.log(JSON.stringify(r, null, 4));

//         const CSSRules = r.root.nodes ?? []
//         console.log(JSON.stringify(CSSRules, null, 4));

//       })
//       .catch(e => console.error(e));
//   });
// }

/**
 * Read CSS rules from CSS variables file
 *
 * @returns {object} Tailwind config theme properties
 * @example {
 *  colors: {}
 *  fontFamily: {}
 *  boxShadow: {}
 * }
 */

export function parseCSS(pathToFile) {
  let result = {};

  // Read lines

  const CSSInput = fs.readFileSync(pathToFile, { encoding: 'utf8', flag: 'r' });
  const CSSLines = CSSInput.split(/\r?\n/);

  const prefixes = Object.keys(PROPERTY_PREFIXES);
  const filteredLines = CSSLines.filter((line) => prefixes.some((pref) => line.includes(pref)));

  // Transform declarations // Link Tailwind properties to CSS variables

  for (const CSSDeclaration of filteredLines) {
    const declarationName = String(CSSDeclaration.split(':')[0]).removeWhitespace(); // --font-family-heading
    const prefix = prefixes.find((pref) => declarationName.includes(pref)) ?? ''; // --font-family-

    const propertyName = declarationName.split(prefix)[1]; // heading
    const tailwindName = PROPERTY_PREFIXES[prefix]; // fontFamily

    const tailwindValue = tailwindName === 'colors' ? transformColor(CSSDeclaration) : PROPERTY_TRANSFORMS[tailwindName](declarationName);

    deepMutate(result, `${tailwindName}.${propertyName}`, tailwindValue);
  }

  return result;
}

/**
 * DaisyUI customTheme
 */

export const customTheme = {
  primary: '#a991f7',
  // 'primary-content': '', // optional, Will be a readable tone of primary if not specified
  secondary: '#f6d860',
  // 'secondary-content': '', // optional, Will be a readable tone of primary if not specified
  accent: '#37cdbe',
  // 'accent-content': '', // optional, Will be a readable tone of primary if not specified
  neutral: '#3d4451',
  // 'neutral-content': '', // optional, Will be a readable tone of primary if not specified
  'base-100': '#ffffff',
  // 'base-200': '#ffffff', // Will be a readable tone of base-100 if not specified
  // 'base-300': '#ffffff', // Will be a readable tone of base-200 if not specified
  // 'base-content': '#ffffff', // Will be a readable tone of base-100 if not specified
  info: '#3d4451',
  // 'info-content': '#ffffff', // Will be a readable tone of base-100 if not specified
  success: '#3d4451',
  // 'success-content': '#ffffff', // Will be a readable tone of base-100 if not specified
  warning: '#3d4451',
  // 'warning-content': '#ffffff', // Will be a readable tone of base-100 if not specified
  error: '#3d4451',
  // 'error-content': '#ffffff', // Will be a readable tone of base-100 if not specified

  '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
  '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
  '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
  '--animation-btn': '0.25s', // duration of animation when you click on button
  '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
  '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
  '--border-btn': '1px', // border width of buttons
  '--tab-border': '1px', // border width of tabs
  '--tab-radius': '0.5rem', // border radius of tabs
};
