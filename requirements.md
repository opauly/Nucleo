# Núcleo Church Website - Full-Stack Buildout Plan

## Overall Design and Content Strategy

### Resumen del diseño propuesto
- **Look & Feel**: Moderno, acogedor y profesional con enfoque en la comunidad
- **Paleta de colores**: 
  - Primario: Azul profundo (#1e40af) - confianza y estabilidad
  - Secundario: Verde bosque (#059669) - crecimiento y vida
  - Acentos: Dorado cálido (#d97706) - calidez y espiritualidad
  - Neutros: Grises suaves (#f8fafc, #64748b, #1e293b)
- **Tipografía**: 
  - Títulos: Inter (Google Fonts) - moderna y legible
  - Cuerpo: Inter - optimizada para web
  - Acentos: Poppins para CTAs y elementos destacados

### Secciones clave y estructura de contenido
1. **Home**: Hero con mensaje de bienvenida, últimos anuncios, próximos eventos, CTA principal
2. **Quiénes Somos**: Visión, misión, valores, equipo pastoral con fotos
3. **Anuncios**: Lista filtrable con tags, búsqueda, paginación
4. **Eventos**: Calendario/lista con registro integrado, control de capacidad
5. **Equipos**: Ministerios con descripciones y formularios de contacto
6. **Contacto**: Formulario con validación y envío a Supabase
7. **Autenticación**: Registro/inicio de sesión con Supabase Auth

### Mapa de navegación y CTAs principales
- **Navbar**: Logo, menú principal, botón "Iniciar Sesión"
- **Home CTAs**: "Visitar este domingo", "Registrarse a evento", "Conocer más"
- **Eventos CTAs**: "Registrarme", "Ver detalles", "Compartir"
- **Equipos CTAs**: "Unirse al equipo", "Contactar líder"

## Development Phases (V0-friendly)

### Fase 1: Initial Setup
**Objetivo**: Configurar proyecto base con todas las dependencias

**Tareas**:
1. Crear proyecto Next.js 14 con App Router
2. Configurar Tailwind CSS y shadcn/ui
3. Instalar y configurar Supabase client
4. Crear estructura de carpetas base
5. Configurar variables de entorno (.env.local)

**Entregables**:
- Repositorio funcional con Next.js
- Variables .env.local con placeholders
- Página `/` mínima con "Núcleo" renderizada
- shadcn/ui configurado y funcionando

**Criterios de done**:
- `npm run dev` funciona sin errores
- Tailwind CSS aplicado correctamente
- shadcn/ui components instalados
- Supabase client configurado

### Fase 2: DB & Auth
**Objetivo**: Configurar base de datos y autenticación

**Tareas**:
1. Crear tablas en Supabase con RLS
2. Configurar políticas de seguridad
3. Crear datos seed mínimos
4. Implementar autenticación básica
5. Crear roles y permisos

**Entregables**:
- Scripts SQL para todas las tablas
- Políticas RLS configuradas
- Datos seed (3 anuncios, 2 eventos, 2 equipos)
- Autenticación funcionando
- Usuario demo para pruebas

**Criterios de done**:
- Lectura pública de eventos publicados funciona
- Escritura de event_registrations con usuario autenticado
- Roles admin/editor/miembro/invitado definidos
- Datos seed visibles en Supabase Studio

### Fase 3: Rutas & Data Fetching
**Objetivo**: Implementar todas las páginas principales

**Tareas**:
1. Crear páginas: `/quienes-somos`, `/anuncios`, `/anuncios/[slug]`
2. Crear páginas: `/eventos`, `/eventos/[slug]`, `/equipos`, `/contacto`
3. Crear páginas: `/registro`, `/iniciar-sesion`
4. Implementar data fetching con Supabase
5. Crear loaders y empty states

**Entregables**:
- Todas las páginas renderizando datos seed
- Data fetching optimizado con SSR donde aplique
- Estados de carga y vacío implementados
- Navegación entre páginas funcional

**Criterios de done**:
- Todas las rutas responden correctamente
- Datos se cargan desde Supabase
- Estados de error manejados
- Navegación fluida entre secciones

### Fase 4: UI Components & Forms
**Objetivo**: Implementar componentes UI y formularios funcionales

**Tareas**:
1. Crear Navbar y Footer
2. Implementar Cards para anuncios y eventos
3. Crear formularios de contacto y registro a eventos
4. Implementar validación con react-hook-form + zod
5. Configurar toasts de éxito/error

**Entregables**:
- Componentes UI reutilizables
- Formularios con validación completa
- Envío a Supabase funcionando
- Sistema de notificaciones (toasts)
- Control de capacidad y duplicados en eventos

**Criterios de done**:
- Formulario de contacto envía a Supabase
- Registro a eventos funciona con validaciones
- Toasts muestran feedback correcto
- Componentes responsive y accesibles

### Fase 5: Styling & Responsive
**Objetivo**: Implementar diseño visual completo y responsive

**Tareas**:
1. Implementar paleta de colores en Tailwind
2. Crear componentes con estados hover/focus
3. Implementar responsive design mobile-first
4. Configurar dark mode opcional
5. Implementar accesibilidad básica

**Entregables**:
- Diseño visual completo y consistente
- Responsive en todos los breakpoints
- Estados interactivos implementados
- Accesibilidad WCAG AA básica

**Criterios de done**:
- Lighthouse a11y score > 90
- Responsive en mobile, tablet, desktop
- Estados hover/focus visibles
- Contraste de colores adecuado

### Fase 6: SEO & Performance
**Objetivo**: Optimizar para SEO y rendimiento

**Tareas**:
1. Implementar metadata dinámica
2. Crear OG images y Twitter cards
3. Generar sitemap.xml
4. Optimizar imágenes y assets
5. Implementar caching estratégico

**Entregables**:
- SEO optimizado con metadata
- OG images generadas dinámicamente
- Sitemap.xml funcional
- Performance optimizada
- Caching de contenido público

**Criterios de done**:
- Lighthouse Performance > 90
- Lighthouse SEO > 90
- OG images funcionan en redes sociales
- Sitemap.xml generado correctamente

### Fase 7: Admin Lite (Opcional)
**Objetivo**: Panel de administración básico

**Tareas**:
1. Crear página `/admin` con tabs
2. Implementar CRUD para anuncios
3. Implementar CRUD para eventos
4. Implementar CRUD para equipos
5. Vista de registros de eventos

**Entregables**:
- Panel admin funcional
- CRUD completo para contenido
- Protección por roles
- Listas paginadas

**Criterios de done**:
- Solo admins/editors acceden
- CRUD funciona correctamente
- Validaciones implementadas
- UI intuitiva y responsive

### Fase 8: Deploy
**Objetivo**: Desplegar en Vercel y verificar funcionamiento

**Tareas**:
1. Configurar proyecto en Vercel
2. Configurar variables de entorno
3. Desplegar aplicación
4. Ejecutar smoke tests
5. Verificar flujos críticos

**Entregables**:
- URL pública funcionando
- Variables de entorno configuradas
- Smoke tests pasando
- Documentación de deploy

**Criterios de done**:
- Sitio accesible públicamente
- Autenticación funciona
- Formularios envían correctamente
- Performance aceptable en producción

## Esquema de Base de Datos (Supabase / Postgres)

### Tablas principales

```sql
-- Perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) DEFAULT 'miembro' CHECK (rol IN ('admin', 'editor', 'miembro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Anuncios
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido_rich TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  publicado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado VARCHAR(20) DEFAULT 'borrador' CHECK (estado IN ('borrador', 'publicado', 'archivado')),
  autor_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Eventos
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  descripcion_rich TEXT NOT NULL,
  fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
  ubicacion VARCHAR(255),
  capacidad INTEGER,
  fecha_limite_registro TIMESTAMP WITH TIME ZONE,
  esta_publicado BOOLEAN DEFAULT false,
  banner_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registros de eventos
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_id UUID REFERENCES events(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  estado VARCHAR(20) DEFAULT 'registrado' CHECK (estado IN ('registrado', 'cancelado', 'lista_espera')),
  registrado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notas TEXT,
  UNIQUE(evento_id, usuario_id)
);

-- Equipos/Ministerios
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion_rich TEXT NOT NULL,
  email_contacto VARCHAR(255),
  esta_activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mensajes de contacto
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Políticas RLS (Row Level Security)

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: usuarios pueden ver/editar su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Anuncios: lectura pública, escritura solo admin/editor
CREATE POLICY "Public can view published announcements" ON announcements
  FOR SELECT USING (estado = 'publicado');

CREATE POLICY "Admins and editors can manage announcements" ON announcements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND rol IN ('admin', 'editor')
    )
  );

-- Eventos: lectura pública de publicados, escritura admin/editor
CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (esta_publicado = true);

CREATE POLICY "Admins and editors can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND rol IN ('admin', 'editor')
    )
  );

-- Registros de eventos: usuarios pueden ver/crear sus propios registros
CREATE POLICY "Users can view own registrations" ON event_registrations
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "Users can create own registrations" ON event_registrations
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Users can update own registrations" ON event_registrations
  FOR UPDATE USING (usuario_id = auth.uid());

-- Equipos: lectura pública, escritura admin/editor
CREATE POLICY "Public can view active teams" ON teams
  FOR SELECT USING (esta_activo = true);

CREATE POLICY "Admins and editors can manage teams" ON teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND rol IN ('admin', 'editor')
    )
  );

-- Mensajes de contacto: inserción pública, lectura admin/editor
CREATE POLICY "Public can create contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins and editors can view contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND rol IN ('admin', 'editor')
    )
  );
```

## Rutas y páginas (Next.js App Router)

### Estructura de archivos

```
app/
├── (auth)/
│   ├── iniciar-sesion/
│   │   └── page.tsx
│   └── registro/
│       └── page.tsx
├── (public)/
│   ├── anuncios/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── eventos/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── equipos/
│   │   └── page.tsx
│   ├── quienes-somos/
│   │   └── page.tsx
│   └── contacto/
│       └── page.tsx
├── admin/
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

### Componentes por página

**Home (`/`)**
- `HeroSection` - Mensaje de bienvenida y CTA principal
- `LatestAnnouncements` - Últimos 3 anuncios publicados
- `UpcomingEvents` - Próximos 3 eventos
- `CallToAction` - Botones de acción principales

**Quiénes Somos (`/quienes-somos`)**
- `VisionMission` - Visión y misión de la iglesia
- `Values` - Valores fundamentales
- `PastoralTeam` - Equipo pastoral con fotos
- `Timeline` - Historia de la iglesia (opcional)

**Anuncios (`/anuncios`)**
- `AnnouncementsList` - Lista paginada de anuncios
- `SearchFilters` - Búsqueda y filtros por tags
- `AnnouncementCard` - Card individual de anuncio

**Anuncio Detalle (`/anuncios/[slug]`)**
- `AnnouncementDetail` - Contenido completo del anuncio
- `RelatedAnnouncements` - Anuncios relacionados
- `ShareButtons` - Botones de compartir

**Eventos (`/eventos`)**
- `EventsList` - Lista/calendario de eventos
- `EventFilters` - Filtros por fecha, categoría
- `EventCard` - Card individual de evento

**Evento Detalle (`/eventos/[slug]`)**
- `EventDetail` - Información completa del evento
- `RegistrationForm` - Formulario de registro
- `AttendeesList` - Lista de asistentes (si aplica)

**Equipos (`/equipos`)**
- `TeamsList` - Lista de ministerios/equipos
- `TeamCard` - Card individual de equipo
- `ContactForm` - Formulario de contacto por equipo

**Contacto (`/contacto`)**
- `ContactForm` - Formulario principal de contacto
- `ContactInfo` - Información de contacto
- `Map` - Ubicación de la iglesia (opcional)

**Autenticación**
- `LoginForm` - Formulario de inicio de sesión
- `RegisterForm` - Formulario de registro
- `AuthLayout` - Layout común para auth

## Componentes UI (shadcn/ui)

### Componentes base
- `Button` - Botones primarios, secundarios, outline
- `Card` - Cards para anuncios, eventos, equipos
- `Input` - Campos de texto con validación
- `Textarea` - Áreas de texto para mensajes
- `Select` - Dropdowns para filtros y selecciones
- `Badge` - Tags para categorías y estados
- `Avatar` - Fotos de perfil y equipo
- `Dialog` - Modales para confirmaciones
- `Toast` - Notificaciones de éxito/error
- `Skeleton` - Estados de carga

### Componentes específicos
- `Navbar` - Navegación principal con autenticación
- `Footer` - Pie de página con enlaces y contacto
- `Hero` - Sección hero con CTA
- `EventCalendar` - Vista de calendario para eventos
- `RegistrationForm` - Formulario de registro a eventos
- `ContactForm` - Formulario de contacto
- `SearchBar` - Búsqueda con autocompletado
- `Pagination` - Navegación de páginas
- `LoadingSpinner` - Indicador de carga
- `ErrorBoundary` - Manejo de errores

## Integración Supabase

### Variables de entorno
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SITE_URL=http://localhost:3000
```

### Helpers y configuración
```typescript
// lib/supabase/client.ts - Cliente para browser
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// lib/supabase/server.ts - Cliente para server
import { createClient } from '@supabase/supabase-js'

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

### Patrones de uso
- **SSR**: Para contenido público (anuncios, eventos, equipos)
- **Client-side**: Para formularios y autenticación
- **Edge caching**: Para contenido estático con revalidación
- **Optimistic updates**: Para registros de eventos

## Contenido y CMS ligero

### Estructura de contenido rico
Usar **Markdown** para `contenido_rich` con las siguientes opciones:
- Títulos (H1-H6)
- Listas (ordenadas y no ordenadas)
- Enlaces
- Imágenes con alt text
- Énfasis (negrita, cursiva)
- Citas
- Código inline

### Mecanismo de destacados
- **Home**: Últimos 3 anuncios publicados + próximos 3 eventos
- **Anuncios**: Sistema de tags para categorización
- **Eventos**: Filtros por fecha y estado de registro
- **Equipos**: Orden por actividad y popularidad

### Búsqueda y filtrado
- **Anuncios**: Por título, contenido, tags, fecha
- **Eventos**: Por fecha, ubicación, capacidad
- **Equipos**: Por nombre, descripción, estado

## Required Resources

### Branding (Solicitar al usuario)
- **Logo**: SVG/PNG en alta resolución (mínimo 512x512px)
- **Paleta de colores**: Confirmar o sugerir variaciones
- **Tipografías**: Confirmar Inter + Poppins o sugerir alternativas
- **Favicon**: Ícono para la pestaña del navegador

### Medios (Solicitar al usuario)
- **Fotos del equipo pastoral**: Mínimo 3-5 fotos profesionales
- **Banners para eventos**: Imágenes de fondo para eventos especiales
- **Fotos de la iglesia**: Interior y exterior para sección "Quiénes Somos"
- **Íconos**: Para ministerios y secciones (opcional, usar heroicons)

### Contenido (Solicitar al usuario)
- **Visión y misión**: Texto oficial de la iglesia
- **Valores**: Lista de valores fundamentales
- **Descripciones de equipos**: Información de cada ministerio
- **Primeros anuncios**: 3-5 anuncios de ejemplo
- **Primeros eventos**: 2-3 eventos de ejemplo
- **Información de contacto**: Dirección, teléfono, email

### Políticas (Solicitar al usuario)
- **Aviso de privacidad**: Política de manejo de datos
- **Términos de uso**: Condiciones del sitio web
- **Política de cookies**: Si aplica

### Correo (Opcional)
- **Email de contacto**: Para formularios y notificaciones
- **Provider de email**: Para notificaciones automáticas (futuro)

## Technical Considerations

### Next.js optimizaciones
- **App Router**: Usar server components donde sea posible
- **generateMetadata**: Metadata dinámica por página
- **revalidate**: Caching de contenido público (30 minutos)
- **Image optimization**: Usar next/image para todas las imágenes
- **Font optimization**: Precargar fuentes críticas

### Supabase mejores prácticas
- **RLS estricto**: Políticas de seguridad por defecto
- **Separación cliente/servidor**: Usar service role solo en server
- **Edge functions**: Para webhooks y procesamiento
- **Real-time**: Para actualizaciones en tiempo real (futuro)

### shadcn/ui configuración
- **Accesibilidad**: Componentes accesibles por defecto
- **Theming**: Sistema de tokens de color
- **Dark mode**: Soporte opcional
- **Responsive**: Mobile-first design

### Tailwind configuración
- **Design tokens**: Colores, espaciado, tipografía
- **Responsive**: Breakpoints estándar
- **Contraste**: Colores AA/AAA compliant
- **Performance**: Purge CSS optimizado

### Seguridad
- **Sanitización**: Limpiar rich text input
- **Rate limiting**: Proteger formularios
- **Validación**: Zod schemas para todos los inputs
- **CORS**: Configurar correctamente para Supabase

### Testing
- **Unit tests**: Utils y helpers
- **E2E tests**: Flujos críticos (login, registro evento, contacto)
- **Accessibility**: Tests con axe-core
- **Performance**: Lighthouse CI

## Final Checklist

### Funcionalidad
- [ ] Navegación completa en español con estados activos
- [ ] Home muestra últimos anuncios y próximos eventos
- [ ] CRUD operativo para admin/editor o definido para fase futura
- [ ] Registro a eventos con control de cupo/duplicados
- [ ] Formularios con validación y toasts
- [ ] RLS verificadas para cada rol

### Técnico
- [ ] SEO básico (title/description por página, OG)
- [ ] Sitemap.xml generado
- [ ] Accesibilidad: focus states, labels, contraste
- [ ] Performance optimizada (Lighthouse > 90)
- [ ] Responsive en todos los dispositivos

### Deploy
- [ ] Deploy en Vercel funcionando
- [ ] Variables de entorno configuradas
- [ ] URL pública accesible
- [ ] Smoke tests pasando

### Contenido
- [ ] Logo y branding implementado
- [ ] Contenido de ejemplo cargado
- [ ] Fotos del equipo integradas
- [ ] Información de contacto actualizada

---

**Nota**: Este plan está diseñado para ser ejecutado por fases, donde cada fase puede ser completada en una sola interacción con resultados testables. Los recursos marcados como "Solicitar al usuario" deben ser obtenidos antes de comenzar la implementación correspondiente.
