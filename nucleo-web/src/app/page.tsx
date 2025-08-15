import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "@/components/ui/map";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero Section - Modern Minimalist with Background Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Grupo de amigos sonriendo juntos"
            className="w-full h-full object-cover opacity-40"
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
                Visitar este domingo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-medium backdrop-blur-sm">
                Conocer más
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
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Grupo de jóvenes sonriendo juntos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Teams Section - Contemporary Design */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Nuestros Equipos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Conoce los diferentes ministerios que conforman nuestra comunidad
            </p>
          </div>

          {/* Featured Team - Compact Design */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Hero Section - Smaller with Background Image */}
              <div className="h-64 relative">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Equipo de música y adoración"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/70 to-blue-800/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-2 drop-shadow-lg">Músicos</h3>
                    <p className="text-lg md:text-xl text-blue-100 font-light drop-shadow-md">Adoración y música</p>
                  </div>
                </div>
              </div>
              
              {/* Content Section - More Compact */}
              <div className="p-6 md:p-8">
                <div className="max-w-xl mx-auto text-center">
                  <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                    Equipo de adoración y música que lidera los tiempos de alabanza en nuestros servicios. 
                    Creemos que la música es una herramienta poderosa para conectar con Dios.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 text-base font-medium">
                      Conocer Más
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 text-base font-medium">
                      Unirse al Equipo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Teams Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {/* Núcleo Kids */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-40 relative">
                <img
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Núcleo Kids - Ministerio de niños"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-700/70 to-green-800/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h4 className="text-lg font-semibold drop-shadow-md">Núcleo Kids</h4>
                    <p className="text-sm text-green-100 drop-shadow-sm">Niños 2-12 años</p>
                  </div>
                </div>
              </div>
            </div>

            {/* El Granero */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-40 relative">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="El Granero - Ayuda social"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 via-orange-700/70 to-orange-800/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h4 className="text-lg font-semibold drop-shadow-md">El Granero</h4>
                    <p className="text-sm text-orange-100 drop-shadow-sm">Ayuda social</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Núcleo Teens */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-40 relative">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Núcleo Teens - Ministerio de adolescentes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-700/70 to-purple-800/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h4 className="text-lg font-semibold drop-shadow-md">Núcleo Teens</h4>
                    <p className="text-sm text-purple-100 drop-shadow-sm">Adolescentes 13-17</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Navigation - Smaller Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            <button className="w-2 h-2 bg-slate-900 rounded-full"></button>
            <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors"></button>
            <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors"></button>
            <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors"></button>
          </div>
        </div>
      </section>



      {/* Events & Announcements Section - Compact Layout */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Descubre Núcleo
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Explora nuestros eventos y anuncios para mantenerte conectado
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Próximos Eventos */}
            <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Próximos Eventos</h3>
                <p className="text-slate-600 mb-6 text-sm">Mantente al día con nuestras actividades</p>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 hover:bg-slate-50 transition-colors">
                    <h4 className="font-semibold text-slate-900 mb-1">Estudio Bíblico</h4>
                    <p className="text-sm text-slate-600 mb-2">Profundizamos en el estudio de las Escrituras.</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>24 jul</span>
                      <span>19:00</span>
                      <span>Aula 1</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 hover:bg-slate-50 transition-colors">
                    <h4 className="font-semibold text-slate-900 mb-1">Reunión de Jóvenes</h4>
                    <p className="text-sm text-slate-600 mb-2">Tiempo especial para los jóvenes de la iglesia.</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>26 jul</span>
                      <span>18:00</span>
                      <span>Salón de Jóvenes</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-6 w-full border-slate-200 text-slate-700 hover:bg-slate-100">
                Ver Todos los Eventos
              </Button>
            </div>

            {/* Anuncios */}
            <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Anuncios</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900">Retiro de Jóvenes</h4>
                      <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs">26/7</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      Inscripciones abiertas para el retiro de jóvenes del próximo mes.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900">Nuevo Horario</h4>
                      <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs">24/7</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      Servicios a las 10:00 AM y 6:00 PM a partir del próximo mes.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-6 w-full border-slate-200 text-slate-700 hover:bg-slate-100">
                Ver Todos los Anuncios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Devocionales Section - Minimalist */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-12 text-center tracking-tight">
            Devocionales
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h4 className="text-xl font-semibold text-slate-900 mb-3">La Paz de Dios</h4>
              <p className="text-slate-500 text-sm mb-4">21/7/2025 • Pastor Miguel</p>
              <p className="text-slate-600 leading-relaxed">
                En medio de las tormentas de la vida, Dios nos ofrece su paz que sobrepasa todo entendimiento. 
                Esta paz no depende de nuestras circunstancias, sino de nuestra relación con Él.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Confianza en Dios</h4>
              <p className="text-slate-500 text-sm mb-4">20/7/2025 • Pastor Miguel</p>
              <p className="text-slate-600 leading-relaxed">
                Cuando enfrentamos desafíos, podemos confiar en que Dios tiene el control. 
                Él conoce nuestras necesidades y proveerá según su perfecta voluntad.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h4 className="text-xl font-semibold text-slate-900 mb-3">El Amor de Cristo</h4>
              <p className="text-slate-500 text-sm mb-4">19/7/2025 • Pastor Miguel</p>
              <p className="text-slate-600 leading-relaxed">
                El amor de Cristo por nosotros es incondicional y eterno. No hay nada que podamos hacer 
                para ganarlo, y nada que podamos hacer para perderlo.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
              Ver Todos los Devocionales
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <Map />

      {/* Contact & CTA Section - Bold & Clean */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-xl mb-12 text-slate-300 max-w-2xl mx-auto font-light">
            Regístrate para recibir actualizaciones sobre eventos, devocionales y más
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg font-medium">
              Registrarse
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-slate-800 px-8 py-3 text-lg font-medium">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
