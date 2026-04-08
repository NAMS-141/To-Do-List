# 📝 To-Do List App

Aplicación móvil de gestión de tareas desarrollada con **React Native + Expo**, que permite realizar operaciones CRUD completas conectadas a una API REST externa.

---

## 🚀 Tecnologías utilizadas

- [React Native](https://reactnative.dev/) — Framework para desarrollo móvil multiplataforma
- [Expo](https://expo.dev/) — Plataforma y herramientas para React Native
- [Expo Router](https://expo.github.io/router/) — Navegación basada en sistema de archivos (file-based routing)
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático sobre JavaScript
- `fetch` API — Para comunicación HTTP con el backend

---

## 📁 Estructura del proyecto

```
TO-DO-LIST/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Layout de las tabs principales
│   │   ├── explore.tsx       # Pantalla de exploración
│   │   └── index.tsx         # Pantalla principal (lista de tareas)
│   └── tasks/
│       ├── [id].tsx          # Detalle de una tarea
│       ├── edit.tsx          # Formulario crear / editar tarea
│       ├── _layout.tsx       # Layout del stack de tareas
│       └── modal.tsx         # Modal auxiliar
├── assets/                   # Imágenes y recursos estáticos
├── components/               # Componentes reutilizables
├── constants/                # Constantes globales
├── hooks/                    # Custom hooks
├── scripts/                  # Scripts utilitarios
├── services/
│   └── taskService.ts        # Capa de comunicación con la API
├── app.json                  # Configuración de Expo
├── expo-env.d.ts             # Tipos de entorno Expo
└── package.json
```

---

## ⚙️ Instalación y ejecución

### Requisitos previos

- Node.js >= 18
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo físico con la app **Expo Go** o un emulador Android/iOS configurado

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NAMS-141/To-Do-List.git
cd To-Do-List

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu dispositivo móvil, o presiona `a` para abrir en emulador Android, `i` para iOS.

### Configuración de la API

En el archivo `services/taskService.ts`, asegúrate de que la variable `API_URL` apunte a la dirección IP correcta de tu servidor backend:

```typescript
const API_URL = "http://<TU_IP_LOCAL>:3000/todos";
```

> ⚠️ El dispositivo móvil y la computadora con el backend deben estar conectados a la **misma red Wi-Fi**.

---

## 🔌 Endpoints consumidos

La aplicación se comunica con una API REST en `http://<IP>:3000/todos`.

| Método | Endpoint     | Descripción                    |
| ------ | ------------ | ------------------------------ |
| GET    | `/todos`     | Obtener todas las tareas       |
| GET    | `/todos/:id` | Obtener una tarea por ID       |
| POST   | `/todos`     | Crear una nueva tarea          |
| PUT    | `/todos/:id` | Actualizar una tarea existente |
| DELETE | `/todos/:id` | Eliminar una tarea             |

### Estructura de una tarea (Task)

```json
{
  "id": 1,
  "title": "Título de la tarea",
  "description": "Descripción opcional",
  "completed": false
}
```

---

## ✅ Funcionalidades implementadas

- **Listar tareas** — Pantalla principal con todas las tareas obtenidas desde la API
- **Ver detalle** — Al tocar una tarea se muestra su información completa
- **Crear tarea** — Formulario para agregar una nueva tarea con título, descripción y estado
- **Editar tarea** — El mismo formulario se reutiliza para actualizar una tarea existente
- **Eliminar tarea** — Botón de eliminación en la pantalla de detalle
- **Toggle de estado** — Cambia el estado `completed` de una tarea entre pendiente y completada

---

## 🗂️ Descripción de pantallas

### `index.tsx` — Lista de tareas

Pantalla principal que carga todas las tareas al entrar en foco usando `useFocusEffect`. Muestra una `FlatList` con el título y estado de cada tarea. Incluye botón para crear una nueva tarea.

### `[id].tsx` — Detalle de tarea

Muestra el título, descripción y estado de una tarea específica. Permite cambiar el estado (toggle), editar o eliminar la tarea.

### `edit.tsx` — Crear / Editar tarea

Formulario con campos para título, descripción y estado. Detecta automáticamente si se está creando o editando según la presencia del parámetro `id` en la ruta.

### `taskService.ts` — Servicio de API

Capa de abstracción que centraliza todas las llamadas HTTP al backend usando la `fetch` API nativa. Exporta las funciones: `getTasks`, `getTaskById`, `createTask`, `updateTask` y `deleteTask`.

---

## Realizado por:

Nery Antonio Mata Salas

