"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Bath,
  Bed,
  Building,
  ChartBar,
  Home,
  LogOut,
  MapPin,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Datos de ejemplo para inmuebles
const propiedades = [
  {
    id: 1,
    titulo: "Apartamento moderno en el centro",
    precio: 250000,
    ubicacion: "Madrid, Centro",
    habitaciones: 2,
    banos: 1,
    metros: 85,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/4d/88/4d/1279518724.jpg",
    tipo: "Apartamento",
    caracteristicas: ["Terraza", "Ascensor", "Garaje"],
  },
  {
    id: 2,
    titulo: "Chalet con jardín en zona residencial",
    precio: 450000,
    ubicacion: "Barcelona, Zona Alta",
    habitaciones: 4,
    banos: 3,
    metros: 220,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/1f/32/c8/1141141073.jpg",
    tipo: "Chalet",
    caracteristicas: ["Jardín", "Piscina", "Garaje"],
  },
  {
    id: 3,
    titulo: "Ático con vistas panorámicas",
    precio: 320000,
    ubicacion: "Valencia, Ensanche",
    habitaciones: 3,
    banos: 2,
    metros: 110,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/d3/03/6e/1297921231.jpg",
    tipo: "Ático",
    caracteristicas: ["Terraza", "Vistas", "Ascensor"],
  },
  {
    id: 4,
    titulo: "Piso reformado en barrio histórico",
    precio: 180000,
    ubicacion: "Sevilla, Casco Antiguo",
    habitaciones: 2,
    banos: 1,
    metros: 75,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/50/39/ef/1285131947.jpg",
    tipo: "Piso",
    caracteristicas: ["Reformado", "Aire acondicionado"],
  },
  {
    id: 5,
    titulo: "Dúplex con terraza en zona tranquila",
    precio: 290000,
    ubicacion: "Málaga, Este",
    habitaciones: 3,
    banos: 2,
    metros: 130,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/7c/2e/6e/1284944851.jpg",
    tipo: "Dúplex",
    caracteristicas: ["Terraza", "Trastero", "Garaje"],
  },
  {
    id: 6,
    titulo: "Casa adosada con jardín comunitario",
    precio: 320000,
    ubicacion: "Bilbao, Deusto",
    habitaciones: 3,
    banos: 2,
    metros: 140,
    imagen:
      "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/9b/72/6b/1303936784.jpg",
    tipo: "Adosado",
    caracteristicas: ["Jardín comunitario", "Garaje", "Trastero"],
  },
];

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [filtros, setFiltros] = useState({
    precioMin: 0,
    precioMax: 500000,
    habitaciones: "",
    tipo: "",
    ubicacion: "",
    caracteristicas: [] as string[],
  });

  const [propiedadesFiltradas, setPropiedadesFiltradas] = useState(propiedades);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const resultados = propiedades.filter((propiedad) => {
      // Filtro de precio
      if (
        propiedad.precio < filtros.precioMin ||
        propiedad.precio > filtros.precioMax
      ) {
        return false;
      }

      // Filtro de habitaciones
      if (
        filtros.habitaciones &&
        propiedad.habitaciones.toString() !== filtros.habitaciones
      ) {
        return false;
      }

      // Filtro de tipo
      if (filtros.tipo && propiedad.tipo !== filtros.tipo) {
        return false;
      }

      // Filtro de ubicación
      if (
        filtros.ubicacion &&
        !propiedad.ubicacion
          .toLowerCase()
          .includes(filtros.ubicacion.toLowerCase())
      ) {
        return false;
      }

      // Filtro de características
      if (filtros.caracteristicas.length > 0) {
        const tieneTodasLasCaracteristicas = filtros.caracteristicas.every(
          (c) => propiedad.caracteristicas.includes(c)
        );
        if (!tieneTodasLasCaracteristicas) {
          return false;
        }
      }

      return true;
    });

    setPropiedadesFiltradas(resultados);
  }, [filtros]);

  // Manejar cambios en los filtros
  const handleFiltroChange = (campo: string, valor: number | string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor === "any" ? "" : valor,
    }));
  };

  // Manejar cambios en características
  const handleCaracteristicaChange = (
    caracteristica: string,
    checked: boolean
  ) => {
    setFiltros((prev) => {
      if (checked) {
        return {
          ...prev,
          caracteristicas: [...prev.caracteristicas, caracteristica],
        };
      } else {
        return {
          ...prev,
          caracteristicas: prev.caracteristicas.filter(
            (c) => c !== caracteristica
          ),
        };
      }
    });
  };

  // Formatear precio para mostrar
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(precio);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Building className="h-6 w-6 text-primary" />
          <span>Realytics</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {email && <span className="text-sm text-gray-500">{email}</span>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ChartBar className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Panel de filtros */}
        <aside className="w-full md:w-80 p-4 border-r bg-gray-50">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Filtros</h2>
              <p className="text-sm text-gray-500 mb-4">
                Encuentra tu próxima inversión inmobiliaria
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="ubicacion">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="ubicacion"
                    placeholder="Ciudad, barrio..."
                    className="pl-8"
                    value={filtros.ubicacion}
                    onChange={(e) =>
                      handleFiltroChange("ubicacion", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Precio</Label>
                <div className="pt-6 pb-2">
                  <Slider
                    defaultValue={[0, 500000]}
                    max={1000000}
                    step={10000}
                    onValueChange={(value) => {
                      handleFiltroChange("precioMin", Number(value[0]));
                      handleFiltroChange("precioMax", Number(value[1]));
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatearPrecio(filtros.precioMin)}</span>
                  <span>{formatearPrecio(filtros.precioMax)}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de propiedad</Label>
                <Select
                  value={filtros.tipo}
                  onValueChange={(value) => handleFiltroChange("tipo", value)}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Cualquier tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquier tipo</SelectItem>
                    <SelectItem value="Piso">Piso</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Chalet">Chalet</SelectItem>
                    <SelectItem value="Ático">Ático</SelectItem>
                    <SelectItem value="Dúplex">Dúplex</SelectItem>
                    <SelectItem value="Adosado">Adosado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="habitaciones">Habitaciones</Label>
                <Select
                  value={filtros.habitaciones}
                  onValueChange={(value) =>
                    handleFiltroChange("habitaciones", value)
                  }
                >
                  <SelectTrigger id="habitaciones">
                    <SelectValue placeholder="Cualquier número" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquier número</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Características</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terraza"
                      checked={filtros.caracteristicas.includes("Terraza")}
                      onCheckedChange={(checked) =>
                        handleCaracteristicaChange(
                          "Terraza",
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor="terraza" className="text-sm">
                      Terraza
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="garaje"
                      checked={filtros.caracteristicas.includes("Garaje")}
                      onCheckedChange={(checked) =>
                        handleCaracteristicaChange("Garaje", checked as boolean)
                      }
                    />
                    <label htmlFor="garaje" className="text-sm">
                      Garaje
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="piscina"
                      checked={filtros.caracteristicas.includes("Piscina")}
                      onCheckedChange={(checked) =>
                        handleCaracteristicaChange(
                          "Piscina",
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor="piscina" className="text-sm">
                      Piscina
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ascensor"
                      checked={filtros.caracteristicas.includes("Ascensor")}
                      onCheckedChange={(checked) =>
                        handleCaracteristicaChange(
                          "Ascensor",
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor="ascensor" className="text-sm">
                      Ascensor
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Listado de propiedades */}
        <main className="flex-1 p-4 bg-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Propiedades disponibles</h2>
            <p className="text-gray-500">
              {propiedadesFiltradas.length}{" "}
              {propiedadesFiltradas.length === 1
                ? "propiedad encontrada"
                : "propiedades encontradas"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propiedadesFiltradas.map((propiedad) => (
              <Card key={propiedad.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={propiedad.imagen || "/placeholder.svg"}
                    alt={propiedad.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="default">{propiedad.tipo}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {propiedad.titulo}
                  </h3>
                  <p className="text-gray-500 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {propiedad.ubicacion}
                  </p>
                  <p className="text-xl font-bold text-primary mb-4">
                    {formatearPrecio(propiedad.precio)}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {propiedad.habitaciones} hab.
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {propiedad.banos} baños
                    </span>
                    <span className="flex items-center">
                      <Maximize className="h-4 w-4 mr-1" />
                      {propiedad.metros} m²
                    </span>
                  </div>
                  <Button className="w-full mt-4">Ver detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {propiedadesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No se encontraron propiedades
              </h3>
              <p className="text-gray-500 mb-4">
                Prueba a ajustar los filtros para ver más resultados
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFiltros({
                    precioMin: 0,
                    precioMax: 500000,
                    habitaciones: "",
                    tipo: "",
                    ubicacion: "",
                    caracteristicas: [],
                  })
                }
              >
                Restablecer filtros
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
