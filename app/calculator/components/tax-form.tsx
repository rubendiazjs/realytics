"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export interface TaxFormData {
  ivaAplicable: boolean;
  tipoImpuesto: "iva" | "itp";
  porcentajeImpuesto: number;
  incluyeGastosAdicionales: boolean;
  porcentajeGastosAdicionales: number;
}

interface TaxFormProps {
  data: TaxFormData;
  onChange: (data: TaxFormData) => void;
  precioInmueble: number;
}

export function TaxForm({ data, onChange, precioInmueble }: TaxFormProps) {
  const handleChange = (field: keyof TaxFormData, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Calcular impuestos
  const calcularImpuestos = () => {
    return precioInmueble * (data.porcentajeImpuesto / 100);
  };

  // Calcular gastos adicionales
  const calcularGastosAdicionales = () => {
    if (!data.incluyeGastosAdicionales) return 0;
    return precioInmueble * (data.porcentajeGastosAdicionales / 100);
  };

  // Calcular total de gastos fiscales
  const calcularTotalGastosFiscales = () => {
    return calcularImpuestos() + calcularGastosAdicionales();
  };

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
        <CardTitle>Gastos fiscales</CardTitle>
        <CardDescription>
          Calcula los impuestos y gastos asociados a la compra
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="tipoImpuesto" className="font-medium">
                Tipo de impuesto
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      IVA (10%) para viviendas nuevas o de primera transmisión.
                      ITP (varía según comunidad autónoma) para viviendas de
                      segunda mano.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={data.tipoImpuesto}
              onValueChange={(value: "iva" | "itp") => {
                const newPorcentaje = value === "iva" ? 10 : 6;
                handleChange("tipoImpuesto", value);
                handleChange("porcentajeImpuesto", newPorcentaje);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iva">IVA (Vivienda nueva)</SelectItem>
                <SelectItem value="itp">ITP (Vivienda usada)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="porcentajeImpuesto" className="font-medium">
                Porcentaje de {data.tipoImpuesto.toUpperCase()}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      El IVA es generalmente del 10% para viviendas. El ITP
                      varía entre 6-10% según la comunidad autónoma.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="porcentajeImpuesto"
                type="number"
                value={data.porcentajeImpuesto}
                onChange={(e) =>
                  handleChange("porcentajeImpuesto", Number(e.target.value))
                }
                className="w-20"
                min={0}
                max={21}
              />
              <span>%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="incluyeGastosAdicionales" className="font-medium">
                Incluir gastos adicionales
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Incluye gastos de notaría, registro, gestoría y otros
                      gastos asociados a la compra.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="incluyeGastosAdicionales"
              checked={data.incluyeGastosAdicionales}
              onCheckedChange={(checked) =>
                handleChange("incluyeGastosAdicionales", checked)
              }
            />
          </div>

          {data.incluyeGastosAdicionales && (
            <div className="flex items-center justify-between">
              <Label
                htmlFor="porcentajeGastosAdicionales"
                className="font-medium"
              >
                Porcentaje de gastos adicionales
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="porcentajeGastosAdicionales"
                  type="number"
                  value={data.porcentajeGastosAdicionales}
                  onChange={(e) =>
                    handleChange(
                      "porcentajeGastosAdicionales",
                      Number(e.target.value)
                    )
                  }
                  className="w-20"
                  min={0}
                  max={10}
                  step={0.1}
                />
                <span>%</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              Impuestos ({data.tipoImpuesto.toUpperCase()})
            </span>
            <span className="font-medium">
              {formatearMoneda(calcularImpuestos())}
            </span>
          </div>
          {data.incluyeGastosAdicionales && (
            <div className="flex justify-between items-center">
              <span className="text-sm">Gastos adicionales</span>
              <span className="font-medium">
                {formatearMoneda(calcularGastosAdicionales())}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total gastos fiscales</span>
            <span className="text-lg font-bold text-primary">
              {formatearMoneda(calcularTotalGastosFiscales())}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
