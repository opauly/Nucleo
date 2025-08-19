"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LocationSelector } from '@/components/ui/location-selector'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    phone: '',
    birth_date: '',
    provincia: '',
    canton: '',
    distrito: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('Todos los campos son obligatorios')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden')
      return false
    }

    if (formData.password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres')
      return false
    }

    if (!formData.nombre || !formData.apellido1 || !formData.phone) {
      setMessage('Nombre, primer apellido y teléfono son obligatorios')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setStatus('error')
      return
    }

    if (!supabase) {
      setStatus('error')
      setMessage('Error de conexión')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
            apellido1: formData.apellido1,
            apellido2: formData.apellido2
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // 2. Create profile using API route (bypasses RLS)
        const profileResponse = await fetch('/api/auth/create-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: authData.user,
            profileData: {
              nombre: formData.nombre,
              apellido1: formData.apellido1,
              apellido2: formData.apellido2,
              phone: formData.phone,
              birth_date: formData.birth_date,
              provincia: formData.provincia,
              canton: formData.canton,
              distrito: formData.distrito
            }
          })
        })

        const profileResult = await profileResponse.json()

        if (!profileResponse.ok) {
          throw new Error(profileResult.error || 'Error creating profile')
        }

        setStatus('success')
        setMessage('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Error durante el registro')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80">
          <img
            src="/img/registro-hero.jpg"
            alt="Registro de usuario"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Registrarse
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light drop-shadow-md">
              Únete a nuestra comunidad y comienza tu camino de fe
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 text-center">
                  Crear Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Message */}
                  {status !== 'idle' && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      status === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-700' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      {status === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span>{message}</span>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pr-10"
                        placeholder="Mínimo 6 caracteres"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pr-10"
                        placeholder="Repite tu contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre *
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label htmlFor="apellido1" className="block text-sm font-medium text-slate-700 mb-1">
                        Primer Apellido *
                      </label>
                      <Input
                        id="apellido1"
                        name="apellido1"
                        type="text"
                        required
                        value={formData.apellido1}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Primer apellido"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="apellido2" className="block text-sm font-medium text-slate-700 mb-1">
                      Segundo Apellido
                    </label>
                    <Input
                      id="apellido2"
                      name="apellido2"
                      type="text"
                      value={formData.apellido2}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Segundo apellido (opcional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Teléfono *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="+506 8888 8888"
                    />
                  </div>

                  <div>
                    <label htmlFor="birth_date" className="block text-sm font-medium text-slate-700 mb-1">
                      Fecha de Nacimiento
                    </label>
                    <Input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  {/* Location */}
                  <LocationSelector
                    selectedProvincia={formData.provincia}
                    selectedCanton={formData.canton}
                    selectedDistrito={formData.distrito}
                    onProvinciaChange={(provincia) => setFormData({ ...formData, provincia })}
                    onCantonChange={(canton) => setFormData({ ...formData, canton })}
                    onDistritoChange={(distrito) => setFormData({ ...formData, distrito })}
                    disabled={isSubmitting}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  >
                    {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-slate-600">
                      ¿Ya tienes una cuenta?{' '}
                      <Link href="/iniciar-sesion" className="text-blue-600 hover:text-blue-700 font-medium">
                        Iniciar Sesión
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
