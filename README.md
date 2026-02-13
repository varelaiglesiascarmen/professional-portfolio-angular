# Profesional Portfolio — Angular

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8.0-0f62fe?logo=redux&logoColor=white)](https://rxjs.dev/)
[![SSR](https://img.shields.io/badge/SSR-enabled-brightgreen)](#)
[![Private](https://img.shields.io/badge/Repository-private-grey)](#)

## Tabla de contenidos

- [Introducción](#introducción)
- [Características principales](#características-principales)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura y decisiones técnicas](#arquitectura-y-decisiones-técnicas)
  - [Gestión de sesión (user$) — Importante](#gestión-de-sesión-users--importante)
- [Diagrama de flujo (Mermaid)](#diagrama-de-flujo-mermaid)
- [Estructura del proyecto (src/app)](#estructura-del-proyecto-srcapp)
- [Instalación local](#instalación-local)
  - [Requisitos previos](#requisitos-previos)
  - [Clonado e instalación](#clonado-e-instalación)
  - [Comandos de desarrollo](#comandos-de-desarrollo)
- [Notas operativas](#notas-operativas)
- [Roadmap (tareas)](#roadmap-tareas)
- [Referencias rápidas (código relevante)](#referencias-rápidas-código-relevante)

---

## Introducción

Proyecto técnico: Profesional Portfolio (Angular + SSR). Repositorio que implementa una aplicación Angular con Server-Side Rendering y una arquitectura reactiva basada en RxJS. Este proyecto es una migración desde una versión anterior implementada con Bootstrap 5 hacia una reimplementación en Angular, buscando mejorar la composabilidad de UI, la trazabilidad del estado y la testabilidad.

## Características principales

| Área | Descripción |
|------|-------------|
| SSR | Soporte SSR con `@angular/ssr`, `src/main.server.ts` y `server.ts` |
| Reactividad | RxJS para modelar flujos de datos y composición funcional de estados y efectos |
| Sesión | Gestión reactiva de sesión mediante `user$` en `auth.service.ts` |
| Componentes | Componentización modular en `src/app/components/` |
| Estilos | `styles.scss` global + SCSS por componente |

## Stack tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend | Angular 21 |
| UI | Bootstrap 5, bootstrap-icons |
| Reactividad / Estado | RxJS (~7.8.0) |
| SSR / Server | `@angular/ssr`, `express` |
| Herramientas | TypeScript ~5.9, Angular CLI, Prettier, Vitest |

## Arquitectura y decisiones técnicas

### Organización del código

- Código fuente en `src/` con `app/` que contiene rutas, configuración y `components/`.
- Entradas SSR: `src/main.server.ts` y `server.ts`.

### Reactividad como principio

- Los servicios exponen observables que modelan estado y eventos; los componentes consumen estos streams preferentemente con `AsyncPipe` o mediante suscripción controlada en `ngOnInit` para casos con side-effects.
- Se prioriza composición de streams (operadores RxJS) y control del ciclo de vida (takeUntil / take / firstValueFrom cuando aplique) para evitar fugas y condiciones de carrera.

### Gestión de sesión (user$) — Importante

> [!IMPORTANT]
> La sesión de usuario se modela mediante un observable central llamado `user$` expuesto por `auth.service.ts`. **`user$` funciona como Single Source of Truth (SSoT)** para todo lo relativo a autenticación en la aplicación: componentes, guards y servicios consumen este stream para reaccionar a cambios de estado de sesión.
>
> Ventajas prácticas:
> - Propagación reactiva y sincronizada del estado de usuario.
> - Composición segura con otros streams (ej. peticiones HTTP con token, refresh automático).
> - Facilita pruebas unitarias e integración al mockear el observable (BehaviorSubject en pruebas).

Mantener `user$` como SSoT reduce riesgos de estados inconsistentes y centraliza la lógica de invalidación/refresh de credenciales.

### Escalabilidad

- La estructura actual (servicios reactivos + componentes) está pensada para escalar hacia un store centralizado (NgRx) si fuese necesario; la migración sería incremental y localizada.

### SSR y despliegue

- El repositorio soporta build cliente/servidor. Para despliegue se recomienda separar hosting estático (cliente) de la capa SSR o usar plataformas que soporten Node (Vercel, Azure, etc.), ya que GitHub Pages no soporta SSR nativamente.

## Diagrama de flujo (Mermaid)

```mermaid
flowchart LR
  A[auth.service.ts\n(user$)] -->|emit user| B[Components]
  A -->|emit user| C[Guards]
  B --> D[UI templates\n(AsyncPipe)]
  C --> E[Route access]
  A -->|combineLatest| F[HTTP Service]
  F -->|authorized requests| G[API]
  subgraph notes [ ]
    note1((SSoT))
  end
  A --- note1
```

## Estructura del proyecto (`src/app`)

```text
src/app
├─ app.ts
├─ app.routes.ts
├─ app.routes.server.ts
├─ app.config.ts
├─ components
│  ├─ aboutMe
│  │  ├─ aboutMe.component.ts
│  │  ├─ aboutMe.component.html
│  │  └─ aboutMe.component.scss
│  ├─ contact
│  ├─ cv
│  ├─ footer
│  ├─ home
│  ├─ lenguage-selector
│  ├─ navbar
│  └─ projects
└─ services
   └─ auth.service.ts
```

> Nota: `services/auth.service.ts` contiene el observable `user$` que actúa como SSoT.

## Instalación local

### Requisitos previos

- Node.js LTS (recomendado): 18.x o 20.x
- npm (compatible con la versión de Node)
- Git

### Clonado e instalación

| Comando | Descripción |
|---------|-------------|
| `git clone <REPO_URL>` | Clonar repo |
| `cd profesional-portfolio-angular` | Entrar en carpeta |
| `npm install` | Instalar dependencias |

### Comandos de desarrollo

| Comando | Equivalente | Uso |
|---------|------------:|-----|
| `npm start` | `ng serve` | Servidor de desarrollo (live reload) |
| `npm test` | `ng test` | Pruebas unitarias |
| `npm run build` | `ng build` | Compilar aplicación (cliente) |
| `npm run serve:ssr:profesional-portfolio-angular` | — | Servir build SSR mediante Node/Express |
| `npm run watch` | `ng build --watch --configuration development` | Recompilación en watch (útil para SSR iterativo) |

```bash
# ejemplo rápido
git clone <REPO_URL>
cd profesional-portfolio-angular
npm install
npm start
```

## Notas operativas

- Para desarrollo SSR iterativo: usar `npm run watch` y reiniciar el servidor SSR cuando sea necesario.
- Verificar la versión de Node con `node -v` si aparecen errores de compilación.

## Roadmap (tareas)

- [x] Desarrollo local y SSR habilitado
- [ ] Integración CI/CD (GitHub Actions) para build, tests y despliegue
- [ ] End-to-end tests (Playwright / Cypress)
- [ ] Auditoría de accesibilidad y optimizaciones de performance
- [ ] Evaluación de migración parcial a NgRx si el dominio lo requiere
- [ ] Harden de autenticación y adaptadores para proveedores (OAuth2 / JWT)

## Referencias rápidas (código relevante)

- `src/main.server.ts`
- `server.ts`
- `src/app/` (rutas y componentes)
- `auth.service.ts` (expone `user$` como observable central de sesión)
