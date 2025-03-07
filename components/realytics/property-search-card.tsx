"use client";

import { Bath, Bed, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface PropertySearchCardProps {
  id: number;
  titulo: string;
  precio: number;
  ubicacion: string;
  habitaciones: number;
  banos: number;
  metros: number;
  imagen: string;
  tipo: string;
  email?: string;
}

export function PropertySearchCard({
  id,
  titulo,
  precio,
  ubicacion,
  habitaciones,
  banos,
  metros,
  imagen,
  tipo,
  email = "",
}: PropertySearchCardProps) {
  const router = useRouter();

  // Formatear precio para mostrar
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imagen || "/placeholder.svg"}
          alt={titulo}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
            {tipo}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
        <p className="text-gray-500 mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {ubicacion}
        </p>
        <p className="text-xl font-bold text-primary mb-4">
          {formatearPrecio(precio)}
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {habitaciones} hab.
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {banos} baños
          </span>
          <span className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            {metros} m²
          </span>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() =>
            router.push(`/inmueble/${id}?email=${encodeURIComponent(email)}`)
          }
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
}
