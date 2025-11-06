'use client';

import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface buttonProps {
  text: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">
          <ShoppingBag className="h-5 w-5 mr-2 " /> Add to Cart
        </Button>
      )}
    </>
  );
}
