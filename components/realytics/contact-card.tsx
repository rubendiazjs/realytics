import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>¿Interesado en este inmueble?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">Solicitar visita</Button>
        <Button variant="outline" className="w-full">
          Contactar con el agente
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Un agente inmobiliario se pondrá en contacto contigo a la mayor
          brevedad posible.
        </p>
      </CardContent>
    </Card>
  );
}
