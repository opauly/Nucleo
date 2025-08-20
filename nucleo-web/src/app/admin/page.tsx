"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Calendar, Check, X, Clock, Users, BarChart3 } from 'lucide-react'

interface UserProfile {
  id: string
  nombre: string
  apellido1: string
  apellido2: string | null
  email: string
}

interface Team {
  id: string
  name: string
  description: string
}

interface Event {
  id: string
  title: string
  start_date: string
  location: string
}

interface EventRegistration {
  id: string
  event_id: string
  profile_id: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
  profiles: UserProfile
  events: Event
}

interface TeamMembership {
  team_id: string
  profile_id: string
  status: string
  message: string | null
  joined_at: string
  approved_at: string | null
  approved_by: string | null
  profiles: UserProfile
  teams: Team
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'teams'>('overview')
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([])
  const [teamMemberships, setTeamMemberships] = useState<TeamMembership[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/iniciar-sesion')
      return
    }

    fetchData()
  }, [user, router])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch both event registrations and team memberships
      const [eventsResponse, teamsResponse] = await Promise.all([
        fetch('/api/admin/event-registrations'),
        fetch('/api/admin/team-memberships')
      ])

      if (eventsResponse.ok) {
        const eventsResult = await eventsResponse.json()
        setEventRegistrations(eventsResult.registrations || [])
      }

      if (teamsResponse.ok) {
        const teamsResult = await teamsResponse.json()
        setTeamMemberships(teamsResult.memberships || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEventAction = async (registrationId: string, action: 'approve' | 'reject') => {
    if (!user) return

    setProcessingId(registrationId)

    try {
      const response = await fetch('/api/events/approve-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId,
          action,
          adminUserId: user.id
        })
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message)
        fetchData() // Refresh the data
      } else {
        toast.error(result.error || 'Error al procesar registro')
      }
    } catch (error) {
      console.error('Error processing registration:', error)
      toast.error('Error de conexión')
    } finally {
      setProcessingId(null)
    }
  }

  const handleTeamAction = async (membership: TeamMembership, action: 'approve' | 'reject') => {
    if (!user) return

    const membershipKey = `${membership.team_id}-${membership.profile_id}`
    setProcessingId(membershipKey)

    try {
      const response = await fetch('/api/teams/approve-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: membership.team_id,
          profileId: membership.profile_id,
          action,
          adminUserId: user.id
        })
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message)
        fetchData() // Refresh the data
      } else {
        toast.error(result.error || 'Error al procesar membresía')
      }
    } catch (error) {
      console.error('Error processing membership:', error)
      toast.error('Error de conexión')
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>
      case 'approved':
        return <Badge className="bg-green-600 text-white"><Check className="w-3 h-3 mr-1" />Aprobado</Badge>
      case 'rejected':
        return <Badge className="bg-red-600 text-white"><X className="w-3 h-3 mr-1" />Rechazado</Badge>
      default:
        return <Badge className="bg-slate-600 text-white">{status}</Badge>
    }
  }

  const formatUserName = (profile: UserProfile) => {
    const fullName = `${profile.nombre} ${profile.apellido1}${profile.apellido2 ? ` ${profile.apellido2}` : ''}`
    return fullName.trim()
  }

  const pendingEvents = eventRegistrations.filter(r => r.status === 'pending')
  const pendingTeams = teamMemberships.filter(m => m.status === 'pending')

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="/img/eventos-hero.jpg"
            alt="Panel de Administración"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Panel de Administración
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light drop-shadow-md">
              Gestiona eventos, equipos y contenido
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Resumen
            </Button>
            <Button
              variant={activeTab === 'events' ? 'default' : 'outline'}
              onClick={() => setActiveTab('events')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Eventos ({pendingEvents.length})
            </Button>
            <Button
              variant={activeTab === 'teams' ? 'default' : 'outline'}
              onClick={() => setActiveTab('teams')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Equipos ({pendingTeams.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-6xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                <p className="text-slate-600">Cargando datos...</p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Registros de Eventos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Pendientes:</span>
                          <Badge className="bg-yellow-600 text-white">{pendingEvents.length}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Total:</span>
                          <Badge className="bg-slate-600 text-white">{eventRegistrations.length}</Badge>
                        </div>
                        <Button
                          onClick={() => setActiveTab('events')}
                          className="w-full"
                          variant="outline"
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        Solicitudes de Equipos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Pendientes:</span>
                          <Badge className="bg-yellow-600 text-white">{pendingTeams.length}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Total:</span>
                          <Badge className="bg-slate-600 text-white">{teamMemberships.length}</Badge>
                        </div>
                        <Button
                          onClick={() => setActiveTab('teams')}
                          className="w-full"
                          variant="outline"
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Events Tab */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-slate-900">Registros de Eventos</h2>
                    <Button onClick={fetchData} variant="outline" size="sm">
                      Actualizar
                    </Button>
                  </div>
                  

                  
                  {eventRegistrations.length === 0 ? (
                    <Card className="shadow-lg">
                      <CardContent className="p-12 text-center">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                          No hay registros de eventos
                        </h3>
                        <p className="text-slate-600">
                          No hay inscripciones a eventos para revisar.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    eventRegistrations.map((registration) => (
                      <Card key={`event-${registration.id}`} className="shadow-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                  <Calendar className="w-5 h-5 text-white" />
                                </div>
                                                           <div>
                             <CardTitle className="text-xl text-slate-900">
                               Inscripción a Evento
                             </CardTitle>
                             <p className="text-slate-600">
                               {registration.profiles ? formatUserName(registration.profiles) : `ID: ${registration.profile_id}`}
                             </p>
                           </div>
                              </div>
                                                                               <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span><strong>Evento:</strong> {registration.events?.title || `ID: ${registration.event_id}`}</span>
                          <span><strong>Email:</strong> {registration.profiles?.email || 'N/A'}</span>
                          <span><strong>Registrado:</strong> {formatDate(registration.created_at)}</span>
                        </div>
                        {registration.events && (
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-2">
                            <span><strong>Fecha del Evento:</strong> {formatDate(registration.events.start_date)}</span>
                            <span><strong>Ubicación:</strong> {registration.events.location || 'Por confirmar'}</span>
                          </div>
                        )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(registration.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {registration.notes && (
                            <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-700">
                                <strong>Notas:</strong> {registration.notes}
                              </p>
                            </div>
                          )}
                          {registration.status === 'pending' && (
                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleEventAction(registration.id, 'approve')}
                                disabled={processingId === registration.id}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {processingId === registration.id ? 'Procesando...' : 'Aprobar'}
                              </Button>
                              <Button
                                onClick={() => handleEventAction(registration.id, 'reject')}
                                disabled={processingId === registration.id}
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-50"
                              >
                                {processingId === registration.id ? 'Procesando...' : 'Rechazar'}
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}

              {/* Teams Tab */}
              {activeTab === 'teams' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-slate-900">Solicitudes de Equipos</h2>
                    <Button onClick={fetchData} variant="outline" size="sm">
                      Actualizar
                    </Button>
                  </div>
                  
                  {teamMemberships.length === 0 ? (
                    <Card className="shadow-lg">
                      <CardContent className="p-12 text-center">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                          No hay solicitudes de equipos
                        </h3>
                        <p className="text-slate-600">
                          No hay solicitudes de membresía para revisar.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    teamMemberships.map((membership) => (
                      <Card key={`team-${membership.team_id}-${membership.profile_id}`} className="shadow-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                                           <div>
                             <CardTitle className="text-xl text-slate-900">
                               Solicitud de Membresía
                             </CardTitle>
                             <p className="text-slate-600">
                               {membership.profiles ? formatUserName(membership.profiles) : `ID: ${membership.profile_id}`}
                             </p>
                           </div>
                              </div>
                                                       <div className="flex items-center gap-4 text-sm text-slate-600">
                           <span><strong>Equipo:</strong> {membership.teams?.name || `ID: ${membership.team_id}`}</span>
                           <span><strong>Email:</strong> {membership.profiles?.email || 'N/A'}</span>
                           <span><strong>Solicitado:</strong> {formatDate(membership.joined_at)}</span>
                         </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(membership.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {membership.message && (
                            <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-700">
                                <strong>Mensaje:</strong> {membership.message}
                              </p>
                            </div>
                          )}
                          {membership.status === 'pending' && (
                            <div className="flex gap-3">
                                                             <Button
                                 onClick={() => handleTeamAction(membership, 'approve')}
                                 disabled={processingId === `${membership.team_id}-${membership.profile_id}`}
                                 className="bg-green-600 hover:bg-green-700 text-white"
                               >
                                 {processingId === `${membership.team_id}-${membership.profile_id}` ? 'Procesando...' : 'Aprobar'}
                               </Button>
                               <Button
                                 onClick={() => handleTeamAction(membership, 'reject')}
                                 disabled={processingId === `${membership.team_id}-${membership.profile_id}`}
                                 variant="outline"
                                 className="border-red-300 text-red-700 hover:bg-red-50"
                               >
                                 {processingId === `${membership.team_id}-${membership.profile_id}` ? 'Procesando...' : 'Rechazar'}
                               </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
