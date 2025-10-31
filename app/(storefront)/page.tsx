import { CategorySelectio } from '../components/storefront/CategorySelection';
import { FeaturedProducts } from '../components/storefront/FeaturedProducts';
import Hero from '../components/storefront/Hero';

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategorySelectio />
      <FeaturedProducts />
    </div>
  );
}

// import { Hero } from '../components/storefront/Hero';

// export default function IndexPage() {
//   return (
//     <div>
//       <Hero />
//     </div>
//   );
// }
