# DentalPro 🦷

Sistema ERP dental — pacientes, consultas, tratamientos, citas y odontograma.

## Despliegue en 4 pasos

### 1. Supabase (base de datos)
1. Ve a [supabase.com](https://supabase.com) → New project
2. Crea un proyecto (anota la contraseña)
3. Ve a **SQL Editor** → New query → pega el contenido de `supabase-schema.sql` → Run
4. Ve a **Settings → API** y copia:
   - `Project URL` → es tu `SUPABASE_URL`
   - `service_role` key (la key larga) → es tu `SUPABASE_SERVICE_KEY`

### 2. GitHub
```bash
# En Git Bash, dentro de la carpeta dentalpro:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/AlexisAmbrosio03/dentalpro.git
git push -u origin main
```

### 3. Netlify (hosting + funciones)
1. Ve a [netlify.com](https://netlify.com) → Add new site → Import from Git → GitHub
2. Selecciona el repo `dentalpro`
3. Build settings: dejar vacíos (netlify.toml lo configura)
4. **Site settings → Environment variables** → agrega:
   - `SUPABASE_URL` = tu URL de Supabase
   - `SUPABASE_SERVICE_KEY` = tu service_role key
5. Deploy site → espera ~2 min → tu URL estará lista

### 4. Instalar como app en tu dispositivo
- **iPhone**: Safari → compartir → "Agregar a pantalla de inicio"
- **Android**: Chrome → menú → "Instalar app"
- **PC/Mac**: Chrome → ícono de instalar en la barra de dirección

## Estructura
```
dentalpro/
├── public/           ← Frontend (HTML, PWA)
├── netlify/
│   └── functions/    ← API serverless (Node.js)
├── supabase-schema.sql
├── netlify.toml
└── package.json
```
