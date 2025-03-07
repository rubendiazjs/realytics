"use client";

import ContentBlock from "@/components/landing/content-block";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Building, HammerIcon, Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aquí podrías guardar el email en una base de datos
    // Por ahora, simplemente redirigimos al dashboard
    try {
      // Simulamos una pequeña espera para dar feedback al usuario
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Redirigimos al dashboard con el email como parámetro de consulta
      router.push(`/dashboard?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Building className="h-6 w-6 text-primary" />
          <span>Realytics</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Características
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contacto
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-white to-gray-50 ">
          <div className="relative container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] py-12 md:py-24 lg:py-32">
              <DotPattern
                width={20}
                height={20}
                glow={true}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                )}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Simplifica tu búsqueda de inmuebles y encuentra las mejores
                    oportunidades de inversión
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Obtén acceso exclusivo a nuestro potente buscador
                    inmobiliario. Encuentra propiedades que coincidan
                    exactamente con tus criterios antes que nadie.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form
                    className="flex flex-col gap-2 sm:flex-row"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      type="email"
                      placeholder="Introduce tu email"
                      className="max-w-lg flex-1 bg-primary-foreground text-primary"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      className="shrink-0"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Obtener Acceso"}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500">
                    Únete y descubre las mejores oportunidades inmobiliarias
                    cerca de ti. Sin spam, nunca.
                  </p>
                </div>
              </div>
              <Image
                src="https://fqxttxwgklighunmhwgq.supabase.co/storage/v1/object/public/images/realytics/assets/header.jpg"
                width={550}
                height={550}
                alt="Modern home interior"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <ContentBlock>
              <ContentBlock.Badge>
                Características exclusivas
              </ContentBlock.Badge>
              <ContentBlock.Header>
                Por qué elegir nuestro buscador inmobiliario
              </ContentBlock.Header>
              <ContentBlock.Description>
                Nuestras herramientas de búsqueda avanzadas te ayudan a
                encontrar exactamente lo que buscas en el mercado inmobiliario.
              </ContentBlock.Description>
            </ContentBlock>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Filtros Avanzados</h3>
                <p className="text-center text-gray-500">
                  Filtra por precio, ubicación, comodidades y docenas de otros
                  criterios para encontrar tu coincidencia perfecta.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Home className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Listados Exclusivos</h3>
                <p className="text-center text-gray-500">
                  Accede a propiedades no disponibles en otras plataformas,
                  dándote ventaja en tu búsqueda.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <HammerIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Planificador de reformas</h3>
                <p className="text-center text-gray-500">
                  Recibe un presupuesto estimado que encaje con el tipo de
                  reforma que tu propiedad necesita.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <ContentBlock>
              <ContentBlock.Header>Cómo Funciona</ContentBlock.Header>
              <ContentBlock.Description>
                Comenzar con nuestro buscador inmobiliario es simple y directo.
              </ContentBlock.Description>
            </ContentBlock>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Regístrate</h3>
                <p className="text-center text-gray-500">
                  Introduce tu email para crear una cuenta y obtener acceso
                  inmediato.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">
                  Establece tus Preferencias
                </h3>
                <p className="text-center text-gray-500">
                  Cuéntanos el tipo de inmueble que estás buscando.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Comienza a Buscar</h3>
                <p className="text-center text-gray-500">
                  Navega por los listados que coinciden con tus criterios y
                  encuentra tu próxima inversión.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <ContentBlock>
                <ContentBlock.Header>
                  ¿Te gustaría descubrir propiedades alineadas con tu estrategia
                  financiera?
                </ContentBlock.Header>
                <ContentBlock.Description className="max-w-[600px] text-primary-foreground/80">
                  Únete a miles de usuarios que han encontrado las propiedades
                  que mejor se ajustan a sus necesidades financieras y objetivos
                  de inversión.
                </ContentBlock.Description>
              </ContentBlock>
              <div className="w-full max-w-sm space-y-2">
                <form
                  className="flex flex-col gap-2 sm:flex-row"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    type="email"
                    placeholder="Introduce tu email"
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="shrink-0"
                  >
                    Obtener Acceso
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <ContentBlock>
              <ContentBlock.Header>
                Lo que dicen nuestros usuarios
              </ContentBlock.Header>
              <ContentBlock.Description>
                "Gracias a este buscador, encontré la inversión inmobiliaria
                perfecta para mis objetivos financieros. El proceso fue rápido y
                sencillo, y ahora tengo una propiedad que se adapta
                completamente a mi estrategia de crecimiento. ¡Muy recomendable
                para cualquier inversor!"
              </ContentBlock.Description>
            </ContentBlock>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500">
                    "Estaba buscando una oportunidad inmobiliaria que se
                    ajustara a mi presupuesto y objetivos a largo plazo, y este
                    sitio me facilitó todo. Encontré varias opciones rentables
                    que encajaban perfectamente con mi plan financiero. ¡Una
                    herramienta imprescindible para invertir de manera
                    inteligente!"
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src="https://fqxttxwgklighunmhwgq.supabase.co/storage/v1/object/public/images/realytics/avatar/woman-1.jpg"
                    />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Laura Martínez</p>
                    <p className="text-xs text-gray-500">Nueva Propietaria</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500">
                    "Nunca pensé que encontrar una propiedad adecuada a mis
                    necesidades fuera tan fácil. El buscador me ayudó a
                    identificar opciones con un alto potencial de rentabilidad y
                    me ahorró mucho tiempo. Ahora tengo la inversión que siempre
                    quise, ¡todo gracias a esta plataforma!"
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src="https://fqxttxwgklighunmhwgq.supabase.co/storage/v1/object/public/images/realytics/avatar/man-1.jpg"
                    />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Carlos Rodríguez</p>
                    <p className="text-xs text-gray-500">
                      Inversor Inmobiliario
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-gray-500">
                    "Como agente inmobiliario, esta herramienta ha revolucionado
                    cómo ayudo a mis clientes a encontrar oportunidades que
                    realmente les benefician."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src="https://fqxttxwgklighunmhwgq.supabase.co/storage/v1/object/public/images/realytics/avatar/man-2.jpg"
                    />
                    <AvatarFallback>VG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Víctor García</p>
                    <p className="text-xs text-gray-500">Agente Inmobiliario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Building className="h-5 w-5 text-primary" />
            <span>Realytics</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Realytics. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Términos de Servicio
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contáctanos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
