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

- **Email:** `njrmancia@gmail.com`
- **UID:** `fokfln8kLqhEXAZCdibxZ52ELF22`
- **Password:** ver `.admin-pwd.txt` (NO commiteado).

## Datos de los invitados

25 grupos, 67 personas en total. Ver `links-whatsapp.md` para la lista completa con sus links únicos.
