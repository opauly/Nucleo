import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export const metadata = {
  title: 'Eventos - Núcleo',
  description: 'Descubre y participa en los próximos eventos de nuestra iglesia.',
}

export default async function EventosPage() {
  const supabase = await createClient()
  
  let events = []
  let error = null

  if (supabase) {
    const { data, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('start_date', { ascending: true })

    if (fetchError) {
      error = fetchError.message
    } else {
      events = data || []
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="/img/eventos-hero.jpg"
            alt="Eventos y actividades de la iglesia"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Eventos
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light drop-shadow-md">
              Únete a nosotros en estos eventos especiales y fortalece tu fe en comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          {error ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error al cargar los eventos: {error}</p>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  No hay eventos programados
                </h3>
                <p className="text-slate-600">
                  Pronto tendremos nuevos eventos para compartir contigo.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {events.map((event) => (
                <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl lg:text-3xl text-slate-900 mb-2">
                          {event.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {formatDate(event.start_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {formatTime(event.start_date)} - {formatTime(event.end_date)}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          )}
                          {event.max_participants && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">
                                Máximo {event.max_participants} participantes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {isUpcoming(event.start_date) ? (
                          <Badge className="bg-green-600 text-white">
                            Próximo
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-600 text-white">
                            Pasado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none mb-6">
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    {isUpcoming(event.start_date) && (
                      <div className="flex gap-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Registrarse
                        </Button>
                        <Button variant="outline" className="border-slate-300 text-slate-700">
                          Más Información
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
