"use client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Bath, Bed, Maximize, TrendingUp } from "lucide-react";

export function PropertyCard({
  property,
}: {
  property: {
    since: string;
    indice: number;
    title: string;
    location: string;
    prize: number;
    roi: number;
    rooms: number;
    baths: number;
    squareMeters: number;
    type: string;
    mainImg: string;
  };
}) {
  // Formatear precio para mostrar
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  return (
    <div className="w-full group/card">
      <div
        style={{ "--image-url": `url(${property.mainImg})` }}
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[image:var(--image-url)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:opacity-30  bg-black opacity-60"></div>
        <div className="flex justify-between z-10">
          <Badge>{property.indice}% de coincidencia</Badge>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-gray-400">{property.since}</p>
          </div>
        </div>
        <div className="text content z-10 flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-md text-gray-200 relative z-10">
            {property.title}
          </h1>
          <div className="grid grid-cols-[1fr_auto] items-center z-10">
            <p className="text-xl font-bold text-gray-50">
              {formatearPrecio(property.prize)}
            </p>
            <span className="text-lime-700 flex gap-2 items-center">
              <span className="font-bold text-secondary">
                {property.roi}% ROI
              </span>
              <TrendingUp />
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-50 pt-4">
            <span className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.rooms} hab.
            </span>
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.baths} baños
            </span>
            <span className="flex items-center">
              <Maximize className="h-4 w-4 mr-1" />
              {property.squareMeters} m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
