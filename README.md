# Cumple de Santiago — Invitación web

Invitación digital personalizada para los **2 años de Santiago**.
Sábado 30 de mayo, 2026 — Hotel Plaza Sonsonate.

## Stack

- **Frontend:** HTML/CSS/JS vanilla (single-page, sin build step)
- **Backend:** Firebase Realtime Database (us-central1)
- **Hosting:** GitHub Pages

## Estructura

```
santiago-cumple/
├─ index.html              # UI completa (HTML + CSS + JS modular en línea)
├─ firebase-config.js      # Conexión a RTDB (módulo ES)
├─ firebase.json           # Config de Firebase CLI
├─ .firebaserc             # Proyecto activo
├─ database.rules.json     # Reglas de seguridad RTDB
├─ links-whatsapp.md       # Links únicos por grupo + plantillas wa.me
└─ README.md
```

## Firebase

- **Proyecto:** `santiago-cumple-zvx85q`
- **RTDB:** `santiago-cumple-zvx85q-default-rtdb` (us-central1)
- **Console:** https://console.firebase.google.com/project/santiago-cumple-zvx85q/overview

### Estructura de datos

```
/evento
  ├─ nombreCumple, edad
  ├─ fecha, fechaTexto, hora
  ├─ lugar, mapsUrl
  └─ totalInvitados, totalGrupos

/invitados/{id}
  ├─ nombre, telefono, genero
  ├─ personasMax
  ├─ estado: pendiente | confirmado | declinado
  ├─ personasConfirmadas (0..personasMax)
  ├─ respondidoEn (timestamp ms o null)
  └─ creadoEn (timestamp ms)

/admin
  └─ (espacio para administración futura)
```

### Reglas de seguridad

- `/evento` — lectura pública, escritura solo admin.
- `/invitados/{id}` — lectura pública si conoces el `id`. Listado bloqueado para público (solo admin puede listar `/invitados`).
- `/invitados/{id}` — escritura pública limitada a `estado`, `personasConfirmadas`, `respondidoEn`. Cambiar `nombre`, `telefono`, `personasMax`, `genero`, `creadoEn` requiere admin. Crear/borrar invitados solo admin.
- `personasConfirmadas` valida `0 <= n <= personasMax`.
- `estado` valida valores enum (`pendiente | confirmado | declinado`).
- `/admin` — solo admin.

Re-deploy reglas:

```powershell
firebase deploy --only database
```

## Deploy del frontend

GitHub Pages desde `main` branch, root.

URL pública: **https://njar97.github.io/santiago-cumple/?id=XXX**

Cada link incluye un `id` único de 8 caracteres alfanuméricos (sin caracteres ambiguos `0/O/1/l/I`).

## Lógica adaptativa

| `personasMax` | Banner cupos | Botones | Copy |
|---|---|---|---|
| 1 | oculto | Sí asistiré · No podré ir | singular según `genero` (m/f) |
| 2 | "2 lugares reservados" | Sí los 2 · Solo iré 1 · No podremos ir | plural |
| 3+ | "N lugares reservados" | Sí los N · Sí pero seremos menos · No podremos ir | plural |

El botón "menos" abre un selector ± con rango `1..max-1`.

## Admin

URL: **https://njar97.github.io/santiago-cumple/admin.html**

Login Firebase Auth con:
- **Email:** `njrmancia@gmail.com`
- **UID:** `fokfln8kLqhEXAZCdibxZ52ELF22`
- **Password:** ver `.admin-pwd.txt` (NO commiteado).

### Funciones del admin

- **Stats en vivo:** confirmados / no asistirán / pendientes / WhatsApp enviados, con barra de progreso de respuestas y conteo de personas.
- **Lista de invitados** con sync en tiempo real (RTDB `onValue`). Filtros (todos / pendientes / confirmados / no asistirán / no enviados / enviados) y búsqueda por nombre.
- **Enviar WhatsApp** por invitado: abre `wa.me/<telefono>` con el mensaje pre-encodeado y marca `enviadoEn = Date.now()`. Si el invitado no tiene teléfono, abre `wa.me/` y WhatsApp pregunta a quién mandárselo.
- **Re-enviar / Des-marcar como enviado** disponible si ya estaba enviado.
- **Copiar link** único del invitado al clipboard.
- **Editar** nombre, teléfono, `personasMax`, género (modal).
- **Agregar invitado:** genera ID único de 8 chars sin caracteres ambiguos, mismo formato que los originales.
- **Eliminar** con confirmación.

### Campo nuevo en RTDB

```
/invitados/{id}
  └─ enviadoEn: timestamp ms | null

/admins/{uid}
  ├─ email
  ├─ nombre
  └─ agregado: timestamp ms
```

### Modelo de permisos

Todas las reglas que antes hardcodeaban el UID admin ahora consultan `/admins/{auth.uid}`:

```
auth != null && (
  auth.uid === 'fokfln8kLqhEXAZCdibxZ52ELF22'   // legacy fallback
  || root.child('admins').child(auth.uid).exists()
)
```

El UID legacy queda como fallback de rescate. La primera vez que el admin original entra, el `admin.html` auto-migra su UID al nodo `/admins`. Después se gestionan desde el botón **⚙️ Ajustes** del panel.

Para sumar a otro admin:
1. Crear su cuenta en [Firebase Auth](https://console.firebase.google.com/project/santiago-cumple-zvx85q/authentication/users) (Add user → email + password).
2. Copiar el UID que Firebase genera.
3. En el admin → ⚙️ Ajustes → Administradores → **+ Agregar admin** → pegar UID + email + nombre.

Para cambiar la propia contraseña: ⚙️ Ajustes → Cambiar mi contraseña (re-auth con la actual + setea nueva).

Normalización de teléfonos en envío WhatsApp: si tiene 8 dígitos se asume `+503`. Se aceptan formatos con espacios, guiones o paréntesis.

## Datos de los invitados

25 grupos, 67 personas en total. Ver `links-whatsapp.md` para la lista completa con sus links únicos.
