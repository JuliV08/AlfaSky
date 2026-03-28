# Alfa Sky — Documentación del Proyecto

## Resumen

Sitio web institucional de **Alfa Sky**, operador aéreo premium argentino. Ofrece vuelos privados, charters y soluciones aéreas para cuatro verticales: Gobierno/Estado, Empresas, Sanitarios y Ejecutivo.

- **URL producción:** [alfasky.com.ar](https://alfasky.com.ar)
- **Repo:** [github.com/JuliV08/AlfaSky](https://github.com/JuliV08/AlfaSky)
- **Deploy:** GitHub Pages (rama `main` → Actions → `out/`) + Cloudflare como CDN/proxy
- **Dev local:** `npm run dev` → `localhost:3000`

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 3 + CSS modules |
| i18n | next-intl 4 |
| Animaciones | Framer Motion 12, GSAP 3 |
| 3D / WebGL | Three.js 0.167, @react-three/fiber, @react-three/drei, OGL 1 |
| UI | Radix UI, shadcn, Lucide React |
| Fonts | Inter + Sora (self-hosted en `/public/fonts/`) |
| Export | `output: "export"` (sitio estático puro, sin servidor) |

---

## Estructura de rutas (App Router)

```
src/app/
├── layout.tsx                  # Root layout: fonts, flash-shield, GlobalCursorWrapper
├── globals.css                 # Design system global (tokens CSS, clases utilitarias)
├── (es)/                       # Route group — sitio en español (URL sin prefijo)
│   ├── layout.tsx              # next-intl provider con locale "es"
│   ├── page.tsx                # Home ES
│   ├── privacy/page.tsx        # Política de privacidad ES
│   └── servicios/
│       ├── ejecutivo/page.tsx
│       ├── empresas/page.tsx
│       ├── estado/page.tsx
│       └── sanitarios/page.tsx
└── en/                         # Sitio en inglés (URL con prefijo /en/)
    ├── layout.tsx              # next-intl provider con locale "en"
    ├── page.tsx                # Home EN
    ├── privacy/page.tsx
    └── servicios/
        ├── ejecutivo/page.tsx
        ├── empresas/page.tsx
        ├── estado/page.tsx
        └── sanitarios/page.tsx
```

> **Nota i18n:** El grupo `(es)` NO agrega segmento a la URL. El idioma se detecta por `pathname.startsWith('/en')`. Las traducciones están en `messages/es.json` y `messages/en.json`.

---

## Secciones de la Home (en orden de aparición)

| Componente | Sección | Descripción |
|---|---|---|
| `LoadingOverlay.tsx` | Pantalla de carga | Overlay animado con logo + barra de progreso. Se elimina del DOM al cargar. |
| `HeroSection.tsx` | Hero | Fondo imagen cielo, logo con next/image, orbe WebGL interactivo, CTA. |
| `ServicePanels.tsx` | Servicios (cards) | 4 cards con imagen y link a sección de detalle. Fondo con DotGrid interactivo. |
| `ServiceDetails.tsx` | Servicios (detalle) | Alternando imagen/texto para cada uno de los 4 servicios. Links a subpáginas. |
| `WhyAlfaSky.tsx` | Por qué Alfa Sky | Stepper de 3 pasos con imágenes `.webp`. |
| `FleetSection.tsx` | Flota | Cards de aeronaves con modal de detalle `FleetModal.tsx`. |
| `ProcessSection.tsx` | Proceso | Pasos del proceso de contratación. |
| `ContactSection.tsx` | Contacto | Formulario que abre WhatsApp, card de WA directo, card de email. |
| `LocationSection.tsx` | Ubicación | Dirección + links a Google Maps y Waze. |
| `Footer.tsx` | Footer | Logo, descripción, links legales, redes. |

---

## Componentes clave

### `PillNav.tsx`
Navbar flotante tipo "pill" en la parte superior. Contiene:
- Logo/isotipo (`FaviconTransparent.png`) con animación GSAP al hover
- Links de sección (anclas `#servicios`, `#flota`, etc.)
- `LanguageSelector.tsx` para cambiar ES/EN
- Detección de subpágina (`isSubPage`) para ajustar links al volver al home

### `OptimizedImage.tsx`
Wrapper de `<picture>` nativo que sirve imágenes en formato AVIF → WebP → JPG.
**No usa `next/image`**. Recibe `basePath` sin extensión, ej: `basePath="/media/home/hero-bg-d"`.

### `ServicePageContent.tsx`
Componente genérico para las 4 páginas de servicio. Recibe `serviceKey` e `imagePath`. Contiene accordions de características, galería y CTA con WhatsApp.

### `Orb.tsx` (home)
Canvas WebGL con shader GLSL que renderiza el orbe metálico animado del hero. Usa la librería OGL. El shader aplica un fade radial (`1.0 - smoothstep(...)`) para evitar el artefacto de "caja gris" en los bordes del canvas sobre fondos claros.

### `FlashShieldRemover.tsx`
Componente client-side que remueve el `div#flash-shield` del DOM al montar React.
El flash-shield es un div estático en `layout.tsx` que previene FOUC.

> ⚠️ **ADVERTENCIA CRÍTICA:** Debido a este componente, **NO usar `<Link>` de next/link para navegar entre páginas distintas**. Causa errores de hidratación de React (`NotFoundError: insertBefore/removeChild`). Siempre usar `<a href>` para navegación entre páginas (fuerza recarga completa). `<Link>` solo es OK para anclas dentro de la misma página o si se remueve el FlashShieldRemover.

---

## Assets — `/public/`

```
public/
├── assets/ui/              # Logo.png, LogoTransparent.png, Favicon.png, FaviconTransparent.png
├── fonts/                  # Inter y Sora en .woff2 (self-hosted)
├── media/
│   ├── home/               # hero-bg-d/m, panel-*-d/m, why-*.webp
│   ├── services/           # {ejecutivo,empresas,estado,sanitarios}/secondary.*
│   ├── fleet/              # Imágenes de aeronaves
│   ├── verticals/          # Imágenes por vertical de negocio
│   └── academy/            # (reservado para futura sección)
├── robots.txt
├── sitemap.xml
└── CNAME                   # Contiene: "alfasky.com.ar"
```

Las imágenes de sección existen en 3 formatos: `.avif` → `.webp` → `.jpg` (prioridad decreciente en `<picture>`). Versiones desktop (`-d`) y mobile (`-m`) donde aplica.

---

## Internacionalización (next-intl)

- **Archivos:** `messages/es.json` y `messages/en.json`
- **Namespaces principales:** `nav`, `hero`, `panels`, `services`, `why`, `fleet`, `process`, `contact`, `location`, `footer`
- **Uso en client:** `useTranslations("namespace")`
- **Uso en server:** `getTranslations("namespace")`
- **Detección de idioma en componentes:** `useLocale()` → `"es"` o `"en"`
- **Construir paths de navegación:** `const prefix = locale === 'es' ? '' : '/en'`

---

## Formulario de contacto (WhatsApp)

`ContactSection.tsx` useState controla los campos name/email/message. Al hacer submit, arma un mensaje y abre `wa.me`:

```
Buenas, me comunico desde el sitio web de Alfa Sky.

*Nombre:* {nombre}
*Email:* {email}      ← campo opcional

*Consulta:*
{mensaje}
```

- **Número WA:** `5491135151981` (+54 9 11 3515-1981) — constante `WA_NUMBER` en `ContactSection.tsx`
- Botón submit con gradiente verde WhatsApp (`#25D366` → `#128C7E`)
- Email pendiente de implementar con Resend o EmailJS (sin backend requerido)

---

## Deploy / CI-CD

**`.github/workflows/deploy.yml`:**
1. Push a `main` → trigger automático
2. `npm ci && npm run build` → genera carpeta `out/`
3. Deploy de `out/` a rama `gh-pages` → GitHub Pages lo sirve

**`next.config.ts`:**
```ts
const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
};
```
> Sin `basePath` — el sitio sirve desde la raíz gracias al dominio personalizado.

**Infraestructura:**
- DNS en Cloudflare: registros A apuntan a IPs de GitHub Pages, proxy naranja (orange cloud) activo
- SSL/TLS Cloudflare: modo **"Full"** (no Strict), "Always Use HTTPS" activado, "Automatic HTTPS Rewrites" activado
- GitHub Pages: custom domain `alfasky.com.ar`, "Enforce HTTPS" activado

---

## Convenciones CSS

Clases utilitarias definidas en `globals.css`:

| Clase | Uso |
|---|---|
| `btn-primary` | Botón azul principal con gradiente |
| `btn-secondary` | Botón outline secondary |
| `section-padding` | Padding estándar de sección (py-20 md:py-32 px-6) |
| `premium-border` | Borde con gradiente sutil y sombra |
| `service-pill` | Pill/badge de característica de servicio |
| `section-bg-glow` | Resplandor sutil de fondo para secciones |
| `glass-card` | Card con efecto glassmorphism |

---

## Pendientes / próximas features

- [ ] Envío de formulario por **email** (Resend / EmailJS — sin backend)
- [ ] Completar sección **Academy** (`/media/academy/`)
- [ ] **SEO**: Open Graph images únicas por página de servicio
- [ ] **PWA** / manifest.json
- [ ] Revisar si se puede reemplazar `FlashShieldRemover` con `suppressHydrationWarning` para habilitar client-side navigation con `<Link>`
