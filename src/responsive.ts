/*
    1. mob-lg | 2. tab-sm | 3. tab-lg  | 4. desk-md
*/
type TDeviceType = 'MOBILE_SM' | 'MOBILE_LG' | 'TABLET_SM' | 'TABLET_MD' | 'TABLET_LG' | 'DESKTOP_SM' | 'DESKTOP_MD' | 'DESKTOP_LG' | 'DESKTOP_XL';

export const getGridDimensions = (DEVICE_TYPE: TDeviceType): { rows: number; cols: number } => {
  switch (DEVICE_TYPE) {
    case 'MOBILE_SM':
    case 'MOBILE_LG':
    case 'TABLET_SM':
    case 'TABLET_MD':
      return { rows: 4, cols: 1 };
    case 'TABLET_LG':
    case 'DESKTOP_SM':
      return { rows: 1, cols: 3 };
    case 'DESKTOP_MD':
    case 'DESKTOP_LG':
    case 'DESKTOP_XL':
      return { rows: 1, cols: 4 };
    default:
      return { rows: 1, cols: 1 };
  }
};

export const BREAKPOINTS = {
  MOBILE_SM: {
    px: 0,
    em: 0,
  },
  MOBILE_LG: {
    px: 480,
    em: 30,
  },
  TABLET_SM: {
    px: 600,
    em: 37.5,
  },
  TABLET_MD: {
    px: 768,
    em: 48,
  },
  TABLET_LG: {
    px: 900,
    em: 56.25,
  },
  DESKTOP_SM: {
    px: 1024,
    em: 64,
  },
  DESKTOP_MD: {
    px: 1200,
    em: 75,
  },
  DESKTOP_LG: {
    px: 1440,
    em: 90,
  },
  DESKTOP_XL: {
    px: 1920,
    em: 120,
  },
};

export const pxToEm = (pixels, bp) => pixels / (bp.px / bp.em);
