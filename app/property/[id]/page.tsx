"use client";

import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/realytics/app-header";
import { PropertyGalleryCarousel } from "@/components/realytics/property-gallery-carousel";
import { PropertyMainInfoCard } from "@/components/realytics/property-info-card";
import { PropertyFinancialAnalysisCard } from "@/components/realytics/property-financial-analysis-card";
import { ReformCalculatorCard } from "@/components/realytics/reform-calculator-card";
import { PropertyStatsCard } from "@/components/realytics/property-stats-card";
import { PriceComparisonCard } from "@/components/realytics/price-comparison-card";
import { ReformTime } from "@/components/realytics/reform-time-card";
import Link from "next/link";

// Datos de ejemplo para el inmueble
const inmueble = {
  id: 1,
  titulo: "Ático con terraza panorámica",
  descripcion:
    "Espectacular ático con vistas panorámicas a la ciudad. Cuenta con una amplia terraza, perfecta para disfrutar del buen tiempo. El inmueble ha sido completamente reformado con materiales de alta calidad. Dispone de 2 habitaciones, 2 baños, cocina equipada y un amplio salón con acceso directo a la terraza. El edificio cuenta con ascensor, portero físico y está ubicado en una de las mejores zonas de la ciudad, con todos los servicios a su alcance.",
  precio: 285000,
  precioAnterior: 295000,
  ubicacion: "Madrid, Chamberí",
  direccion: "Calle de Fuencarral, 123, 28010 Madrid",
  habitaciones: 2,
  banos: 2,
  metros: 90,
  metrosTerraza: 20,
  planta: 7,
  orientacion: "Sur",
  ano: 1995,
  reformado: 2020,
  estado: "Excelente",
  certificacionEnergetica: "B",
  tipo: "Ático",
  caracteristicas: [
    "Terraza",
    "Ascensor",
    "Aire acondicionado",
    "Calefacción",
    "Armarios empotrados",
    "Cocina equipada",
    "Portero físico",
  ],
  imagenes: [
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/4d/88/4d/1279518724.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/1f/32/c8/1141141073.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/d3/03/6e/1297921231.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/50/39/ef/1285131947.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/7c/2e/6e/1284944851.jpg",
  ],
  publicado: "2023-12-15",
  visitas: 342,
  guardados: 28,
  coincidencia: 95,
};

// Datos financieros
const datosFinancieros = {
  precioM2: inmueble.precio / inmueble.metros,
  precioM2Zona: 3100,
  rentabilidadAlquiler: 5.2,
  rentabilidadAlquilerZona: 4.8,
  precioEstimadoAlquiler: 1250,
  roi: 5.2,
  roiZona: 4.8,
  tendenciaPrecio: "alza",
  potencialRevalorizacion: 12,
};

// Histórico de precios
const historicoPrecio = [
  { fecha: "Ene 2023", precio: 310000 },
  { fecha: "Feb 2023", precio: 305000 },
  { fecha: "Mar 2023", precio: 300000 },
  { fecha: "Abr 2023", precio: 300000 },
  { fecha: "May 2023", precio: 295000 },
  { fecha: "Jun 2023", precio: 295000 },
  { fecha: "Jul 2023", precio: 290000 },
  { fecha: "Ago 2023", precio: 290000 },
  { fecha: "Sep 2023", precio: 290000 },
  { fecha: "Oct 2023", precio: 285000 },
  { fecha: "Nov 2023", precio: 285000 },
  { fecha: "Dic 2023", precio: 285000 },
];

// Comparativa de precios en la zona
const comparativaPreciosZona = [
  {
    nombre: "Este inmueble",
    valor: inmueble.precio / inmueble.metros,
    color: "#3b82f6",
  },
  {
    nombre: "Media zona",
    valor: datosFinancieros.precioM2Zona,
    color: "#10b981",
  },
  { nombre: "Máximo zona", valor: 3500, color: "#f59e0b" },
  { nombre: "Mínimo zona", valor: 2800, color: "#ef4444" },
];

// Costes estimados de reforma por tipo
const costesReforma = {
  basico: {
    precioM2: 450,
    descripcion:
      "Reforma básica: pintura, suelos laminados, baño y cocina sencillos",
  },
  estandar: {
    precioM2: 650,
    descripcion:
      "Reforma estándar: calidades medias, cambio instalaciones, acabados modernos",
  },
  premium: {
    precioM2: 950,
    descripcion:
      "Reforma premium: materiales de alta calidad, diseño personalizado, domótica",
  },
};

// Elementos de reforma detallada
const elementosReforma = [
  {
    categoria: "Suelos",
    opciones: [
      { nombre: "Laminado básico", precio: 25 },
      { nombre: "Laminado calidad media", precio: 35 },
      { nombre: "Laminado premium", precio: 45 },
      { nombre: "Porcelánico básico", precio: 40 },
      { nombre: "Porcelánico calidad media", precio: 55 },
      { nombre: "Porcelánico premium", precio: 75 },
      { nombre: "Tarima maciza", precio: 90 },
    ],
  },
  {
    categoria: "Paredes",
    opciones: [
      { nombre: "Pintura básica", precio: 12 },
      { nombre: "Pintura calidad media", precio: 18 },
      { nombre: "Pintura premium", precio: 25 },
      { nombre: "Papel pintado básico", precio: 22 },
      { nombre: "Papel pintado calidad media", precio: 35 },
      { nombre: "Papel pintado premium", precio: 50 },
    ],
  },
  {
    categoria: "Cocina",
    opciones: [
      { nombre: "Muebles básicos", precio: 2000 },
      { nombre: "Muebles calidad media", precio: 3500 },
      { nombre: "Muebles premium", precio: 6000 },
      { nombre: "Electrodomésticos básicos", precio: 1500 },
      { nombre: "Electrodomésticos calidad media", precio: 2500 },
      { nombre: "Electrodomésticos premium", precio: 4000 },
    ],
  },
  {
    categoria: "Baños",
    opciones: [
      { nombre: "Sanitarios básicos", precio: 1000 },
      { nombre: "Sanitarios calidad media", precio: 1800 },
      { nombre: "Sanitarios premium", precio: 3000 },
      { nombre: "Azulejos básicos", precio: 25 },
      { nombre: "Azulejos calidad media", precio: 40 },
      { nombre: "Azulejos premium", precio: 60 },
    ],
  },
  {
    categoria: "Instalaciones",
    opciones: [
      { nombre: "Electricidad básica", precio: 2500 },
      { nombre: "Electricidad completa", precio: 4000 },
      { nombre: "Fontanería básica", precio: 2000 },
      { nombre: "Fontanería completa", precio: 3500 },
      { nombre: "Calefacción básica", precio: 3000 },
      { nombre: "Calefacción premium", precio: 5000 },
      { nombre: "Aire acondicionado básico", precio: 2000 },
      { nombre: "Aire acondicionado premium", precio: 3500 },
    ],
  },
  {
    categoria: "Carpintería",
    opciones: [
      { nombre: "Puertas básicas", precio: 200 },
      { nombre: "Puertas calidad media", precio: 350 },
      { nombre: "Puertas premium", precio: 600 },
      { nombre: "Armarios básicos", precio: 1200 },
      { nombre: "Armarios calidad media", precio: 2000 },
      { nombre: "Armarios premium", precio: 3500 },
    ],
  },
];

export default function DetalleInmueble() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader email={email} />

      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="mb-4">
          <Link href={`/search`}>
            <Button variant="ghost" size="sm" className="mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver al buscador
            </Button>
          </Link>
          <div className="grid grid-cols-12 gap-4 relative">
            <div className="col-span-8">
              <h1 className="text-2xl font-bold">{inmueble.titulo}</h1>
              <p className="text-gray-500">{inmueble.direccion}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* Galería de imágenes */}
          <div className="col-span-3">
            <PropertyGalleryCarousel
              imagenes={inmueble.imagenes}
              titulo={inmueble.titulo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-8 space-y-6">
            {/* Datos principales */}
            <PropertyMainInfoCard
              titulo={inmueble.titulo}
              precio={inmueble.precio}
              precioAnterior={inmueble.precioAnterior}
              habitaciones={inmueble.habitaciones}
              banos={inmueble.banos}
              metros={inmueble.metros}
              metrosTerraza={inmueble.metrosTerraza}
              descripcion={inmueble.descripcion}
              caracteristicas={inmueble.caracteristicas}
              planta={inmueble.planta}
              orientacion={inmueble.orientacion}
              ano={inmueble.ano}
              reformado={inmueble.reformado}
            />

            {/* Calculadora de reforma */}
            <ReformCalculatorCard
              metros={inmueble.metros}
              costesReforma={costesReforma}
              elementosReforma={elementosReforma}
            />

            {/* Datos financieros */}
            <PropertyFinancialAnalysisCard
              precio={inmueble.precio}
              metros={inmueble.metros}
              datosFinancieros={datosFinancieros}
              historicoPrecio={historicoPrecio}
            />
          </div>

          {/* Columna derecha - Información adicional */}
          <div className="space-y-6 col-span-4">
            {/* Estadísticas del inmueble */}
            <PropertyStatsCard
              publicado={inmueble.publicado}
              visitas={inmueble.visitas}
              guardados={inmueble.guardados}
              coincidencia={inmueble.coincidencia}
            />
            {/* Comparativa de precios */}
            <PriceComparisonCard
              comparativaPreciosZona={comparativaPreciosZona}
              potencialRevalorizacion={datosFinancieros.potencialRevalorizacion}
              tendenciaPrecio={datosFinancieros.tendenciaPrecio}
            />

            {/* Tiempo estimado de reforma */}
            <ReformTime />
          </div>
        </div>
      </main>
    </div>
  );
}
