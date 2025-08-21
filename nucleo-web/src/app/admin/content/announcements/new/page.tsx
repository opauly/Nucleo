"use client"

import { AnnouncementForm } from '@/components/admin/announcement-form'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NewAnnouncementPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/iniciar-sesion')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 lg:pt-20">
      <div className="container mx-auto px-4 py-8">
        <AnnouncementForm 
          onSave={() => router.push('/admin?tab=content')}
          onCancel={() => router.push('/admin?tab=content')}
        />
      </div>
    </div>
  )
}
