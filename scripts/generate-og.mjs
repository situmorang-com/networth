import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const W = 1200;
const H = 630;

// Portrait: crop face+neck from top-center, fill right column
const portraitW = 560;
const portraitLeft = W - portraitW; // flush right

const portrait = await sharp(resolve(root, "public/edmund-tech-portrait-opt.png"))
  .extract({ left: 100, top: 0, width: 700, height: 720 }) // face → neck region
  .resize(portraitW, H, { fit: "cover", position: "top" })
  .toBuffer();

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dark vignette over the portrait -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#010409" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#010409" stop-opacity="0.72"/>
    </radialGradient>
    <!-- Left panel dark overlay -->
    <linearGradient id="leftpanel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#010409" stop-opacity="0.98"/>
      <stop offset="55%"  stop-color="#010409" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#010409" stop-opacity="0"/>
    </linearGradient>
    <!-- Bottom dark fade -->
    <linearGradient id="bottomfade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="60%" stop-color="#010409" stop-opacity="0"/>
      <stop offset="100%" stop-color="#010409" stop-opacity="0.9"/>
    </linearGradient>
    <!-- Card glass style -->
    <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>
  </defs>

  <!-- Vignette over full portrait -->
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <!-- Left overlay panel -->
  <rect width="${W}" height="${H}" fill="url(#leftpanel)"/>
  <!-- Bottom fade -->
  <rect width="${W}" height="${H}" fill="url(#bottomfade)"/>

  <!-- ── Left panel content ── -->

  <!-- Accent bar -->
  <rect x="60" y="56" width="44" height="3" fill="#60a5fa" rx="2"/>

  <!-- Name -->
  <text x="60" y="198" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="68" font-weight="700" fill="#eef4ff" letter-spacing="-1.5">Edmund</text>
  <text x="60" y="278" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="68" font-weight="700" fill="#eef4ff" letter-spacing="-1.5">Situmorang</text>

  <!-- Divider -->
  <rect x="60" y="308" width="300" height="2" fill="#2563eb" rx="1"/>

  <!-- Slogan -->
  <text x="60" y="360" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="24" font-weight="400" fill="#60a5fa" letter-spacing="0.3">
    my net worth is my network
  </text>

  <!-- ── Floating cards (right / center area) ── -->

  <!-- Card helper: rounded rect + label + value -->

  <!-- Card: APPROACH / Invest in people — top right -->
  <rect x="730" y="48" width="258" height="68" rx="10"
        fill="#0d1f3c" fill-opacity="0.30" stroke="#2563eb" stroke-width="1.2"/>
  <text x="750" y="76" font-family="IBM Plex Mono, monospace"
        font-size="10" fill="#7d9ac0" letter-spacing="1.5">APPROACH</text>
  <text x="750" y="98" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="17" font-weight="600" fill="#eef4ff">Invest in people</text>

  <!-- Card: THOUGHT LEADERSHIP / AI &amp; Cybersecurity — left-center -->
  <rect x="60" y="410" width="298" height="68" rx="10"
        fill="#0d1f3c" fill-opacity="0.30" stroke="#2563eb" stroke-width="1.2"/>
  <text x="80" y="438" font-family="IBM Plex Mono, monospace"
        font-size="10" fill="#7d9ac0" letter-spacing="1.5">THOUGHT LEADERSHIP</text>
  <text x="80" y="460" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="17" font-weight="600" fill="#eef4ff">AI &amp; Cybersecurity</text>

  <!-- Card: NETWORK / C-Suite — center -->
  <rect x="620" y="246" width="200" height="68" rx="10"
        fill="#0d1f3c" fill-opacity="0.30" stroke="#2563eb" stroke-width="1.2"/>
  <text x="640" y="274" font-family="IBM Plex Mono, monospace"
        font-size="10" fill="#7d9ac0" letter-spacing="1.5">NETWORK</text>
  <text x="640" y="296" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="17" font-weight="600" fill="#eef4ff">C-Suite</text>

  <!-- Card: REACH / SEA — right-center -->
  <rect x="880" y="340" width="180" height="68" rx="10"
        fill="#0d1f3c" fill-opacity="0.30" stroke="#60a5fa" stroke-width="1.2"/>
  <text x="900" y="368" font-family="IBM Plex Mono, monospace"
        font-size="10" fill="#7d9ac0" letter-spacing="1.5">REACH</text>
  <text x="900" y="390" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="17" font-weight="600" fill="#eef4ff">SEA</text>

  <!-- Card: PROFILE / Group CTO — bottom center -->
  <rect x="620" y="490" width="210" height="68" rx="10"
        fill="#0d1f3c" fill-opacity="0.30" stroke="#fbbf24" stroke-width="1.2"/>
  <text x="640" y="518" font-family="IBM Plex Mono, monospace"
        font-size="10" fill="#7d9ac0" letter-spacing="1.5">PROFILE</text>
  <text x="640" y="540" font-family="Space Grotesk, system-ui, sans-serif"
        font-size="17" font-weight="600" fill="#eef4ff">Group CTO</text>

  <!-- Domain watermark bottom-left -->
  <text x="60" y="596" font-family="IBM Plex Mono, monospace"
        font-size="13" fill="#7d9ac0" letter-spacing="1">net.edmund.link</text>
</svg>
`;

mkdirSync(resolve(root, "public"), { recursive: true });

await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 1, g: 4, b: 9, alpha: 1 } },
})
  .composite([
    { input: portrait, top: 0, left: portraitLeft },
    { input: Buffer.from(svg), top: 0, left: 0 },
  ])
  .png()
  .toFile(resolve(root, "public/og-image.png"));

console.log("✓ public/og-image.png generated (1200×630)");
