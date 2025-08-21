"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'



export default function EventosPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('upcoming') // 'upcoming' or 'past'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, activeFilter])

  const fetchEvents = async () => {
    if (!supabase) {
      setError('Error de conexión')
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('start_date', { ascending: true })

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setEvents(data || [])
      }
    } catch (err) {
      setError('Error al cargar los eventos')
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    const now = new Date()
    if (activeFilter === 'upcoming') {
      const upcomingEvents = events.filter(event => new Date(event.start_date) > now)
      setFilteredEvents(upcomingEvents)
    } else {
      const pastEvents = events.filter(event => new Date(event.start_date) <= now)
      setFilteredEvents(pastEvents)
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

  const getEventSummary = (description: string) => {
    if (!description) return 'Únete a nosotros en este evento especial de la comunidad.'
    return description.length > 120 ? description.substring(0, 120) + '...' : description
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
          {/* Filter Buttons */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-md border border-slate-200">
                <Button
                  variant={activeFilter === 'upcoming' ? 'default' : 'ghost'}
                  onClick={() => setActiveFilter('upcoming')}
                  className={`px-6 py-2 ${activeFilter === 'upcoming' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Futuros
                </Button>
                <Button
                  variant={activeFilter === 'past' ? 'default' : 'ghost'}
                  onClick={() => setActiveFilter('past')}
                  className={`px-6 py-2 ${activeFilter === 'past' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Pasados
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Cargando eventos...</p>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error al cargar los eventos: {error}</p>
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {activeFilter === 'upcoming' ? 'No hay eventos futuros' : 'No hay eventos pasados'}
                </h3>
                <p className="text-slate-600">
                  {activeFilter === 'upcoming' 
                    ? 'Pronto tendremos nuevos eventos para compartir contigo.'
                    : 'No hay eventos pasados para mostrar.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Featured Image */}
                  {event.image_url ? (
                    <div className="h-48 relative bg-slate-800">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      {event.is_featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-blue-600 text-white">
                            Destacado
                          </Badge>
                        </div>
                      )}
                      {isUpcoming(event.start_date) ? (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-600 text-white">
                            Próximo
                          </Badge>
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-slate-600 text-white">
                            Pasado
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 relative bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Calendar className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium opacity-80">Evento</p>
                      </div>
                      {event.is_featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-blue-600 text-white">
                            Destacado
                          </Badge>
                        </div>
                      )}
                      {isUpcoming(event.start_date) ? (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-600 text-white">
                            Próximo
                          </Badge>
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-slate-600 text-white">
                            Pasado
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Content */}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                        {getEventSummary(event.description)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(event.start_date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatTime(event.start_date)}
                          {event.end_date && ` - ${formatTime(event.end_date)}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Link href={`/eventos/${event.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Leer Más
                        </Button>
                      </Link>
                    </div>
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
