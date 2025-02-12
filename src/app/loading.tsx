import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="h-lvh f-center">
      <Loader2 className="animate-spin text-primary mr-1" />
      <p>Loading...</p>
    </div>
  );
}
