import { Clock, PenToolIcon as Tool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReformTime() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiempo estimado de reforma</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Reforma básica</span>
          </div>
          <div className="text-sm font-medium">4-6 semanas</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Reforma estándar</span>
          </div>
          <div className="text-sm font-medium">8-10 semanas</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Reforma premium</span>
          </div>
          <div className="text-sm font-medium">12-16 semanas</div>
        </div>

        <div className="pt-2">
          <Button variant="outline" className="w-full" size="sm">
            <Tool className="h-4 w-4 mr-2" />
            Solicitar presupuesto profesional
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
