# ✨ RENACER

[![CI/CD Pipeline for Next.js](https://github.com/AlonsoErnesto/nextjs-mvp.v0.1/actions/workflows/cd-cd.yml/badge.svg?branch=main)](https://github.com/AlonsoErnesto/nextjs-mvp.v0.1/actions/workflows/cd-cd.yml)

**RENACER** es una aplicación web cristiana cuyo propósito es conectar a personas que atraviesan crisis emocionales, sociales o espirituales (denominadas _siervos_) con personas capacitadas en la fe cristiana y guía espiritual (_pastores_). Esta plataforma busca generar un espacio seguro, de ayuda, contención y crecimiento espiritual.

---

## 🙏 Propósito

El objetivo de RENACER es ser un puente entre quienes buscan una salida a sus problemas existenciales y quienes pueden brindarles una palabra de aliento, una escucha activa y guía basada en la Biblia y la espiritualidad cristiana.

---

## 👥 Roles

- **Siervos**: Personas que necesitan orientación, compañía o apoyo espiritual.
- **Pastores**: Personas con conocimiento bíblico, fe sólida y madurez emocional, dispuestas a guiar y aconsejar.

---

## 🎯 Funcionalidades principales (MVP)

- Registro e inicio de sesión con Clerk.
- Elección de rol: _Siervo_ o _Pastor_.
- Video llamadas o llamadas de voz de 10 minutos entre Pastores y Siervos (limitado por diseño MVP).
- Match aleatorio para iniciar una conversación con un usuario del otro rol.
- Sistema de seguimiento para mantener contacto con el Pastor después de una sesión.
- Envío de mensajes (una vez seguido al Pastor).
- Publicaciones y reflexiones por parte de los Pastores (tipo feed/post).
- Validación de Pastores antes de permitirles acceso (manual o con formulario/verificación).
- Pantalla de privacidad para el Pastor (modo "censura") si recibe contenido ofensivo o sensible.
- Soporte para español (orientado a usuarios de LATAM).

---

## 🧠 Stack Tecnológico

| Categoría          | Tecnología                                                                           |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Framework**      | [Next.js](https://nextjs.org/) (App Router)                                          |
| **Librerías UI**   | [shadcn/ui](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/)         |
| **Estado global**  | [Zustand](https://zustand-demo.pmnd.rs/)                                             |
| **Auth**           | [Clerk](https://clerk.dev/)                                                          |
| **ORM**            | [Prisma](https://www.prisma.io/) _(sugerido)_                                        |
| **Validación**     | [Zod](https://zod.dev/) o [Yup](https://github.com/jquense/yup)                      |
| **Async**          | [TanStack Query](https://tanstack.com/query/latest)                                  |
| **Media**          | [Cloudinary](https://cloudinary.com/)                                                |
| **Metadata y SEO** | Soporte automatizado con Next.js                                                     |
| **Errores**        | [Sentry](https://sentry.io/)                                                         |
| **Base de datos**  | Por definir _(sugerencia: Supabase o PlanetScale)_                                   |
| **Storage**        | [Firebase](https://firebase.google.com/) para datos adicionales                      |
| **CI/CD**          | [Vercel](https://vercel.com/), [GitHub Actions](https://github.com/features/actions) |
| **Arquitectura**   | Modular por dominios (estructura en carpetas)                                        |

---

## 🎥 Tecnología recomendada para llamadas

Se sugiere usar **WebRTC** para las llamadas y videollamadas, ya que:

- Es **gratuito** y **peer-to-peer**.
- Permite personalización total.
- Escalable para MVP sin costos ocultos.
- Puede combinarse con [Firebase Realtime Database] o [Socket.IO] para signaling.

Servicios alternativos como [Agora](https://www.agora.io/) o [Twilio] son más fáciles de implementar pero **no gratuitos** a largo plazo.

---

## 📁 Estructura recomendada de carpetas

/src
┣ /app # Estructura principal de Next.js App Router
┃ ┣ /(auth)/ # Rutas protegidas/autenticación agrupadas
┃ ┃ ┣ /login/ # Página de inicio de sesión
┃ ┃ ┣ /register/ # Registro (con opción para elegir siervo/pastor)
┃ ┃ ┗ layout.tsx # Layout compartido para rutas de auth
┃ ┃
┃ ┣ /(dashboard)/ # Área de usuario logueado
┃ ┃ ┣ /siervo/ # Rutas específicas para siervos
┃ ┃ ┃ ┣ /buscar/ # Buscar pastores
┃ ┃ ┃ ┗ /perfil/ # Perfil del siervo
┃ ┃ ┣ /pastor/ # Rutas específicas para pastores
┃ ┃ ┃ ┣ /buscar/ # Buscar siervos
┃ ┃ ┃ ┗ /perfil/ # Perfil del pastor
┃ ┃ ┣ /mensajes/ # Sistema de mensajería
┃ ┃ ┣ /llamadas/ # Historial de llamadas
┃ ┃ ┗ layout.tsx # Layout compartido del dashboard
┃ ┃
┃ ┣ /api/ # API Routes de Next.js
┃ ┃ ┣ /auth/ # Endpoints de autenticación
┃ ┃ ┣ /users/ # Gestión de usuarios
┃ ┃ ┣ /messages/ # API de mensajería
┃ ┃ ┣ /calls/ # API de llamadas
┃ ┃ ┗ /webhooks/ # Webhooks (para Twilio, etc.)
┃ ┃
┃ ┣ globals.css # Estilos globales
┃ ┣ layout.tsx # Layout raíz con providers
┃ ┗ page.tsx # Página principal/landing
┃
┣ /components # Componentes reutilizables
┃ ┣ /ui/ # Componentes UI básicos (ShadCN)
┃ ┃ ┗ button.tsx
┃ ┣ /auth/ # Componentes de autenticación
┃ ┃ ┣ login-form.tsx
┃ ┃ ┗ register-form.tsx
┃ ┣ /calls/ # Componentes de videollamada/voz
┃ ┃ ┣ video-call.tsx
┃ ┃ ┗ voice-call.tsx
┃ ┣ /common/ # Header, Footer, etc.
┃ ┃ ┣ header.tsx
┃ ┃ ┗ footer.tsx
┃ ┣ /dashboard/ # Elementos del dashboard
┃ ┃ ┣ sidebar.tsx
┃ ┃ ┗ user-nav.tsx
┃ ┗ /forms/ # Componentes de formularios
┃ ┗ input-field.tsx
┃
┣ /lib # Utilidades y configuración
┃ ┣ utils.ts # Funciones utilitarias
┃ ┣ /schemas/ # Validaciones con Zod
┃ ┃ ┣ auth.schema.ts
┃ ┃ ┗ user.schema.ts
┃ ┗ /configs/ # Configuración externa
┃ ┣ sentry.ts
┃ ┗ metadata.ts
┃
┣ /hooks # Custom Hooks
┃ ┣ use-auth.ts
┃ ┣ use-calls.ts
┃ ┗ use-search.ts
┃
┣ /features # Lógica separada por funcionalidad
┃ ┣ /auth/
┃ ┃ ┣ /components/
┃ ┃ ┣ /hooks/
┃ ┃ ┗ store.ts
┃ ┣ /calls/
┃ ┃ ┣ /components/
┃ ┃ ┣ /hooks/
┃ ┃ ┗ store.ts
┃ ┣ /messaging/
┃ ┃ ┣ /components/
┃ ┃ ┣ /hooks/
┃ ┃ ┗ store.ts
┃ ┗ /profiles/
┃ ┣ /components/
┃ ┣ /hooks/
┃ ┗ store.ts
┃
┣ /stores # Zustand Stores globales
┃ ┣ auth-store.ts
┃ ┣ user-store.ts
┃ ┗ call-store.ts
┃
┣ /services # Servicios de conexión con APIs
┃ ┣ api.ts
┃ ┣ auth-service.ts
┃ ┣ user-service.ts
┃ ┣ call-service.ts
┃ ┗ message-service.ts
┃
┣ /types # Tipos de datos TypeScript
┃ ┣ user.types.ts
┃ ┣ call.types.ts
┃ ┗ message.types.ts
┃
┣ /prisma # Prisma ORM
┃ ┣ schema.prisma
┃ ┗ /migrations/
┃
┣ /public # Archivos estáticos públicos
┃ ┣ /images/
┃ ┗ /icons/
┃
┣ middleware.ts # Middleware para rutas protegidas
┣ next.config.ts # Configuración de Next.js
┣ package.json # Dependencias del proyecto
┗ tsconfig.json # Configuración de TypeScript

---

## 🚧 Estado del proyecto

> RENACER está en fase de desarrollo MVP. Aún no se incluyen pruebas automatizadas ni funcionalidades de denuncias, priorizando la seguridad emocional y privacidad de los usuarios.

---

## 🌱 Mejoras futuras

- Extensión de tiempo en llamadas (hasta 1 hora).
- Modo multi-idioma (ES/EN).
- Implementación de tests unitarios y e2e.
- Feed más avanzado para reflexiones cristianas.
- Notificaciones en tiempo real.
- Aplicación móvil (React Native o Expo).
- Roles adicionales: Administrador y Psicólogo espiritual.

---

## 🤝 Contribuciones

Este es un proyecto con una misión social, espiritual y tecnológica. Se aceptan contribuciones con respeto, fe y profesionalismo. Puedes abrir un issue o enviar un pull request.

---

## 📜 Licencia

Este proyecto aún no tiene licencia definida.

---

## ✝️ Inspiración

> “Porque yo sé los planes que tengo para ustedes —afirma el Señor—, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.”
> — Jeremías 29:11

## Devs

1. Steps for dev

   1.1 Shadcn

   ```shell

    bunx --bun x shadcn@latest init
    bun x --bun shadcn@latest add button

   ```
