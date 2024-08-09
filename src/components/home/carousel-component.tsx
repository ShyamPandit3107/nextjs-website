import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { imageShowUrl } from "@/lib/BaseUrl";
const CarouselComponent = (images: any) => {
  return (
    <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full">
      <CarouselContent className="w-full">
        {images.images.map((image: string, index: number) => (
          <CarouselItem key={index}>
            <div>
              <Image
                src={`${imageShowUrl}/${image}`}
                alt="images"
                className="w-full bg-cover mb-10"
                width={1000}
                height={100}
              />
              {/* <CarouselPrevious className="text-white" />
            <CarouselNext /> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselComponent;
