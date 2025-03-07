"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CostesReforma {
  [key: string]: {
    precioM2: number;
    descripcion: string;
  };
}

export interface ElementoReforma {
  categoria: string;
  opciones: Array<{
    nombre: string;
    precio: number;
  }>;
}

export interface ReformCalculatorCardProps {
  metros: number;
  costesReforma: CostesReforma;
  elementosReforma: ElementoReforma[];
}

export function ReformCalculatorCard({
  metros,
  costesReforma,
  elementosReforma,
}: ReformCalculatorCardProps) {
  const [tipoReforma, setTipoReforma] = useState("automatico");
  const [nivelReforma, setNivelReforma] = useState("estandar");
  const [elementosSeleccionados, setElementosSeleccionados] = useState<
    Record<string, string>
  >({});
  const [metrosReforma, setMetrosReforma] = useState(metros);

  // Formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(valor);
  };

  // Calcular coste de reforma automática
  const calcularCosteReformaAutomatica = () => {
    return (
      metrosReforma *
      costesReforma[nivelReforma as keyof typeof costesReforma].precioM2
    );
  };

  // Calcular coste de reforma detallada
  const calcularCosteReformaDetallada = () => {
    let costeTotal = 0;

    // Sumar costes fijos (por unidad)
    Object.entries(elementosSeleccionados).forEach(
      ([categoria, opcionNombre]) => {
        const categoriaObj = elementosReforma.find(
          (cat) => cat.categoria === categoria
        );
        if (categoriaObj) {
          const opcion = categoriaObj.opciones.find(
            (op) => op.nombre === opcionNombre
          );
          if (opcion) {
            // Si es suelo o pared, multiplicar por metros cuadrados
            if (categoria === "Suelos" || categoria === "Paredes") {
              costeTotal += opcion.precio * metrosReforma;
            } else if (categoria === "Puertas") {
              // Estimamos 5 puertas para un piso de 90m2
              const numeroPuertas = Math.ceil(metrosReforma / 18);
              costeTotal += opcion.precio * numeroPuertas;
            } else {
              costeTotal += opcion.precio;
            }
          }
        }
      }
    );

    return costeTotal;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de reforma</CardTitle>
        <CardDescription>
          Estima el coste de reformar este inmueble
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tipoReforma} onValueChange={setTipoReforma}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automatico">Cálculo automático</TabsTrigger>
            <TabsTrigger value="detallado">Cálculo detallado</TabsTrigger>
          </TabsList>

          <TabsContent value="automatico" className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Metros cuadrados a reformar
              </label>
              <input
                type="number"
                value={metrosReforma}
                onChange={(e) => setMetrosReforma(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min={1}
                max={1000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nivel de reforma
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(costesReforma).map(([key, value]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      nivelReforma === key
                        ? "border-primary bg-primary/5"
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => setNivelReforma(key)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium capitalize">{key}</h4>
                      <span className="text-primary font-bold">
                        {formatearMoneda(value.precioM2)}/m²
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{value.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Coste estimado de reforma</h3>
                <span className="text-xl font-bold text-primary">
                  {formatearMoneda(calcularCosteReformaAutomatica())}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Este cálculo es orientativo y puede variar según las condiciones
                específicas del inmueble y los materiales elegidos.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="detallado" className="space-y-6 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Metros cuadrados a reformar
              </label>
              <input
                type="number"
                value={metrosReforma}
                onChange={(e) => setMetrosReforma(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min={1}
                max={1000}
              />
            </div>

            {elementosReforma.map((categoria) => (
              <div key={categoria.categoria}>
                <h3 className="font-medium mb-2">{categoria.categoria}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {categoria.opciones.map((opcion) => (
                    <div
                      key={opcion.nombre}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        elementosSeleccionados[categoria.categoria] ===
                        opcion.nombre
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() =>
                        setElementosSeleccionados({
                          ...elementosSeleccionados,
                          [categoria.categoria]: opcion.nombre,
                        })
                      }
                    >
                      <div className="flex justify-between items-center">
                        <span>{opcion.nombre}</span>
                        <span className="font-medium">
                          {formatearMoneda(opcion.precio)}
                          {categoria.categoria === "Suelos" ||
                          categoria.categoria === "Paredes"
                            ? "/m²"
                            : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Coste estimado de reforma</h3>
                <span className="text-xl font-bold text-primary">
                  {formatearMoneda(calcularCosteReformaDetallada())}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Este cálculo es orientativo y puede variar según las condiciones
                específicas del inmueble y los materiales elegidos.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
