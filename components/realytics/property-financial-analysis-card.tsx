import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface PropertyFinancialAnalysisCardProps {
  precio: number;
  metros: number;
  datosFinancieros: {
    precioM2: number;
    precioM2Zona: number;
    rentabilidadAlquiler: number;
    rentabilidadAlquilerZona: number;
    precioEstimadoAlquiler: number;
    roi: number;
    roiZona: number;
    tendenciaPrecio: string;
    potencialRevalorizacion: number;
  };
  historicoPrecio: Array<{
    fecha: string;
    precio: number;
  }>;
}

export function PropertyFinancialAnalysisCard({
  precio,
  metros,
  datosFinancieros,
  historicoPrecio,
}: PropertyFinancialAnalysisCardProps) {
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
        <CardTitle>Análisis financiero</CardTitle>
        <CardDescription>
          Comparativa con inmuebles similares en la zona
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Precio por m²</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Este inmueble",
                      valor: Math.round(precio / metros),
                    },
                    {
                      name: "Media zona",
                      valor: datosFinancieros.precioM2Zona,
                    },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} €/m²`, "Precio"]} />
                  <Bar dataKey="valor" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                Este inmueble:{" "}
                <strong>{formatearMoneda(precio / metros)}/m²</strong>
              </span>
              <span>
                Media zona:{" "}
                <strong>
                  {formatearMoneda(datosFinancieros.precioM2Zona)}/m²
                </strong>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Rentabilidad estimada</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Este inmueble", valor: datosFinancieros.roi },
                    { name: "Media zona", valor: datosFinancieros.roiZona },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
                  <Bar dataKey="valor" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                Alquiler estimado:{" "}
                <strong>
                  {formatearMoneda(datosFinancieros.precioEstimadoAlquiler)}/mes
                </strong>
              </span>
              <span>
                ROI anual: <strong>{datosFinancieros.roi}%</strong>
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-sm font-medium mb-4">Histórico de precios</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicoPrecio}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis domain={["dataMin - 10000", "dataMax + 10000"]} />
                <Tooltip
                  formatter={(value) => [
                    formatearMoneda(value as number),
                    "Precio",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="precio"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
