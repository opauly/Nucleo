import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'

export const metadata = {
  title: 'Anuncios - Núcleo',
  description: 'Mantente informado sobre las últimas noticias y anuncios de nuestra iglesia.',
}

export default async function AnunciosPage() {
  const supabase = await createClient()
  
  let announcements = []
  let error = null

  if (supabase) {
    const { data, error: fetchError } = await supabase
      .from('announcements')
      .select('*')
      .order('published_at', { ascending: false })

    if (fetchError) {
      error = fetchError.message
    } else {
      announcements = data || []
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="/img/anuncios-hero.jpg"
            alt="Anuncios y noticias de la iglesia"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Anuncios
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light drop-shadow-md">
              Mantente informado sobre las últimas noticias, eventos y anuncios importantes de nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          {error ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Error al cargar los anuncios: {error}</p>
              </div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  No hay anuncios disponibles
                </h3>
                <p className="text-slate-600">
                  Pronto tendremos nuevos anuncios para compartir contigo.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl lg:text-3xl text-slate-900 mb-2">
                          {announcement.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(announcement.published_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(announcement.published_at).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      {announcement.is_featured && (
                        <Badge className="bg-blue-600 text-white">
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {announcement.content}
                      </p>
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
