"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Quiénes Somos", href: "/quienes-somos" },
    { name: "Anuncios", href: "/anuncios" },
    { name: "Eventos", href: "/eventos" },
    { name: "Devocionales", href: "/devocionales" },
    { name: "Equipos", href: "/equipos" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo_black.png"
              alt="Núcleo Logo"
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/iniciar-sesion">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-slate-200 space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/iniciar-sesion" onClick={() => setIsMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/registro" onClick={() => setIsMenuOpen(false)}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
