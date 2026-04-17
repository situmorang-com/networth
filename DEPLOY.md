# Deploy to Coolify

Target URL:

`https://edmund.link/accelerasia`

## Coolify

Use this project as a static Astro site.

Build command:

```bash
npm install && npm run build:accelerasia
```

Publish directory:

```bash
dist
```

If you prefer environment variables instead of the preset build script, use:

```bash
SITE_URL=https://edmund.link
SITE_BASE_PATH=/accelerasia
```

Then the build command can stay:

```bash
npm install && npm run build
```

## Cloudflare

Point `edmund.link` to the Coolify server.

DNS does not control the `/accelerasia` path. The path routing must be handled by Coolify / your reverse proxy on the server.

## Notes

- `https://edmund.link/accelerasia` is supported by the Astro config in this repo.
- If `edmund.link` already serves another app at `/`, make sure Coolify is configured to route `/accelerasia` to this app.
