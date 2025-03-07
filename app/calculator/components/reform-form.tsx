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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ReformFormData {
  necesitaReforma: boolean;
  nivelReforma: "basico" | "estandar" | "premium";
  porcentajeReforma: number;
  presupuestoPersonalizado: number | null;
  tipoCalculo: "automatico" | "detallado";
  elementosSeleccionados: Record<string, string>;
}

interface ReformFormProps {
  data: ReformFormData;
  onChange: (data: ReformFormData) => void;
  metros: number;
}

export function ReformForm({
  data = {
    necesitaReforma: false,
    nivelReforma: "estandar",
    porcentajeReforma: 10,
    presupuestoPersonalizado: null,
    tipoCalculo: "automatico",
    elementosSeleccionados: {},
  },
  onChange,
  metros,
}: ReformFormProps) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof ReformFormData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Manejar cambios en elementos seleccionados
  const handleElementoChange = (categoria: string, opcionNombre: string) => {
    handleChange("elementosSeleccionados", {
      ...data.elementosSeleccionados,
      [categoria]: opcionNombre,
    });
  };

  // Calcular coste de reforma automática
  const calcularCosteReformaAutomatica = () => {
    if (!data.necesitaReforma) return 0;

    if (data.presupuestoPersonalizado !== null) {
      return data.presupuestoPersonalizado;
    }

    const metrosReforma = metros * (data.porcentajeReforma / 100);
    return metrosReforma * costesReforma[data.nivelReforma].precioM2;
  };

  // Calcular coste de reforma detallada
  const calcularCosteReformaDetallada = () => {
    if (!data.necesitaReforma) return 0;

    let costeTotal = 0;
    const metrosReforma = metros * (data.porcentajeReforma / 100);

    // Sumar costes fijos (por unidad)
    if (!data.elementosSeleccionados) return 0;
    Object.entries(data.elementosSeleccionados).forEach(
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

  // Calcular coste total de reforma según el tipo de cálculo
  const calcularCosteReforma = () => {
    if (data.tipoCalculo === "automatico") {
      return calcularCosteReformaAutomatica();
    } else {
      return calcularCosteReformaDetallada();
    }
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
        <CardTitle>Reforma</CardTitle>
        <CardDescription>
          Estima el coste de reforma del inmueble
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="necesitaReforma" className="font-medium">
            ¿Necesita reforma?
          </Label>
          <Switch
            id="necesitaReforma"
            checked={data.necesitaReforma}
            onCheckedChange={(checked) =>
              handleChange("necesitaReforma", checked)
            }
          />
        </div>

        {data.necesitaReforma && (
          <>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="porcentajeReforma" className="font-medium">
                  Porcentaje del inmueble a reformar
                </Label>
                <span className="font-medium">{data.porcentajeReforma}%</span>
              </div>
              <Slider
                id="porcentajeReforma"
                min={10}
                max={100}
                step={5}
                value={[data.porcentajeReforma]}
                onValueChange={(value) =>
                  handleChange("porcentajeReforma", value[0])
                }
              />
              <p className="text-sm text-gray-500">
                {data.porcentajeReforma === 100
                  ? "Reforma integral del inmueble"
                  : `Reforma parcial: ${Math.round(
                      metros * (data.porcentajeReforma / 100)
                    )} m² de ${metros} m²`}
              </p>
            </div>

            <Tabs
              value={data.tipoCalculo}
              defaultValue="automatico"
              onValueChange={(value) => handleChange("tipoCalculo", value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="automatico">Cálculo automático</TabsTrigger>
                <TabsTrigger value="detallado">Cálculo detallado</TabsTrigger>
              </TabsList>

              <TabsContent value="automatico" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <Label className="font-medium">Nivel de reforma</Label>
                  <RadioGroup
                    value={data.nivelReforma}
                    onValueChange={(value) =>
                      handleChange("nivelReforma", value)
                    }
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {Object.entries(costesReforma).map(([key, value]) => (
                      <div
                        key={key}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          data.nivelReforma === key
                            ? "border-primary bg-primary/5"
                            : "hover:border-gray-400"
                        }`}
                      >
                        <RadioGroupItem
                          value={key}
                          id={`reforma-${key}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`reforma-${key}`}
                          className="cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium capitalize">{key}</h4>
                            <span className="text-primary font-bold">
                              {formatearMoneda(value.precioM2)}/m²
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {value.descripcion}
                          </p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="presupuestoPersonalizado"
                      className="font-medium"
                    >
                      Presupuesto personalizado
                    </Label>
                    <Switch
                      id="presupuestoPersonalizado"
                      checked={data.presupuestoPersonalizado !== null}
                      onCheckedChange={(checked) =>
                        handleChange(
                          "presupuestoPersonalizado",
                          checked ? calcularCosteReformaAutomatica() : null
                        )
                      }
                    />
                  </div>

                  {data.presupuestoPersonalizado !== null && (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={data.presupuestoPersonalizado}
                        onChange={(e) =>
                          handleChange(
                            "presupuestoPersonalizado",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Introduce tu presupuesto"
                      />
                      <p className="text-sm text-gray-500">
                        Introduce el presupuesto que tienes estimado para la
                        reforma
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="detallado" className="space-y-6 pt-4">
                {elementosReforma.map((categoria) => (
                  <div key={categoria.categoria}>
                    <h3 className="font-medium mb-2">{categoria.categoria}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {categoria.opciones.map((opcion) => (
                        <div
                          key={opcion.nombre}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            data.elementosSeleccionados &&
                            data.elementosSeleccionados[categoria.categoria] ===
                              opcion.nombre
                              ? "border-primary bg-primary/5"
                              : "hover:border-gray-400"
                          }`}
                          onClick={() =>
                            handleElementoChange(
                              categoria.categoria,
                              opcion.nombre
                            )
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
              </TabsContent>
            </Tabs>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Coste estimado de reforma</h3>
                <span className="text-xl font-bold text-primary">
                  {formatearMoneda(calcularCosteReforma())}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Este cálculo es orientativo y puede variar según las condiciones
                específicas del inmueble.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
