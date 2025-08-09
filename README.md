# Prompt Inicial para Desarrollo Escalonado y Seguro con GPT-5 (Windsurf / Cursor)

## Contexto del Proyecto

Desarrollar una **App Musical Interactiva Asistida por IA** para músicos avanzados, combinando:

- **Análisis armónico, melódico y estructural** de partituras (MusicXML / MIDI).
- **Feedback técnico e interpretativo en tiempo real**.
- **Visualización musical interactiva** con resaltado dinámico y anotaciones.
- **Integración de modelos de lenguaje y generación musical** (MuseNet, MusicGen, MusicBERT, etc.).
- **Stack base**: Next.js (frontend), Strapi (backend de contenidos), FastAPI (servicios de IA), Docker para orquestación.

Basado en el documento de referencia técnico, este prompt servirá como **inicializador** para trabajar con GPT-5 en un entorno de desarrollo autónomo, iterativo y seguro.

---

## Reglas y Alcance

1. **Ejecución Escalonada**:

   - Dividir el desarrollo en **módulos autocontenidos**.
   - Cada entrega debe incluir **código funcional**, **tests**, **documentación mínima** y **pasos de despliegue**.
   - Integrar gradualmente funciones críticas, validando performance y compatibilidad.

2. **Prioridad de Desarrollo** (fase inicial):

   1. Configuración base del repositorio y estructura monorepo (frontend, backend Node.js, backend Python).
   2. Implementación de visualización de partituras con **OpenSheetMusicDisplay (OSMD)** y soporte MusicXML.
   3. Módulo básico de reproducción con **Tone.js** + control de tempo.
   4. Captura de entrada MIDI usando **Web MIDI API**.
   5. Backend en **FastAPI** para análisis armónico básico usando **music21**.

3. **Seguridad y Estabilidad**:

   - Uso de **TypeScript** en frontend/backend Node.
   - Linting y formateo estrictos (ESLint + Prettier).
   - Tests unitarios y de integración (Jest / Pytest).
   - Validación de entradas y sanitización de datos.

4. **Interacción con GPT-5**:

   - GPT-5 actuará como **arquitecto, implementador y documentador**.
   - Al iniciar cada iteración, GPT-5 debe:

     1. Revisar el estado actual del repositorio.
     2. Proponer un plan incremental.
     3. Entregar el código listo para integración.
     4. Sugerir tests y métricas de validación.

5. **Entregables por Iteración**:

   - Código funcional en carpetas correspondientes.
   - Documentación en `docs/` con instrucciones claras.
   - Actualización de `CHANGELOG.md`.

---

## Objetivo de la Primera Iteración

1. **Bootstrap del proyecto**:

   - Crear monorepo con **Turborepo**.
   - Paquetes: `frontend` (Next.js + TailwindCSS + OSMD + Tone.js), `backend-node` (Strapi), `backend-python` (FastAPI + music21).
   - Configuración de Docker Compose para levantar todo el stack localmente.
   - Setup inicial de ESLint, Prettier, Husky (pre-commit opcional) y tests básicos.

2. **Validación Inicial**:

   - Frontend sirviendo una página `/score` que cargue y muestre un MusicXML de ejemplo.
   - Backend Python respondiendo en `/analyse` con análisis armónico simple.
   - Comunicación frontend ↔ backend vía API interna.

---

## Instrucciones a GPT-5 para Windsurf / Cursor

- Mantener **compatibilidad multiplataforma** (Windows, macOS, Linux).
- Optimizar para **desarrollo local rápido** con hot reload.
- Cada commit debe ser **atomic y descriptivo**.
- Sugerir mejoras técnicas sin salirse del alcance actual.
- Validar dependencias y evitar paquetes innecesarios.

---

¿Siguiente paso? **Iteración 1: Bootstrap del monorepo y stack base**.
