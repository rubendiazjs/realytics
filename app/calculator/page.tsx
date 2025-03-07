"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/realytics/app-header";
import { useSearchParams } from "next/navigation";
import { PropertyForm, PropertyFormData } from "./components/property-form";
import { ReformForm, ReformFormData } from "./components/reform-form";
import { TaxForm, TaxFormData } from "./components/tax-form";
import { RentalForm, RentalFormData } from "./components/rental-form";
import { SummaryCard, SummaryData } from "./components/summary-card";

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Estado para los formularios
  const [propertyData, setPropertyData] = useState<PropertyFormData>({
    precio: 250000,
    metros: 90,
    habitaciones: 2,
    banos: 1,
    ubicacion: "Madrid",
    tipo: "Piso",
  });

  const [reformData, setReformData] = useState<ReformFormData>({
    necesitaReforma: false,
    nivelReforma: "estandar",
    porcentajeReforma: 100,
    presupuestoPersonalizado: null,
  });

  const [taxData, setTaxData] = useState<TaxFormData>({
    ivaAplicable: false,
    tipoImpuesto: "itp",
    porcentajeImpuesto: 6,
    incluyeGastosAdicionales: true,
    porcentajeGastosAdicionales: 1.5,
  });

  const [rentalData, setRentalData] = useState<RentalFormData>({
    precioAlquilerEstimado: 1000,
    usarEstimacionAutomatica: true,
    ocupacionAnual: 95,
    gastosAnuales: 1200,
    incluyeGastosComunes: true,
    gastosComunes: 80,
  });

  // Estado para los resultados
  const [resultsData, setResultsData] = useState<SummaryData>({
    precioCompra: 0,
    costesReforma: 0,
    gastosFiscales: 0,
    inversionTotal: 0,
    ingresoAnual: 0,
    gastoAnual: 0,
    beneficioNeto: 0,
    roi: 0,
    payback: 0,
  });

  // Calcular costes de reforma
  const calcularCostesReforma = useCallback(() => {
    if (!reformData.necesitaReforma) return 0;

    if (reformData.presupuestoPersonalizado !== null) {
      return reformData.presupuestoPersonalizado;
    }

    // Costes estimados de reforma por tipo
    const costesReforma = {
      basico: {
        precioM2: 450,
      },
      estandar: {
        precioM2: 650,
      },
      premium: {
        precioM2: 950,
      },
    };

    const metrosReforma =
      propertyData.metros * (reformData.porcentajeReforma / 100);
    return metrosReforma * costesReforma[reformData.nivelReforma].precioM2;
  }, [propertyData, reformData]);

  // Calcular gastos fiscales
  const calcularGastosFiscales = useCallback(() => {
    const impuestos = propertyData.precio * (taxData.porcentajeImpuesto / 100);
    const gastosAdicionales = taxData.incluyeGastosAdicionales
      ? propertyData.precio * (taxData.porcentajeGastosAdicionales / 100)
      : 0;
    return impuestos + gastosAdicionales;
  }, [propertyData, taxData]);

  // Calcular ingresos anuales
  const calcularIngresosAnuales = useCallback(() => {
    return (
      rentalData.precioAlquilerEstimado * 12 * (rentalData.ocupacionAnual / 100)
    );
  }, [rentalData]);

  // Calcular gastos anuales
  const calcularGastosAnuales = useCallback(() => {
    let gastos = rentalData.gastosAnuales;
    if (rentalData.incluyeGastosComunes) {
      gastos += rentalData.gastosComunes * 12;
    }
    return gastos;
  }, [rentalData]);

  // Calcular resultados
  const calcularResultados = useCallback(() => {
    const precioCompra = propertyData.precio;
    const costesReforma = calcularCostesReforma();
    const gastosFiscales = calcularGastosFiscales();
    const inversionTotal = precioCompra + costesReforma + gastosFiscales;

    const ingresoAnual = calcularIngresosAnuales();
    const gastoAnual = calcularGastosAnuales();
    const beneficioNeto = ingresoAnual - gastoAnual;

    const roi = (beneficioNeto / inversionTotal) * 100;
    const payback = inversionTotal / beneficioNeto;

    setResultsData({
      precioCompra,
      costesReforma,
      gastosFiscales,
      inversionTotal,
      ingresoAnual,
      gastoAnual,
      beneficioNeto,
      roi,
      payback,
    });
  }, [
    propertyData,
    calcularCostesReforma,
    calcularGastosFiscales,
    calcularIngresosAnuales,
    calcularGastosAnuales,
  ]);

  // Actualizar resultados cuando cambian los datos
  useEffect(() => {
    calcularResultados();
  }, [propertyData, reformData, taxData, rentalData, calcularResultados]);

  // Actualizar precio de alquiler estimado cuando cambian los datos del inmueble
  useEffect(() => {
    if (rentalData.usarEstimacionAutomatica) {
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
      const precioBaseM2 = preciosPorUbicacion[propertyData.ubicacion] || 8;

      // Ajuste por número de habitaciones
      const factorHabitaciones = 1 + (propertyData.habitaciones - 1) * 0.1;

      // Cálculo del precio mensual estimado
      const precioEstimado = Math.round(
        propertyData.metros * precioBaseM2 * factorHabitaciones
      );

      setRentalData((prev) => ({
        ...prev,
        precioAlquilerEstimado: precioEstimado,
      }));
    }
  }, [
    propertyData.metros,
    propertyData.ubicacion,
    propertyData.habitaciones,
    rentalData.usarEstimacionAutomatica,
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader email={email} />

      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Calculadora de Rentabilidad Inmobiliaria
          </h1>
          <p className="text-gray-500">
            Calcula la rentabilidad de tu inversión inmobiliaria teniendo en
            cuenta todos los factores
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <PropertyForm data={propertyData} onChange={setPropertyData} />

          <ReformForm
            data={reformData}
            onChange={setReformData}
            metros={propertyData.metros}
          />

          <TaxForm
            data={taxData}
            onChange={setTaxData}
            precioInmueble={propertyData.precio}
          />

          <RentalForm
            data={rentalData}
            onChange={setRentalData}
            precioInmueble={propertyData.precio}
            metros={propertyData.metros}
            ubicacion={propertyData.ubicacion}
            habitaciones={propertyData.habitaciones}
          />

          <SummaryCard data={resultsData} />
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={calcularResultados}>
            Recalcular
          </Button>
        </div>
      </main>
    </div>
  );
}
