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

export interface PropertyFormData {
  precio: number;
  metros: number;
  habitaciones: number;
  banos: number;
  ubicacion: string;
  tipo: string;
}

interface PropertyFormProps {
  data: PropertyFormData;
  onChange: (data: PropertyFormData) => void;
}

export function PropertyForm({ data, onChange }: PropertyFormProps) {
  const handleChange = (
    field: keyof PropertyFormData,
    value: string | number | boolean
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del inmueble</CardTitle>
        <CardDescription>
          Introduce los datos básicos del inmueble
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="precio">Precio de compra (€)</Label>
            <Input
              id="precio"
              type="number"
              value={data.precio}
              onChange={(e) => handleChange("precio", Number(e.target.value))}
              placeholder="Ej: 250000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metros">Superficie (m²)</Label>
            <Input
              id="metros"
              type="number"
              value={data.metros}
              onChange={(e) => handleChange("metros", Number(e.target.value))}
              placeholder="Ej: 90"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="habitaciones">Habitaciones</Label>
            <Select
              value={data.habitaciones.toString()}
              onValueChange={(value) =>
                handleChange("habitaciones", Number(value))
              }
            >
              <SelectTrigger id="habitaciones">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="banos">Baños</Label>
            <Select
              value={data.banos.toString()}
              onValueChange={(value) => handleChange("banos", Number(value))}
            >
              <SelectTrigger id="banos">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Select
              value={data.ubicacion}
              onValueChange={(value) => handleChange("ubicacion", value)}
            >
              <SelectTrigger id="ubicacion">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Madrid">Madrid</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Valencia">Valencia</SelectItem>
                <SelectItem value="Sevilla">Sevilla</SelectItem>
                <SelectItem value="Málaga">Málaga</SelectItem>
                <SelectItem value="Bilbao">Bilbao</SelectItem>
                <SelectItem value="Otra">Otra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de inmueble</Label>
            <Select
              value={data.tipo}
              onValueChange={(value) => handleChange("tipo", value)}
            >
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Piso">Piso</SelectItem>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
                <SelectItem value="Ático">Ático</SelectItem>
                <SelectItem value="Dúplex">Dúplex</SelectItem>
                <SelectItem value="Chalet">Chalet</SelectItem>
                <SelectItem value="Adosado">Adosado</SelectItem>
                <SelectItem value="Local">Local comercial</SelectItem>
                <SelectItem value="Oficina">Oficina</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
