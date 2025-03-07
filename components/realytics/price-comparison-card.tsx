import { ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface PriceComparisonCardProps {
  comparativaPreciosZona: Array<{
    nombre: string;
    valor: number;
    color: string;
  }>;
  potencialRevalorizacion: number;
  tendenciaPrecio: string;
}

export function PriceComparisonCard({
  comparativaPreciosZona,
  potencialRevalorizacion,
}: PriceComparisonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparativa de precios</CardTitle>
        <CardDescription>Precio por m² en la zona</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparativaPreciosZona}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="nombre" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value} €/m²`, "Precio"]} />
              <Bar dataKey="valor">
                {comparativaPreciosZona.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Potencial de revalorización</span>
            <span className="font-medium text-green-600">
              +{potencialRevalorizacion}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Tendencia de precios en la zona</span>
            <span className="font-medium flex items-center text-green-600">
              <ChevronUp className="h-4 w-4 mr-1" />
              En alza
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
