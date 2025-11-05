// 7///1
// 'use client';

// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Image from 'next/image';
// import { useState } from 'react';

// interface iAppProps {
//   images: string[];
// }

// export function ImageSlider({ images }: iAppProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   function handlePrevClick() {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   }

//   function handleNextClick() {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   }

//   return (
//     <div className="grid gap-6 md:gap-3 items-start">
//       <div className="relative overflow-hidden rounded-lg w-[600px] h-[600px]">
//         <Image
//           src={images[currentIndex]}
//           alt="product image"
//           width={600}
//           height={600}
//           className="object-cover w-full h-full"
//         />

//         {/* Navigation buttons inside image */}
//         <div className="absolute inset-0 flex items-center justify-between px-4">
//           <Button onClick={handlePrevClick} variant="ghost" size="icon">
//             <ChevronLeft className="w-6 h-6" />
//           </Button>

//           <Button onClick={handleNextClick} variant="ghost" size="icon">
//             <ChevronRight className="w-6 h-6" />
//           </Button>
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="grid grid-cols-5 gap-4">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`cursor-pointer rounded-md overflow-hidden border-2 ${
//               currentIndex === index ? 'border-blue-500' : 'border-transparent'
//             }`}
//           >
//             <Image
//               src={image}
//               alt="thumbnail"
//               width={100}
//               height={100}
//               className="object-cover w-[100px] h-[100px]"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-6">
      {/* LEFT SIDE - IMAGE SLIDER */}
      <div className="flex justify-start">
        <div className="grid gap-6 md:gap-3 items-start">
          <div className="relative overflow-hidden rounded-lg w-[600px] h-[600px]">
            <Image
              width={600}
              height={600}
              src={images[mainImageIndex]}
              alt="Product image"
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Button
                onClick={handlePreviousClick}
                variant="ghost"
                size="icon"
                className="bg-white/70 hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={handleNextClick}
                variant="ghost"
                size="icon"
                className="bg-white/70 hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div
                className={cn(
                  index === mainImageIndex
                    ? 'border-2 border-primary/25'
                    : 'border border-gray-200',
                  'relative overflow-hidden rounded-lg cursor-pointer'
                )}
                key={index}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="object-cover w-[100px] h-[100px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - PRODUCT DETAILS */}
      {/* <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{data.name}</h1>
        <p className="text-gray-600">{data.description}</p>
        <p className="text-2xl font-bold">${data.price}</p>

        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
          Add to Cart
        </button>
      </div> */}
    </div>
  );
}
