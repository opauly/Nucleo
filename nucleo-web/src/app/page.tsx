"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "@/components/ui/map";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const teams = [
    {
      id: 1,
      name: "Músicos",
      subtitle: "Adoración y música",
      image: "/img/musicos.jpg?v=1",
      description: "Equipo de adoración y música que lidera los tiempos de alabanza en nuestros servicios. Creemos que la música es una herramienta poderosa para conectar con Dios.",
      alt: "Equipo de música y adoración"
    },
    {
      id: 2,
      name: "Núcleo Kids",
      subtitle: "Niños 2-12 años",
      image: "/img/nucleo-kids.jpg?v=1",
      description: "Ministerio dedicado a los más pequeños, donde aprenden sobre el amor de Dios de manera divertida y creativa.",
      alt: "Núcleo Kids - Ministerio de niños"
    },
    {
      id: 3,
      name: "Acción Social",
      subtitle: "Servicio comunitario",
      image: "/img/accion-social.jpg?v=1",
      description: "Equipo comprometido con servir a la comunidad, brindando ayuda y esperanza a quienes más lo necesitan.",
      alt: "Acción Social - Servicio comunitario"
    },
    {
      id: 4,
      name: "Núcleo Teens",
      subtitle: "Adolescentes 13-17",
      image: "/img/nucleo-teens.jpg?v=1",
      description: "Espacio especial para adolescentes donde pueden crecer en su fe mientras construyen amistades significativas.",
      alt: "Núcleo Teens - Ministerio de adolescentes"
    },
    {
      id: 5,
      name: "Unánimes",
      subtitle: "Grupo de oración",
      image: "/img/unanimes.jpg?v=1",
      description: "Grupo dedicado a la oración intercesora, donde oramos juntos por las necesidades de nuestra iglesia y comunidad.",
      alt: "Unánimes - Grupo de oración"
    },
    {
      id: 6,
      name: "Matrimonios",
      subtitle: "Familias unidas",
      image: "/img/matrimonios.jpg?v=1",
      description: "Ministerio que fortalece los matrimonios y familias, construyendo relaciones sólidas basadas en principios bíblicos.",
      alt: "Matrimonios - Familias unidas"
    },
    {
      id: 7,
      name: "Logística",
      subtitle: "Servicio y organización",
      image: "/img/logistica.jpg?v=1",
      description: "Equipo que asegura que todos los eventos y servicios funcionen perfectamente, desde la preparación hasta la ejecución.",
      alt: "Logística - Servicio y organización"
    },
    {
      id: 8,
      name: "Evangelismo",
      subtitle: "Compartir el evangelio",
      image: "/img/evangelismo.jpg?v=1",
      description: "Ministerio enfocado en compartir el amor de Cristo con otros, llevando la esperanza del evangelio a nuestra comunidad.",
      alt: "Evangelismo - Compartir el evangelio"
    }
  ];

  useEffect(() => {
    console.log("🔍 Home component mounted");
    console.log("📁 Using local images from /img folder");

    // Test if we can access the images
    const testImages = [
      "/img/musicos.jpg?v=1",
      "/img/nucleo-kids.jpg?v=1",
      "/img/accion-social.jpg?v=1",
      "/img/nucleo-teens.jpg?v=1",
      "/img/unanimes.jpg?v=1",
      "/img/matrimonios.jpg?v=1",
      "/img/logistica.jpg?v=1",
      "/img/evangelismo.jpg?v=1",
      "/img/devocional-1.jpg?v=1",
      "/img/devocional-2.jpg?v=1",
      "/img/devocional-3.jpg?v=1"
    ];

    testImages.forEach((imgPath, index) => {
      const img = new window.Image();
      img.onload = () => {
        console.log(`✅ Image ${index + 1} loaded successfully:`, imgPath);
        console.log(`📊 Image dimensions: ${img.width}x${img.height}`);
      };
      img.onerror = () => {
        console.error(`❌ Image ${index + 1} failed to load:`, imgPath);
      };
      img.src = imgPath;
    });

    // Auto-scroll carousel every 10 seconds
    const interval = setInterval(() => {
      setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [teams.length]);

  const goToTeam = (index: number) => {
    setCurrentTeamIndex(index);
  };

  const goToNext = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  const goToPrevious = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + teams.length) % teams.length);
  };
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero Section - Modern Minimalist with Background Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="/img/hero-bg.jpg"
            alt="Grupo de amigos sonriendo juntos"
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              console.error('❌ Hero background image failed to load');
              console.error('🔗 Please add /img/hero-bg.jpg to the public/img folder');
            }}
          />
        </div>
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] -z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Núcleo
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 mb-12 font-light drop-shadow-md">
              Hacemos vida juntos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
                Quiénes Somos
              </Button>
              <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
                Eventos
              </Button>
            </div>
          </div>
        </div>
      </section>

            {/* Mission Section - 2 Column Layout */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Mission Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8 tracking-tight">
                Nuestra Misión
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed font-light">
                En Núcleo, creemos en construir una comunidad de fe vibrante donde todos puedan crecer espiritualmente,
                encontrar propósito y experimentar el amor de Dios.
              </p>
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-medium">
                Conoce Más
              </Button>
            </div>

            {/* Right Column - Stock Image */}
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/img/mision.jpg"
                  alt="Grupo de jóvenes sonriendo juntos"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('❌ Mission image failed to load');
                    console.error('🔗 Please add /img/mision.jpg to the public/img folder');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Teams Section - Carousel Design */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Nuestros Equipos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Conoce los diferentes ministerios que conforman nuestra comunidad
            </p>
          </div>

          {/* Featured Team - Carousel */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Hero Section - Featured Team */}
              <div className="h-48 relative bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                  <img
                    src={teams[currentTeamIndex].image}
                    alt={teams[currentTeamIndex].alt}
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 drop-shadow-lg">
                      {teams[currentTeamIndex].name}
                    </h3>
                    <p className="text-base md:text-lg text-slate-200 font-light drop-shadow-md">
                      {teams[currentTeamIndex].subtitle}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 md:p-6">
                <div className="max-w-lg mx-auto text-center">
                  <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
                    {teams[currentTeamIndex].description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-medium">
                      Conocer Más
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-medium">
                      Unirse al Equipo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Teams Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            {teams.map((team, index) => (
              <div 
                key={team.id}
                className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  index === currentTeamIndex ? 'ring-2 ring-slate-900' : ''
                }`}
                onClick={() => goToTeam(index)}
              >
                <div className="h-32 relative bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                    <img
                      src={team.image}
                      alt={team.alt}
                      className="w-full h-full object-cover opacity-40"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h4 className="text-base font-semibold drop-shadow-md">{team.name}</h4>
                      <p className="text-xs text-slate-200 drop-shadow-sm">{team.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex justify-center items-center mt-6 space-x-3">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-slate-50"
              aria-label="Equipo anterior"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Team Navigation Dots */}
            <div className="flex space-x-2">
              {teams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTeam(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    index === currentTeamIndex 
                      ? 'bg-slate-900 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir al equipo ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-slate-50"
              aria-label="Siguiente equipo"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>



      {/* Events & Announcements Section - 2 Column Layout */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8 tracking-tight">
                Descubre Núcleo
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed font-light">
                Explora nuestros eventos y anuncios para mantenerte conectado con nuestra comunidad de fe.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="border-l-4 border-slate-200 pl-4">
                  <h4 className="font-semibold text-slate-900 text-lg">Próximos Eventos</h4>
                  <p className="text-slate-600 mb-2">Estudio Bíblico • 24 jul 19:00 • Aula 1</p>
                  <p className="text-slate-600">Reunión de Jóvenes • 26 jul 18:00 • Salón de Jóvenes</p>
                </div>
                
                <div className="border-l-4 border-slate-200 pl-4">
                  <h4 className="font-semibold text-slate-900 text-lg">Anuncios Importantes</h4>
                  <p className="text-slate-600 mb-2">Retiro de Jóvenes - Inscripciones abiertas</p>
                  <p className="text-slate-600">Nuevo Horario de Servicios: 10:00 AM y 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
                  Eventos
                </Button>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
                  Anuncios
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/img/eventos.jpg"
                  alt="Comunidad participando en eventos y actividades"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('❌ Eventos image failed to load');
                    console.error('🔗 Please add /img/eventos.jpg to the public/img folder');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devocionales Section - Visual Design */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Devocionales
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Reflexiones diarias para nutrir tu fe y fortalecer tu relación con Dios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Devocional 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 relative bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                  <img
                    src="/img/devocional-1.jpg?v=1"
                    alt="Paz y tranquilidad espiritual"
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-semibold drop-shadow-lg">La Paz de Dios</h4>
                  <p className="text-sm text-slate-200 drop-shadow-md">21/7/2025 • Pastor Miguel</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed">
                  En medio de las tormentas de la vida, Dios nos ofrece su paz que sobrepasa todo entendimiento.
                  Esta paz no depende de nuestras circunstancias, sino de nuestra relación con Él.
                </p>
              </div>
            </div>

            {/* Devocional 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 relative bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                  <img
                    src="/img/devocional-2.jpg?v=1"
                    alt="Confianza y fe en Dios"
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-semibold drop-shadow-lg">Confianza en Dios</h4>
                  <p className="text-sm text-slate-200 drop-shadow-md">20/7/2025 • Pastor Miguel</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed">
                  Cuando enfrentamos desafíos, podemos confiar en que Dios tiene el control.
                  Él conoce nuestras necesidades y proveerá según su perfecta voluntad.
                </p>
              </div>
            </div>

            {/* Devocional 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 relative bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                  <img
                    src="/img/devocional-3.jpg?v=1"
                    alt="Amor incondicional de Cristo"
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-semibold drop-shadow-lg">El Amor de Cristo</h4>
                  <p className="text-sm text-slate-200 drop-shadow-md">19/7/2025 • Pastor Miguel</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed">
                  El amor de Cristo por nosotros es incondicional y eterno. No hay nada que podamos hacer para ganarlo,
                  y nada que podamos hacer para perderlo.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3">
              Ver Todos los Devocionales
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <Map />

      {/* Contact & CTA Section - Bold & Clean */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-xl mb-12 text-slate-300 max-w-2xl mx-auto font-light">
            Regístrate para recibir actualizaciones sobre eventos, devocionales y más
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
              Registrarse
            </Button>
            <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
