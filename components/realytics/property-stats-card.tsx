import { Calendar, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface PropertyStatsCardProps {
  publicado: string;
  visitas: number;
  guardados: number;
  coincidencia: number;
}

export function PropertyStatsCard({
  publicado,
  visitas,
  guardados,
  coincidencia,
}: PropertyStatsCardProps) {
  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calcular días desde publicación
  const calcularDiasPublicado = () => {
    const fechaPublicacion = new Date(publicado);
    const hoy = new Date();
    const diferencia = hoy.getTime() - fechaPublicacion.getTime();
    return Math.floor(diferencia / (1000 * 3600 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas del inmueble</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Publicado</span>
          </div>
          <div className="text-sm font-medium">
            {formatearFecha(publicado)} ({calcularDiasPublicado()} días)
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Visitas</span>
          </div>
          <div className="text-sm font-medium">{visitas}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Guardados</span>
          </div>
          <div className="text-sm font-medium">{guardados}</div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Coincidencia con tu perfil</span>
            <span className="font-medium">{coincidencia}%</span>
          </div>
          <Progress value={coincidencia} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
