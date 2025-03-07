"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export interface SummaryData {
  precioCompra: number;
  costesReforma: number;
  gastosFiscales: number;
  inversionTotal: number;
  ingresoAnual: number;
  gastoAnual: number;
  beneficioNeto: number;
  roi: number;
  payback: number;
}

interface SummaryCardProps {
  data: SummaryData;
}

export function SummaryCard({ data }: SummaryCardProps) {
  // Formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(valor);
  };

  // Formatear porcentaje
  const formatearPorcentaje = (valor: number) => {
    return `${valor.toFixed(2)}%`;
  };

  // Datos para el gráfico de distribución de la inversión
  const datosDistribucionInversion = [
    { name: "Precio compra", value: data.precioCompra, color: "#3b82f6" },
    { name: "Reforma", value: data.costesReforma, color: "#10b981" },
    { name: "Gastos fiscales", value: data.gastosFiscales, color: "#f59e0b" },
  ];

  // Datos para el gráfico de rentabilidad comparativa
  const datosRentabilidadComparativa = [
    { name: "Este inmueble", value: data.roi, color: "#3b82f6" },
    { name: "Depósito bancario", value: 0.5, color: "#94a3b8" },
    { name: "Bonos del estado", value: 3.2, color: "#64748b" },
    { name: "Bolsa (histórico)", value: 7, color: "#475569" },
  ];

  // Evaluar la calidad de la inversión
  const evaluarInversion = () => {
    if (data.roi < 3) return { texto: "Baja", color: "text-red-500" };
    if (data.roi < 5) return { texto: "Media", color: "text-yellow-500" };
    if (data.roi < 7) return { texto: "Buena", color: "text-green-500" };
    return { texto: "Excelente", color: "text-emerald-500" };
  };

  const evaluacion = evaluarInversion();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados del análisis</CardTitle>
        <CardDescription>
          Resumen de la rentabilidad de la inversión
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Resumen de la inversión</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Precio de compra</span>
                <span className="font-medium">
                  {formatearMoneda(data.precioCompra)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Costes de reforma</span>
                <span className="font-medium">
                  {formatearMoneda(data.costesReforma)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gastos fiscales</span>
                <span className="font-medium">
                  {formatearMoneda(data.gastosFiscales)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Inversión total</span>
                <span className="text-lg font-bold">
                  {formatearMoneda(data.inversionTotal)}
                </span>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datosDistribucionInversion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {datosDistribucionInversion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) => [
                      formatearMoneda(value as number),
                      "Inversión",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Rentabilidad anual</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ingresos anuales</span>
                <span className="font-medium">
                  {formatearMoneda(data.ingresoAnual)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gastos anuales</span>
                <span className="font-medium">
                  {formatearMoneda(data.gastoAnual)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Beneficio neto anual</span>
                <span className="text-lg font-bold text-primary">
                  {formatearMoneda(data.beneficioNeto)}
                </span>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={datosRentabilidadComparativa}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, Math.max(data.roi, 10)]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <RechartsTooltip
                    formatter={(value) => [`${value}%`, "Rentabilidad"]}
                  />
                  <Bar dataKey="value">
                    {datosRentabilidadComparativa.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">ROI anual</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Return On Investment. Porcentaje de beneficio neto anual
                        respecto a la inversión total.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xl font-bold text-primary">
                {formatearPorcentaje(data.roi)}
              </span>
            </div>
            <Progress value={Math.min(data.roi * 10, 100)} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Payback</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Tiempo necesario para recuperar la inversión total con
                        los beneficios netos anuales.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xl font-bold">
                {data.payback.toFixed(1)} años
              </span>
            </div>
            <Progress
              value={Math.min((100 / data.payback) * 10, 100)}
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Calidad de la inversión</h3>
              <span className={`text-xl font-bold ${evaluacion.color}`}>
                {evaluacion.texto}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-500">Baja</span>
              <span className="text-yellow-500">Media</span>
              <span className="text-green-500">Buena</span>
              <span className="text-emerald-500">Excelente</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  data.roi < 3
                    ? "bg-red-500 w-1/4"
                    : data.roi < 5
                    ? "bg-yellow-500 w-2/4"
                    : data.roi < 7
                    ? "bg-green-500 w-3/4"
                    : "bg-emerald-500 w-full"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
