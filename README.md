# PrintXpress — Test Mode
Folders: admin/ and retailer/. Shared styles/auth: assets/.
Deploy this folder as a static Vercel project root. Admin signup is intentionally disabled.
Only the Supabase publishable key is used in browser code; never add service_role keys.
Customer orders, document storage, checkout, SMS/WhatsApp and physical printing are not activated.
Before production validate RLS, roles, RPC payloads, payment webhooks, storage, Print Agent, privacy and DNS.