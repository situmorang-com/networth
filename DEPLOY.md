# Deploy to net.edmund.link

Target URL:

`https://net.edmund.link`

---

## 1. Cloudflare DNS

In your Cloudflare dashboard for `edmund.link`:

1. Go to **DNS → Records**
2. Add a new record:
   - **Type:** `CNAME`
   - **Name:** `net`
   - **Target:** *(your Coolify server hostname or IP — same as `edmund.link` points to)*
   - **Proxy status:** Proxied (orange cloud) ✅
3. Save

> If Coolify uses an IP address, use an **A record** instead:
> - **Type:** `A` | **Name:** `net` | **IPv4:** `<your server IP>`

---

## 2. Coolify — New Application

In Coolify, create a **new application** for this subdomain:

1. **Source:** Same Git repo
2. **Build command:**
   ```
   npm install && npm run build:net
   ```
3. **Publish directory:** `dist`
4. **Domain:** `net.edmund.link`
5. Enable **HTTPS / Let's Encrypt** in Coolify settings

> Or use environment variables instead of the build script:
> ```
> SITE_URL=https://net.edmund.link
> SITE_BASE_PATH=/
> ```
> Build command: `npm install && npm run build`

---

## 3. Deploy

Push or trigger a build in Coolify. Once DNS propagates (usually 1–5 minutes with Cloudflare), the site will be live at:

**https://net.edmund.link**

---

## Previous deployment (still active)

`https://edmund.link/accelerasia` — managed separately in Coolify.

## Notes

- `net.edmund.link` uses base path `/` — no path prefix needed
- SSL is handled automatically by Coolify + Let's Encrypt
- Cloudflare proxy adds CDN, DDoS protection, and caching on top
