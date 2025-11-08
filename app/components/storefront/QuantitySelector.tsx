'use client';

import { useState, useTransition } from 'react';
import { updateItemQuantity } from '@/app/actions';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  productId: string;
  initialQuantity: number;
}

export function QuantitySelector({ productId, initialQuantity }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      startTransition(() => {
        updateItemQuantity(productId, newQuantity);
      });
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    startTransition(() => {
      updateItemQuantity(productId, newQuantity);
    });
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={handleDecrement}
        disabled={isPending || quantity <= 1}
        className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-gray-900 min-w-8 text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={isPending}
        className="px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
