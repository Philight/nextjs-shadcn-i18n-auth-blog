import Link from 'next/link';
import { Button } from '@/components/shadcn/button';

export default function NotFound() {
  return (
    <div className="h-lvh f-col f-center">
      <h2>Not Found</h2>
      <p className="my-16">Could not find the requested resource</p>
      <Link href="/" className="contents">
        <Button className="mt-8 text-background" type="button" variant="default">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
