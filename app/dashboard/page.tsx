"use client";

import { AppHeader } from "@/components/realytics/app-header";
import { PropertyCard } from "@/components/realytics/property-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BarChartIcon as ChartBar,
  ChevronUp,
  Eye,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Datos de ejemplo para las estadísticas
// const actividadReciente = [
//   { fecha: "Lun", vistas: 12 },
//   { fecha: "Mar", vistas: 19 },
//   { fecha: "Mié", vistas: 15 },
//   { fecha: "Jue", vistas: 22 },
//   { fecha: "Vie", vistas: 30 },
//   { fecha: "Sáb", vistas: 18 },
//   { fecha: "Dom", vistas: 25 },
// ];

// const propiedadesCoincidentes = [
//   { hora: "00:00", cantidad: 2 },
//   { hora: "04:00", cantidad: 3 },
//   { hora: "08:00", cantidad: 7 },
//   { hora: "12:00", cantidad: 5 },
//   { hora: "16:00", cantidad: 9 },
//   { hora: "20:00", cantidad: 6 },
// ];

// const rendimientoROI = [
//   { mes: "Ene", roi: 3.2 },
//   { mes: "Feb", roi: 3.5 },
//   { mes: "Mar", roi: 3.3 },
//   { mes: "Abr", roi: 3.8 },
//   { mes: "May", roi: 4.0 },
//   { mes: "Jun", roi: 3.9 },
//   { mes: "Jul", roi: 4.2 },
//   { mes: "Ago", roi: 4.5 },
//   { mes: "Sep", roi: 4.3 },
//   { mes: "Oct", roi: 4.6 },
//   { mes: "Nov", roi: 4.8 },
//   { mes: "Dic", roi: 5.0 },
// ];

// Datos de ejemplo para propiedades coincidentes en las últimas 24 horas
const propiedadesUltimas24h = [
  {
    id: 1,
    titulo: "Ático con terraza panorámica",
    precio: 285000,
    ubicacion: "Madrid, Chamberí",
    habitaciones: 2,
    banos: 2,
    metros: 90,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/4d/88/4d/1279518724.jpg",
    tipo: "Ático",
    coincidencia: 95,
    horaCoincidencia: "Hace 2 horas",
    roi: 6.2,
  },
  {
    id: 2,
    titulo: "Piso reformado cerca del metro",
    precio: 195000,
    ubicacion: "Barcelona, Gracia",
    habitaciones: 3,
    banos: 1,
    metros: 85,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/1f/32/c8/1141141073.jpg",
    tipo: "Piso",
    coincidencia: 92,
    horaCoincidencia: "Hace 5 horas",
    roi: 5.8,
  },
  {
    id: 3,
    titulo: "Apartamento con vistas al mar",
    precio: 320000,
    ubicacion: "Valencia, Playa",
    habitaciones: 2,
    banos: 2,
    metros: 75,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/d3/03/6e/1297921231.jpg",
    tipo: "Apartamento",
    coincidencia: 89,
    horaCoincidencia: "Hace 8 horas",
    roi: 7.1,
  },
  {
    id: 4,
    titulo: "Dúplex en zona residencial",
    precio: 275000,
    ubicacion: "Sevilla, Nervión",
    habitaciones: 3,
    banos: 2,
    metros: 120,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/50/39/ef/1285131947.jpg",
    tipo: "Dúplex",
    coincidencia: 87,
    horaCoincidencia: "Hace 10 horas",
    roi: 6.5,
  },
  {
    id: 5,
    titulo: "Chalet adosado con jardín",
    precio: 390000,
    ubicacion: "Málaga, Este",
    habitaciones: 4,
    banos: 3,
    metros: 180,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/7c/2e/6e/1284944851.jpg",
    tipo: "Chalet",
    coincidencia: 85,
    horaCoincidencia: "Hace 14 horas",
    roi: 6.8,
  },
  {
    id: 6,
    titulo: "Estudio céntrico reformado",
    precio: 145000,
    ubicacion: "Bilbao, Abando",
    habitaciones: 1,
    banos: 1,
    metros: 45,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/9b/72/6b/1303936784.jpg",
    tipo: "Estudio",
    coincidencia: 83,
    horaCoincidencia: "Hace 18 horas",
    roi: 5.3,
  },
  {
    id: 7,
    titulo: "Piso con terraza en zona tranquila",
    precio: 230000,
    ubicacion: "Zaragoza, Centro",
    habitaciones: 3,
    banos: 1,
    metros: 95,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/66/ea/4c/1272760165.jpg",
    tipo: "Piso",
    coincidencia: 81,
    horaCoincidencia: "Hace 22 horas",
    roi: 5.6,
  },
];

const propiedadesUsuario = [
  {
    id: 1,
    nombre: "Apartamento Centro",
    tipo: "Apartamento",
    valorCompra: 180000,
    valorActual: 210000,
    rentaMensual: 850,
    roi: 5.7,
    tendencia: "alza",
  },
  {
    id: 2,
    nombre: "Chalet Zona Norte",
    tipo: "Casa",
    valorCompra: 320000,
    valorActual: 365000,
    rentaMensual: 1200,
    roi: 4.5,
    tendencia: "alza",
  },
  {
    id: 3,
    nombre: "Local Comercial",
    tipo: "Local",
    valorCompra: 150000,
    valorActual: 155000,
    rentaMensual: 950,
    roi: 7.6,
    tendencia: "estable",
  },
  {
    id: 4,
    nombre: "Piso Playa",
    tipo: "Apartamento",
    valorCompra: 210000,
    valorActual: 245000,
    rentaMensual: 1100,
    roi: 6.3,
    tendencia: "alza",
  },
];

export default function Estadisticas() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Calcular estadísticas generales
  const totalPropiedades = propiedadesUsuario.length;
  const totalInversion = propiedadesUsuario.reduce(
    (sum, prop) => sum + prop.valorCompra,
    0
  );
  const valorActualTotal = propiedadesUsuario.reduce(
    (sum, prop) => sum + prop.valorActual,
    0
  );
  const rentabilidadTotal =
    ((valorActualTotal - totalInversion) / totalInversion) * 100;
  const roiPromedio =
    propiedadesUsuario.reduce((sum, prop) => sum + prop.roi, 0) /
    totalPropiedades;

  // Formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(valor);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader email={email} />

      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Resumen de tu actividad y rendimiento en la plataforma
          </p>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Propiedades Consultadas
              </CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-gray-500">
                +28% respecto a la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Propiedades Coincidentes
              </CardTitle>
              <ChartBar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-gray-500">En las últimas 24 horas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                ROI Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roiPromedio.toFixed(1)}%
              </div>
              <p className="text-xs text-green-500 flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" />
                0.5% respecto al mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Rentabilidad Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rentabilidadTotal.toFixed(1)}%
              </div>
              <p className="text-xs text-green-500 flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" />
                {formatearMoneda(valorActualTotal - totalInversion)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Carrusel de propiedades coincidentes en las últimas 24 horas */}
        <div className="mb-6">
          <CardHeader className="px-0">
            <CardTitle>
              Propiedades Coincidentes en las Últimas 24 Horas
            </CardTitle>
            <CardDescription>
              Inmuebles que coinciden con tu perfil de inversión
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Carousel className="w-full">
              <CarouselContent>
                {propiedadesUltimas24h.map((propiedad) => (
                  <CarouselItem
                    key={propiedad.id}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="p-0">
                      <Link href={`/property/${propiedad.id}?email=${email}`}>
                        <PropertyCard
                          property={{
                            since: propiedad.horaCoincidencia,
                            indice: propiedad.coincidencia,
                            title: propiedad.titulo,
                            location: propiedad.ubicacion,
                            prize: propiedad.precio,
                            roi: propiedad.roi,
                            rooms: propiedad.habitaciones,
                            baths: propiedad.banos,
                            squareMeters: propiedad.metros,
                            type: propiedad.tipo,
                            mainImg: propiedad.imagen,
                          }}
                        />
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-9">
                <CarouselPrevious className="relative mr-2" />
                <CarouselNext className="relative" />
              </div>
            </Carousel>
          </CardContent>
        </div>

        {/* Tabla de propiedades */}
        <Card>
          <CardHeader>
            <CardTitle>Tus Propiedades</CardTitle>
            <CardDescription>
              Rendimiento de tus propiedades actuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Propiedad
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Tipo</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Valor Compra
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      Valor Actual
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      Renta Mensual
                    </th>
                    <th className="text-right py-3 px-4 font-medium">ROI</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Tendencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propiedadesUsuario.map((propiedad) => (
                    <tr key={propiedad.id} className="border-b">
                      <td className="py-3 px-4">{propiedad.nombre}</td>
                      <td className="py-3 px-4">{propiedad.tipo}</td>
                      <td className="py-3 px-4 text-right">
                        {formatearMoneda(propiedad.valorCompra)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {formatearMoneda(propiedad.valorActual)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {formatearMoneda(propiedad.rentaMensual)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {propiedad.roi}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            propiedad.tendencia === "alza"
                              ? "bg-green-100 text-green-800"
                              : propiedad.tendencia === "baja"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {propiedad.tendencia === "alza" && (
                            <ChevronUp className="h-3 w-3 mr-1" />
                          )}
                          {propiedad.tendencia === "alza"
                            ? "En alza"
                            : propiedad.tendencia === "baja"
                            ? "En baja"
                            : "Estable"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium" colSpan={2}>
                      Total
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatearMoneda(totalInversion)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatearMoneda(valorActualTotal)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatearMoneda(
                        propiedadesUsuario.reduce(
                          (sum, prop) => sum + prop.rentaMensual,
                          0
                        )
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {roiPromedio.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
