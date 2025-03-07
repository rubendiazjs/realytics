import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface PropertyGalleryCarouselProps {
  imagenes: string[];
  titulo: string;
}

export function PropertyGalleryCarousel({
  imagenes,
  titulo,
}: PropertyGalleryCarouselProps) {
  return (
    <div className="mb-6">
      <Carousel className="w-full">
        <CarouselContent>
          {imagenes.map((imagen, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden">
                <Image
                  src={imagen || "/placeholder.svg"}
                  alt={`Imagen ${index + 1} de ${titulo}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-12">
          <CarouselPrevious className="relative mr-2" />
          <CarouselNext className="relative" />
        </div>
      </Carousel>
    </div>
  );
}
