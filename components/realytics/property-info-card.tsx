import { Bath, Bed, Heart, Maximize, Ruler, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface PropertyMainInfoCardProps {
  titulo: string;
  precio: number;
  precioAnterior?: number;
  habitaciones: number;
  banos: number;
  metros: number;
  metrosTerraza?: number;
  descripcion: string;
  caracteristicas: string[];
  planta?: number;
  orientacion?: string;
  ano?: number;
  reformado?: number;
}

export function PropertyMainInfoCard({
  precio,
  precioAnterior,
  habitaciones,
  banos,
  metros,
  metrosTerraza = 0,
  descripcion,
  caracteristicas,
  planta,
  orientacion,
  ano,
  reformado,
}: PropertyMainInfoCardProps) {
  // Formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(valor);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold text-primary">
              {formatearMoneda(precio)}
            </CardTitle>
            {precioAnterior && precioAnterior > precio && (
              <CardDescription className="line-through">
                {formatearMoneda(precioAnterior)}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              Guardar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Compartir
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Bed className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-gray-500">Habitaciones</span>
            <span className="font-bold">{habitaciones}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Bath className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-gray-500">Baños</span>
            <span className="font-bold">{banos}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Maximize className="h-5 w-5 text-primary mb-1" />
            <span className="text-sm text-gray-500">Superficie</span>
            <span className="font-bold">{metros} m²</span>
          </div>
          {metrosTerraza > 0 && (
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <Ruler className="h-5 w-5 text-primary mb-1" />
              <span className="text-sm text-gray-500">Terraza</span>
              <span className="font-bold">{metrosTerraza} m²</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{descripcion}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Características</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {caracteristicas.map((caracteristica, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span className="text-sm">{caracteristica}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {planta !== undefined && (
              <div>
                <h4 className="text-sm text-gray-500">Planta</h4>
                <p className="font-medium">{planta}ª</p>
              </div>
            )}
            {orientacion && (
              <div>
                <h4 className="text-sm text-gray-500">Orientación</h4>
                <p className="font-medium">{orientacion}</p>
              </div>
            )}
            {ano && (
              <div>
                <h4 className="text-sm text-gray-500">Año construcción</h4>
                <p className="font-medium">{ano}</p>
              </div>
            )}
            {reformado && (
              <div>
                <h4 className="text-sm text-gray-500">Última reforma</h4>
                <p className="font-medium">{reformado}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
