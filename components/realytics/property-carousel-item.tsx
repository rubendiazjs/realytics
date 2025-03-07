"use client";

import { Bath, Bed, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

export interface PropertyCarouselItemProps {
  id: number;
  titulo: string;
  precio: number;
  ubicacion: string;
  habitaciones: number;
  banos: number;
  metros: number;
  imagen: string;
  tipo: string;
  coincidencia: number;
  horaCoincidencia: string;
  email?: string;
}

export function PropertyCarouselItem({
  id,
  titulo,
  precio,
  ubicacion,
  habitaciones,
  banos,
  metros,
  imagen,
  tipo,
  coincidencia,
  horaCoincidencia,
  email = "",
}: PropertyCarouselItemProps) {
  const router = useRouter();

  // Formatear precio para mostrar
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={imagen || "/placeholder.svg"}
              alt={titulo}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {coincidencia}% coincidencia
            </div>
          </div>
          <CardContent className="p-4">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                {tipo}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {horaCoincidencia}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">
              {titulo}
            </h3>
            <p className="text-gray-500 mb-2 flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{ubicacion}</span>
            </p>
            <p className="text-xl font-bold text-primary mb-3">
              {formatearPrecio(precio)}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Bed className="h-3 w-3 mr-1" />
                {habitaciones} hab.
              </span>
              <span className="flex items-center">
                <Bath className="h-3 w-3 mr-1" />
                {banos} baños
              </span>
              <span className="flex items-center">
                <Maximize className="h-3 w-3 mr-1" />
                {metros} m²
              </span>
            </div>
            <Button
              className="w-full mt-3 text-sm"
              size="sm"
              onClick={() =>
                router.push(
                  `/inmueble/${id}?email=${encodeURIComponent(email)}`
                )
              }
            >
              Ver detalles
            </Button>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
