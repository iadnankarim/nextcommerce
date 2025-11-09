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
    <div className="w-full">
      <div className="grid gap-4 md:gap-6 items-start">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg w-full aspect-square max-w-[600px] mx-auto">
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
              className="bg-white/70 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
            <Button
              onClick={handleNextClick}
              variant="ghost"
              size="icon"
              className="bg-white/70 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 max-w-[600px] mx-auto w-full">
          {images.map((image, index) => (
            <div
              className={cn(
                index === mainImageIndex
                  ? 'border-2 border-primary/25'
                  : 'border border-gray-200',
                'relative overflow-hidden rounded-lg cursor-pointer aspect-square'
              )}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt="Product Image"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
