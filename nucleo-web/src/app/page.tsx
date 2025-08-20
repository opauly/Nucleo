"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "@/components/ui/map";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  // Fallback teams data in case Supabase is not available
  const fallbackTeams = [
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

  // Team image mapping for Supabase data
  const teamImageMap: { [key: string]: string } = {
    'Músicos': '/img/musicos.jpg?v=1',
    'Núcleo Kids': '/img/nucleo-kids.jpg?v=1',
    'Acción Social': '/img/accion-social.jpg?v=1',
    'Núcleo Teens': '/img/nucleo-teens.jpg?v=1',
    'Unánimes': '/img/unanimes.jpg?v=1',
    'Matrimonios': '/img/matrimonios.jpg?v=1',
    'Logística': '/img/logistica.jpg?v=1',
    'Evangelismo': '/img/evangelismo.jpg?v=1'
  };

  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [teams, setTeams] = useState(fallbackTeams);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Home component mounted");
    
    const fetchData = async () => {
      const supabase = createClient();
      if (!supabase) {
        console.log("⚠️ Supabase not available, using fallback data");
        setTeams(fallbackTeams);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch teams
        const { data: teamsData, error: teamsError } = await supabase
          .from('teams')
          .select('*')
          .order('name', { ascending: true });

        if (teamsError) {
          console.error("❌ Error fetching teams:", teamsError);
          setTeams(fallbackTeams);
        } else {
          console.log("✅ Teams fetched successfully:", teamsData);
          // Remove duplicates based on team name
          const uniqueTeams = teamsData ? teamsData.filter((team: any, index: number, self: any[]) => 
            index === self.findIndex((t: any) => t.name === team.name)
          ) : fallbackTeams;
          console.log("🔍 Unique teams after deduplication:", uniqueTeams);
          setTeams(uniqueTeams);
        }

        // Fetch featured announcements
        const { data: announcementsData, error: announcementsError } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_featured', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (announcementsError) {
          console.error("❌ Error fetching announcements:", announcementsError);
        } else {
          console.log("✅ Announcements fetched successfully:", announcementsData);
          setAnnouncements(announcementsData || []);
        }

        // Fetch featured devotionals
        const { data: devotionalsData, error: devotionalsError } = await supabase
          .from('devotionals')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3);

        if (devotionalsError) {
          console.error("❌ Error fetching devotionals:", devotionalsError);
        } else {
          console.log("✅ Devotionals fetched successfully:", devotionalsData);
          console.log("📊 Number of devotionals:", devotionalsData?.length || 0);
          setDevotionals(devotionalsData || []);
        }

      } catch (error) {
        console.error("❌ Unexpected error:", error);
        setTeams(fallbackTeams);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Auto-scroll carousel every 10 seconds
    const interval = setInterval(() => {
      setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % (teams.length || fallbackTeams.length));
    }, 10000);

    return () => clearInterval(interval);
  }, []); // Remove teams.length dependency to prevent re-renders

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
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Núcleo
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light drop-shadow-md">
              Hacemos vida juntos.
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
                      src={teams[currentTeamIndex].image || teamImageMap[teams[currentTeamIndex].name] || '/img/musicos.jpg?v=1'}
                      alt={teams[currentTeamIndex].alt || teams[currentTeamIndex].name}
                      className="w-full h-full object-cover opacity-40"
                      onError={(e) => {
                        // Fallback to a default image if the team image fails to load
                        e.currentTarget.src = '/img/musicos.jpg?v=1';
                      }}
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 drop-shadow-lg">
                      {teams[currentTeamIndex].name}
                    </h3>
                    <p className="text-base md:text-lg text-slate-200 font-light drop-shadow-md">
                      {teams[currentTeamIndex].subtitle || 'Ministerio'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 md:p-6">
                <div className="max-w-lg mx-auto text-center">
                  <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
                    {teams[currentTeamIndex].description || 'Ministerio dedicado a servir a nuestra comunidad y crecer juntos en la fe.'}
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

          {/* Additional Teams Grid - Show all teams */}
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
                      src={team.image || teamImageMap[team.name] || '/img/musicos.jpg?v=1'}
                      alt={team.alt || team.name}
                      className="w-full h-full object-cover opacity-40"
                      onError={(e) => {
                        // Fallback to a default image if the team image fails to load
                        e.currentTarget.src = '/img/musicos.jpg?v=1';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h4 className="text-base font-semibold drop-shadow-md">{team.name}</h4>
                      <p className="text-xs text-slate-200 drop-shadow-sm">{team.subtitle || 'Ministerio'}</p>
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
                {announcements.length > 0 && (
                  <div className="border-l-4 border-slate-200 pl-4">
                    <h4 className="font-semibold text-slate-900 text-lg">Anuncios Importantes</h4>
                    {announcements.slice(0, 2).map((announcement, index) => (
                      <p key={index} className="text-slate-600 mb-2">
                        {announcement.title}
                      </p>
                    ))}
                  </div>
                )}
                
                {devotionals.length > 0 && (
                  <div className="border-l-4 border-slate-200 pl-4">
                    <h4 className="font-semibold text-slate-900 text-lg">Devocionales Destacados</h4>
                    {devotionals.slice(0, 2).map((devotional, index) => (
                      <p key={index} className="text-slate-600 mb-2">
                        {devotional.title}
                      </p>
                    ))}
                  </div>
                )}
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
            {devotionals.length > 0 ? (
              devotionals.slice(0, 3).map((devotional, index) => (
                <div key={devotional.id || index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 relative bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
                      <img
                        src={`/img/devocional-${index + 1}.jpg?v=1`}
                        alt={devotional.title}
                        className="w-full h-full object-cover opacity-40"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-xl font-semibold drop-shadow-lg">{devotional.title}</h4>
                      <p className="text-sm text-slate-200 drop-shadow-md">
                        {devotional.author && `${devotional.author}`}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 leading-relaxed">
                      {devotional.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback content when no devotionals are available
              <>
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
                      <p className="text-sm text-slate-200 drop-shadow-md">Pastor Miguel</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 leading-relaxed">
                      En medio de las tormentas de la vida, Dios nos ofrece su paz que sobrepasa todo entendimiento.
                    </p>
                  </div>
                </div>

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
                      <p className="text-sm text-slate-200 drop-shadow-md">Pastor Miguel</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 leading-relaxed">
                      Cuando enfrentamos desafíos, podemos confiar en que Dios tiene el control.
                    </p>
                  </div>
                </div>

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
                      <p className="text-sm text-slate-200 drop-shadow-md">Pastor Miguel</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 leading-relaxed">
                      El amor de Cristo es incondicional y transformador. Nos acepta tal como somos.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <a href="/devocionales">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3">
                Ver Todos los Devocionales
              </Button>
            </a>
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
