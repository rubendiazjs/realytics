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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export interface RentalFormData {
  precioAlquilerEstimado: number;
  usarEstimacionAutomatica: boolean;
  ocupacionAnual: number;
  gastosAnuales: number;
  incluyeGastosComunes: boolean;
  gastosComunes: number;
}

interface RentalFormProps {
  data: RentalFormData;
  onChange: (data: RentalFormData) => void;
  precioInmueble: number;
  metros: number;
  ubicacion: string;
  habitaciones: number;
}

export function RentalForm({
  data,
  onChange,
  metros,
  ubicacion,
  habitaciones,
}: RentalFormProps) {
  // Estimación automática del precio de alquiler basada en ubicación y características
  const estimarPrecioAlquiler = () => {
    // Precios base por m² según ubicación (datos ficticios)
    const preciosPorUbicacion: Record<string, number> = {
      Madrid: 16,
      Barcelona: 17,
      Valencia: 10,
      Sevilla: 9,
      Málaga: 11,
      Bilbao: 12,
      Otra: 8,
    };

    // Precio base por m²
    const precioBaseM2 = preciosPorUbicacion[ubicacion] || 8;

    // Ajuste por número de habitaciones
    const factorHabitaciones = 1 + (habitaciones - 1) * 0.1;

    // Cálculo del precio mensual estimado
    return Math.round(metros * precioBaseM2 * factorHabitaciones);
  };

  const handleChange = (
    field: keyof RentalFormData,
    value: string | number | boolean
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Actualizar precio estimado cuando cambia la estimación automática
  const toggleEstimacionAutomatica = (checked: boolean) => {
    handleChange("usarEstimacionAutomatica", checked);
    if (checked) {
      handleChange("precioAlquilerEstimado", estimarPrecioAlquiler());
    }
  };

  // Calcular ingresos anuales
  const calcularIngresosAnuales = () => {
    return data.precioAlquilerEstimado * 12 * (data.ocupacionAnual / 100);
  };

  // Calcular gastos anuales totales
  const calcularGastosAnuales = () => {
    let gastos = data.gastosAnuales;
    if (data.incluyeGastosComunes) {
      gastos += data.gastosComunes * 12;
    }
    return gastos;
  };

  // Calcular beneficio neto anual
  const calcularBeneficioNeto = () => {
    return calcularIngresosAnuales() - calcularGastosAnuales();
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
        <CardTitle>Estimación de alquiler</CardTitle>
        <CardDescription>
          Calcula los ingresos potenciales por alquiler
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="usarEstimacionAutomatica" className="font-medium">
                Usar estimación automática
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Calcula automáticamente el precio de alquiler basado en la
                      ubicación, tamaño y características del inmueble.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="usarEstimacionAutomatica"
              checked={data.usarEstimacionAutomatica}
              onCheckedChange={toggleEstimacionAutomatica}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="precioAlquilerEstimado" className="font-medium">
              Precio de alquiler mensual
            </Label>
            <Input
              id="precioAlquilerEstimado"
              type="number"
              value={data.precioAlquilerEstimado}
              onChange={(e) =>
                handleChange("precioAlquilerEstimado", Number(e.target.value))
              }
              className="w-32"
              disabled={data.usarEstimacionAutomatica}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="ocupacionAnual" className="font-medium">
                Ocupación anual estimada
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Porcentaje del año en que el inmueble estará alquilado.
                      Para alquiler de larga duración, suele ser entre 90-100%.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="ocupacionAnual"
                type="number"
                value={data.ocupacionAnual}
                onChange={(e) =>
                  handleChange("ocupacionAnual", Number(e.target.value))
                }
                className="w-20"
                min={0}
                max={100}
              />
              <span>%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="gastosAnuales" className="font-medium">
              Gastos anuales (impuestos, mantenimiento)
            </Label>
            <Input
              id="gastosAnuales"
              type="number"
              value={data.gastosAnuales}
              onChange={(e) =>
                handleChange("gastosAnuales", Number(e.target.value))
              }
              className="w-32"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="incluyeGastosComunes" className="font-medium">
                Incluir gastos de comunidad
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Gastos mensuales de comunidad de propietarios que deberás
                      pagar aunque el inmueble esté alquilado.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="incluyeGastosComunes"
              checked={data.incluyeGastosComunes}
              onCheckedChange={(checked) =>
                handleChange("incluyeGastosComunes", checked)
              }
            />
          </div>

          {data.incluyeGastosComunes && (
            <div className="flex items-center justify-between">
              <Label htmlFor="gastosComunes" className="font-medium">
                Gastos de comunidad mensuales
              </Label>
              <Input
                id="gastosComunes"
                type="number"
                value={data.gastosComunes}
                onChange={(e) =>
                  handleChange("gastosComunes", Number(e.target.value))
                }
                className="w-32"
              />
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Ingresos anuales estimados</span>
            <span className="font-medium">
              {formatearMoneda(calcularIngresosAnuales())}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Gastos anuales totales</span>
            <span className="font-medium">
              {formatearMoneda(calcularGastosAnuales())}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Beneficio neto anual</span>
            <span className="text-lg font-bold text-primary">
              {formatearMoneda(calcularBeneficioNeto())}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
