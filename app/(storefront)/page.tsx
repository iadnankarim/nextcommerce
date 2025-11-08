import { Suspense } from 'react';
import { CategorySelectio } from '../components/storefront/CategorySelection';
import { FeaturedProducts } from '../components/storefront/FeaturedProducts';
import { FeaturedProductsSkeleton } from '../components/storefront/FeaturedProductsSkeleton';
import Hero from '../components/storefront/Hero';

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategorySelectio />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
