import { ICONS_SIZES } from '@/utils/constants';
import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle size={ICONS_SIZES.sm} className="animate-spin" />
    </div>
  );
};
