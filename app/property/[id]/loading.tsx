import { Building } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Building className="h-6 w-6 text-primary" />
          <span>Realytics</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Cargando...
            </span>
          </div>
          <p className="mt-4 text-gray-500">
            Cargando detalles del inmueble...
          </p>
        </div>
      </div>
    </div>
  );
}
