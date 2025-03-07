"use client";

import { Building, Calculator, Home, LogOut, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface AppHeaderProps {
  email?: string;
  showSearchButton?: boolean;
  showDashboardButton?: boolean;
  showCalculatorButton?: boolean;
}

export function AppHeader({
  email = "",
  showSearchButton = true,
  showDashboardButton = true,
  showCalculatorButton = true,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determinar si una ruta está activa
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white sticky top-0 z-10">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Building className="h-6 w-6 text-primary" />
        <span>Realytics</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {email && <span className="text-sm text-gray-500">{email}</span>}

        {showDashboardButton && (
          <Button
            variant={isActive("/dashboard") ? "active" : "ghost"}
            size="sm"
            onClick={() =>
              router.push(`/dashboard?email=${encodeURIComponent(email)}`)
            }
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        )}

        {showSearchButton && (
          <Button
            variant={isActive("/search") ? "active" : "ghost"}
            size="sm"
            onClick={() =>
              router.push(`/search?email=${encodeURIComponent(email)}`)
            }
          >
            <Search className="h-4 w-4 mr-2" />
            Buscador
          </Button>
        )}

        {showCalculatorButton && (
          <Button
            variant={isActive("/calculator") ? "active" : "ghost"}
            size="sm"
            onClick={() =>
              router.push(`/calculator?email=${encodeURIComponent(email)}`)
            }
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora de rentabilidad
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          <LogOut className="h-4 w-4 mr-2" />
          Salir
        </Button>
      </div>
    </header>
  );
}
