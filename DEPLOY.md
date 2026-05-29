# Guía de Deploy — MBTI SaaS (Membership + Advisor IA)

Tiempo estimado: 30-40 minutos. Sin conocimiento técnico requerido.

---

## PASO 1 — Instalar dependencias (una sola vez)

Necesitas Node.js instalado. Verifica con:
```
node --version
```
Si no lo tienes: https://nodejs.org → descarga la versión LTS.

En la carpeta `mbti-saas`, ejecuta:
```
npm install
```

Para correr localmente:
```
npm run dev
```
Abre http://localhost:5173

---

## PASO 2 — Crear cuenta en GitHub

1. Ve a https://github.com y crea una cuenta gratuita
2. Crea un repositorio nuevo llamado `mbti-saas`
3. En la carpeta del proyecto, ejecuta:
```
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/mbti-saas.git
git push -u origin main
```

---

## PASO 3 — Deploy en Vercel

1. Ve a https://vercel.com y crea cuenta con tu GitHub
2. Click "Add New Project" → selecciona `mbti-saas`
3. Vercel lo detecta como Vite automáticamente
4. ANTES de hacer deploy agrega las variables (Pasos 4 y 5)
5. Click "Deploy"

---

## PASO 4 — Configurar Stripe (Suscripción Mensual)

1. Ve a https://dashboard.stripe.com y crea cuenta
2. Menú lateral → Products → Add Product
3. Nombre: "MBTI Membership"
4. Click "Add a price" → Recurring → elige monto (ej: $19/month)
5. Guarda → copia el Price ID que empieza con price_...

En Developers → API Keys, copia las claves.

En Stripe → Settings → Billing → Customer Portal → activa el portal.

En Vercel → Settings → Environment Variables, agrega:

| Variable                      | Valor                         |
|-------------------------------|-------------------------------|
| STRIPE_SECRET_KEY             | sk_live_... (clave secreta)   |
| VITE_STRIPE_PUBLISHABLE_KEY   | pk_live_... (clave pública)   |
| STRIPE_PRICE_ID               | price_... (tu Price ID)       |
| VITE_APP_URL                  | https://mbti-saas.vercel.app  |
| VITE_PRICE_DISPLAY            | $19                           |

---

## PASO 5 — Configurar Anthropic (Advisor IA)

1. Ve a https://console.anthropic.com y crea cuenta
2. API Keys → Create Key → copia la clave sk-ant-...

En Vercel → Environment Variables, agrega:

| Variable           | Valor       |
|--------------------|-------------|
| ANTHROPIC_API_KEY  | sk-ant-...  |

---

## PASO 6 — Redeploy

Vercel → tu proyecto → Deployments → Redeploy

---

## PASO 7 — Verificar

1. Completa el test
2. Click en "Advisor IA" → aparece modal de membership
3. Prueba con tarjeta Stripe: 4242 4242 4242 4242
4. Post-pago → Advisor IA activo con chat funcional

---

## Cambiar el precio

1. En Stripe → Products → Add price (nuevo precio recurrente)
2. En Vercel → actualiza STRIPE_PRICE_ID y VITE_PRICE_DISPLAY → Redeploy

---

## Dominio propio (opcional)

1. Compra en namecheap.com o porkbun.com (~$10/año)
2. Vercel → Settings → Domains → agrega el dominio
3. Actualiza VITE_APP_URL → Redeploy

---

## Ver suscriptores

- Pagos: https://dashboard.stripe.com/payments
- Suscripciones activas: https://dashboard.stripe.com/subscriptions

---

## Errores comunes

- Pantalla en blanco: revisa variables de entorno en Vercel
- Advisor no responde: verifica ANTHROPIC_API_KEY en console.anthropic.com
- Error en pago: verifica que STRIPE_SECRET_KEY sea la clave secreta
- URL post-pago falla: VITE_APP_URL sin slash final
- Customer Portal no funciona: actívalo en Stripe Settings → Billing → Customer Portal
