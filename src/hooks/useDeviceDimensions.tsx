import {
  useState, useEffect 
} from 'react';

export type TDeviceType = 'MOBILE_SM' | 'MOBILE_LG' | 'TABLET_SM' | 'TABLET_MD' | 'TABLET_LG' | 'DESKTOP_SM' | 'DESKTOP_MD' | 'DESKTOP_LG' | 'DESKTOP_XL';

export interface IDeviceDimensions {
  DEVICE_WIDTH: number;
  DEVICE_HEIGHT: number;
  DEVICE_TYPE: string;
  DEVICE_IS_TOUCH: boolean;
}

 
const BREAKPOINTS: { [key in TDeviceType]: number } = {
  DESKTOP_XL: 1920,
  DESKTOP_LG: 1440,
  DESKTOP_MD: 1200,
  DESKTOP_SM: 1024,
  TABLET_LG: 900,
  TABLET_MD: 768,
  TABLET_SM: 600,
  MOBILE_LG: 480,
  MOBILE_SM: 0,
};

const getDeviceType = (width: number): TDeviceType => {
  for (const [DEVICE, MIN_WIDTH] of Object.entries(BREAKPOINTS)) {
    if (width >= MIN_WIDTH) {
      return DEVICE as TDeviceType;
    }
  }
  return 'MOBILE_SM' as TDeviceType;
};

const isTouchDevice = (): boolean => {
  // @ts-ignore
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

function getWindowDimensions() {
  const { innerWidth: DEVICE_WIDTH, innerHeight: DEVICE_HEIGHT } = window;
  return {
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    DEVICE_TYPE: getDeviceType(DEVICE_WIDTH),
    DEVICE_IS_TOUCH: isTouchDevice(),
  } as IDeviceDimensions;
}

export default function useDeviceDimensions(): IDeviceDimensions {
  const [windowDimensions, setWindowDimensions] = useState<IDeviceDimensions>(getWindowDimensions());

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    // Add an event listener to handle window resize.
    window.addEventListener('resize', handleResize);

    // Remove the event listener on component unmount.
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
