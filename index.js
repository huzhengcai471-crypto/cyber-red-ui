import os from "node:os";
import fs from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const NS = "cyber-red-ui";
const METRICS_PATH = "/cyber-red-ui/metrics";
const WORLD_STATUS_PATH = "/cyber-red-ui/world-status";
const AVATAR_IMAGE_PATH = "/cyber-red-ui/images/longmarch-ji-20261026.gif";
const AVATAR_QINYUANCHUN_IMAGE_PATH = "/cyber-red-ui/images/longmarch-qinyuanchunxue.gif";
const AVATAR_PRO_SAILOR_IMAGE_PATH = "/cyber-red-ui/images/longmarch-pro-sailor.gif";
const AVATAR_PRO_J_IMAGE_PATH = "/cyber-red-ui/images/longmarch-pro-j.gif";
const AVATAR_PRO_SINGER_IMAGE_PATH = "/cyber-red-ui/images/longmarch-pro-singer.gif";
const LOGIC_ID_PHOTO_PATH = "/cyber-red-ui/images/logic-id-photo.gif";
const YAN_AN_TORCH_IMAGE_PATH = "/cyber-red-ui/images/yan-an-torch.jpg";
const BEAUTY_EXPLAINED_IMAGE_PATH = "/cyber-red-ui/images/beauty-explained.jpg";
const FIRST_CONTACT_IMAGE_PATH = "/cyber-red-ui/images/first-contact.jpg";
const NUMBER_ONE_LOCK_IMAGE_PATH = "/cyber-red-ui/images/number-one-lock.jpg";
const CHAT_VIDEO_PATH = "/cyber-red-ui/video/forgotten-dynamic.mp4";
const FOURTH_DISASTER_VIDEO_PATH = "/cyber-red-ui/video/fourth-disaster-dynamic.mp4";
const TECH_DREAM_VIDEO_PATH = "/cyber-red-ui/video/tech-dream-dynamic.mp4";
const LONGMARCH_VIDEO_PATH = "/cyber-red-ui/video/longmarch-dynamic.mp4";
const CENTRAL_MILITARY_VIDEO_PATH = "/cyber-red-ui/video/central-military-commission.mp4";
const NATIONAL_SECURITY_VIDEO_PATH = "/cyber-red-ui/video/national-security.mp4";
const PARTY_AFFAIRS_VIDEO_PATH = "/cyber-red-ui/video/party-affairs-management.mp4";
const NATIONAL_GOVERNMENT_VIDEO_PATH = "/cyber-red-ui/video/national-government-affairs.mp4";
const THE_FIRE_RISES_AUDIO_PATH = "/cyber-red-ui/audio/the-fire-rises.ogg";
const WAR_AUDIO_PATH = "/cyber-red-ui/audio/war.ogg";
const BEETHOVEN5_AUDIO_PATH = "/cyber-red-ui/audio/beethoven5.ogg";
const TONGXIA_KAI_XUAN_AUDIO_PATH = "/cyber-red-ui/audio/tongxia-kai-xuan.flac";
const TFR_INVASION_OF_TAIWAN_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_invasion_of_taiwan.flac";
const TFR_GAW_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_gaw.flac";
const TFR_SECOND_AMERICAN_CIVIL_WAR_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_second_american_civil_war.flac";
const TFR_MAGA_KING_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_maga_king.flac";
const TFR_COMMUNIST_VICTORY_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_communist_victory.flac";
const TFR_UNITED_VICTORY_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_united_victory.flac";
const TFR_TRUMP_CUMS_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_trump_cums.wav";
const TFR_OLD_GUARD_CONFEDERACY_AUDIO_PATH = "/cyber-red-ui/audio/TFR_se_old_guard_confederacy.flac";
const YOU_SEE_ME_AUDIO_PATH = "/cyber-red-ui/audio/you-see-me.mp3";
const PEOPLE_MARCH_ON_AUDIO_PATH = "/cyber-red-ui/audio/people-march-on.mp3";
const UNMANNED_VICTORY_MARCH_AUDIO_PATH = "/cyber-red-ui/audio/unmanned-victory-march.mp3";
const AVATAR_IMAGE_FILE = fileURLToPath(new URL("./assets/longmarch-ji-20261026.gif", import.meta.url));
const AVATAR_QINYUANCHUN_IMAGE_FILE = fileURLToPath(new URL("./assets/longmarch-qinyuanchunxue.gif", import.meta.url));
const AVATAR_PRO_SAILOR_IMAGE_FILE = fileURLToPath(new URL("./assets/longmarch-pro-sailor.gif", import.meta.url));
const AVATAR_PRO_J_IMAGE_FILE = fileURLToPath(new URL("./assets/longmarch-pro-j.gif", import.meta.url));
const AVATAR_PRO_SINGER_IMAGE_FILE = fileURLToPath(new URL("./assets/longmarch-pro-singer.gif", import.meta.url));
const LOGIC_ID_PHOTO_FILE = fileURLToPath(new URL("./assets/logic-id-photo.gif", import.meta.url));
const YAN_AN_TORCH_IMAGE_FILE = fileURLToPath(new URL("./assets/yan-an-torch.jpg", import.meta.url));
const BEAUTY_EXPLAINED_IMAGE_FILE = fileURLToPath(new URL("./assets/beauty-explained.jpg", import.meta.url));
const FIRST_CONTACT_IMAGE_FILE = fileURLToPath(new URL("./assets/first-contact.jpg", import.meta.url));
const NUMBER_ONE_LOCK_IMAGE_FILE = fileURLToPath(new URL("./assets/number-one-lock.jpg", import.meta.url));
const CHAT_VIDEO_FILE = fileURLToPath(new URL("./assets/forgotten-dynamic.mp4", import.meta.url));
const FOURTH_DISASTER_VIDEO_FILE = fileURLToPath(new URL("./assets/fourth-disaster-dynamic.mp4", import.meta.url));
const TECH_DREAM_VIDEO_FILE = fileURLToPath(new URL("./assets/tech-dream-dynamic.mp4", import.meta.url));
const LONGMARCH_VIDEO_FILE = fileURLToPath(new URL("./assets/longmarch-dynamic.mp4", import.meta.url));
const CENTRAL_MILITARY_VIDEO_FILE = fileURLToPath(new URL("./assets/central-military-commission.mp4", import.meta.url));
const NATIONAL_SECURITY_VIDEO_FILE = fileURLToPath(new URL("./assets/national-security.mp4", import.meta.url));
const PARTY_AFFAIRS_VIDEO_FILE = fileURLToPath(new URL("./assets/party-affairs-management.mp4", import.meta.url));
const NATIONAL_GOVERNMENT_VIDEO_FILE = fileURLToPath(new URL("./assets/national-government-affairs.mp4", import.meta.url));
const THE_FIRE_RISES_AUDIO_FILE = fileURLToPath(new URL("./assets/the-fire-rises.ogg", import.meta.url));
const WAR_AUDIO_FILE = fileURLToPath(new URL("./assets/war.ogg", import.meta.url));
const BEETHOVEN5_AUDIO_FILE = fileURLToPath(new URL("./assets/beethoven5.ogg", import.meta.url));
const TONGXIA_KAI_XUAN_AUDIO_FILE = fileURLToPath(new URL("./assets/tongxia-kai-xuan.flac", import.meta.url));
const TFR_INVASION_OF_TAIWAN_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_invasion_of_taiwan.flac", import.meta.url));
const TFR_GAW_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_gaw.flac", import.meta.url));
const TFR_SECOND_AMERICAN_CIVIL_WAR_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_second_american_civil_war.flac", import.meta.url));
const TFR_MAGA_KING_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_maga_king.flac", import.meta.url));
const TFR_COMMUNIST_VICTORY_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_communist_victory.flac", import.meta.url));
const TFR_UNITED_VICTORY_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_united_victory.flac", import.meta.url));
const TFR_TRUMP_CUMS_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_trump_cums.wav", import.meta.url));
const TFR_OLD_GUARD_CONFEDERACY_AUDIO_FILE = fileURLToPath(new URL("./assets/TFR_se_old_guard_confederacy.flac", import.meta.url));
const YOU_SEE_ME_AUDIO_FILE = fileURLToPath(new URL("./assets/you-see-me.mp3", import.meta.url));
const PEOPLE_MARCH_ON_AUDIO_FILE = fileURLToPath(new URL("./assets/people-march-on.mp3", import.meta.url));
const UNMANNED_VICTORY_MARCH_AUDIO_FILE = fileURLToPath(new URL("./assets/unmanned-victory-march.mp3", import.meta.url));
/* Media is read on demand, never at module load.

   The previous version called readFileSync on every bundled video and audio
   file at the top level. With ~150MB of assets that pinned the whole payload
   in memory for the lifetime of the process, on every launch, whether or not
   a single byte was ever requested. These accessors only touch the disk when a
   route is actually hit, and they cache the byte length (not the bytes) so a
   Range response can be computed without a stat call per request. */
const mediaSizes = new Map();

/** Byte length of a bundled asset, or -1 when it is missing/unreadable. */
function mediaSize(file) {
  if (mediaSizes.has(file)) return mediaSizes.get(file);
  let size = -1;
  try {
    const stat = fs.statSync(file);
    if (stat.isFile()) size = stat.size;
  } catch {
    /* missing asset: the route answers 404 */
  }
  mediaSizes.set(file, size);
  return size;
}

/** Open a read stream for a byte range of a bundled asset. */
function mediaStream(file, start, end) {
  return fs.createReadStream(file, { start, end });
}

const FAST_SAMPLE_MS = 1000;
const SAMPLE_MS = 8000;
const WORLD_CACHE_MS = 5 * 60 * 1000;

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return null;
  return Math.max(min, Math.min(max, value));
}

function cpuTotals() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  for (const cpu of cpus) {
    const times = cpu.times || {};
    idle += Number(times.idle) || 0;
    total += Object.values(times).reduce((sum, value) => sum + (Number(value) || 0), 0);
  }
  return { idle, total };
}

let previousCpu = cpuTotals();

function readCpuPercent() {
  const current = cpuTotals();
  const idleDelta = current.idle - previousCpu.idle;
  const totalDelta = current.total - previousCpu.total;
  previousCpu = current;
  if (totalDelta <= 0) return null;
  return clamp((1 - idleDelta / totalDelta) * 100, 0, 100);
}

function readDiskFallback() {
  try {
    const drive = process.env.SystemDrive || "C:";
    const stats = fs.statfsSync(`${drive}\\`);
    const blocks = Number(stats.blocks) || 0;
    const free = Number(stats.bfree ?? stats.bavail) || 0;
    if (blocks <= 0) return null;
    return clamp((1 - free / blocks) * 100, 0, 100);
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  if (typeof fetch !== "function") throw new Error("host fetch unavailable");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`request ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function readGeoLocation() {
  try {
    const value = await fetchJson("https://ipwho.is/");
    if (value && value.success !== false && (value.country || value.city)) {
      return {
        ip: value.ip || null,
        countryCode: value.country_code || null,
        country: value.country || null,
        region: value.region || null,
        city: value.city || null,
        latitude: Number(value.latitude),
        longitude: Number(value.longitude),
        timezone: value.timezone?.id || value.timezone?.utc || "UTC",
      };
    }
  } catch {}

  const value = await fetchJson("https://ipapi.co/json/");
  return {
    ip: value?.ip || null,
    countryCode: value?.country_code || null,
    country: value?.country_name || null,
    region: value?.region || null,
    city: value?.city || null,
    latitude: Number(value?.latitude),
    longitude: Number(value?.longitude),
    timezone: value?.timezone || "UTC",
  };
}

async function readWorldStatus() {
  const location = await readGeoLocation();
  let weather = null;
  if (Number.isFinite(location.latitude) && Number.isFinite(location.longitude)) {
    try {
      const query = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: "temperature_2m,weather_code,is_day",
        timezone: "auto",
        forecast_days: "1",
      });
      const value = await fetchJson(`https://api.open-meteo.com/v1/forecast?${query}`);
      const current = value?.current || {};
      const temperature = Number(current.temperature_2m);
      const code = Number(current.weather_code);
      weather = {
        temperatureC: Number.isFinite(temperature) ? temperature : null,
        code: Number.isFinite(code) ? code : null,
        isDay: Number(current.is_day) === 1,
        timezone: value?.timezone || location.timezone,
        observedAt: current.time || null,
      };
    } catch {}
  }
  return {
    ...location,
    timezone: location.timezone || weather?.timezone || "UTC",
    weather,
    updatedAt: Date.now(),
  };
}

let worldCache = { data: null, expiresAt: 0, pending: null };

function getWorldStatus() {
  const now = Date.now();
  if (worldCache.data && worldCache.expiresAt > now) return Promise.resolve(worldCache.data);
  if (worldCache.pending) return worldCache.pending;
  worldCache.pending = readWorldStatus().then((data) => {
    worldCache = { data, expiresAt: Date.now() + WORLD_CACHE_MS, pending: null };
    return data;
  }).catch((error) => {
    worldCache.pending = null;
    throw error;
  });
  return worldCache.pending;
}

async function readWindowsMetrics() {
  if (process.platform !== "win32") {
    return { gpu: null, disk: null, networkRx: null, networkTx: null, networkRxBps: null, networkTxBps: null };
  }

  // Collect the Windows counters in one bounded call to keep polling cheap.
  const script = String.raw`
$ErrorActionPreference = 'Stop'
$gpu = $null
$diskTotal = $null
$diskFree = $null
$networkRx = $null
$networkTx = $null
$networkRxBps = $null
$networkTxBps = $null
try {
  $samples = @(Get-Counter '\GPU Engine(*)\Utilization Percentage' -ErrorAction Stop).CounterSamples
  if ($samples.Count -gt 0) {
    $max = ($samples | Measure-Object -Property CookedValue -Maximum).Maximum
    if ($null -ne $max -and -not [double]::IsNaN([double]$max) -and -not [double]::IsInfinity([double]$max)) { $gpu = [math]::Max(0, [math]::Min(100, [double]$max)) }
  }
} catch {}
try {
  $drive = Get-CimInstance Win32_LogicalDisk -Filter ("DeviceID='{0}'" -f $env:SystemDrive) -ErrorAction Stop | Select-Object -First 1 Size,FreeSpace
  if ($null -ne $drive) {
    $diskTotal = [double]$drive.Size
    $diskFree = [double]$drive.FreeSpace
  }
} catch {}
try {
  $network = @(Get-CimInstance Win32_PerfFormattedData_Tcpip_NetworkInterface -ErrorAction Stop)
  if ($network.Count -gt 0) {
    $networkRxBps = [double](($network | Measure-Object -Property BytesReceivedPerSec -Sum).Sum)
    $networkTxBps = [double](($network | Measure-Object -Property BytesSentPerSec -Sum).Sum)
  }
} catch {}
try {
  $stats = @(Get-NetAdapterStatistics -ErrorAction Stop)
  if ($stats.Count -gt 0) {
    $networkRx = [double](($stats | Measure-Object -Property ReceivedBytes -Sum).Sum)
    $networkTx = [double](($stats | Measure-Object -Property SentBytes -Sum).Sum)
  }
} catch {}
[pscustomobject]@{ gpu = $gpu; diskTotal = $diskTotal; diskFree = $diskFree; networkRx = $networkRx; networkTx = $networkTx; networkRxBps = $networkRxBps; networkTxBps = $networkTxBps } | ConvertTo-Json -Compress
`;

  try {
    const { stdout } = await execFileAsync(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", script],
      { timeout: 9000, maxBuffer: 128 * 1024, windowsHide: true },
    );
    const text = String(stdout || "").trim();
    const value = text ? JSON.parse(text) : {};
    const diskTotal = Number(value.diskTotal);
    const diskFree = Number(value.diskFree);
    const finiteOrNull = (entry) => {
      const number = Number(entry);
      return entry === null || entry === undefined || !Number.isFinite(number) ? null : number;
    };
    const gpu = finiteOrNull(value.gpu);
    const networkRx = finiteOrNull(value.networkRx);
    const networkTx = finiteOrNull(value.networkTx);
    const networkRxBps = finiteOrNull(value.networkRxBps);
    const networkTxBps = finiteOrNull(value.networkTxBps);
    return {
      gpu: gpu === null ? null : clamp(gpu, 0, 100),
      disk: diskTotal > 0 ? clamp((1 - diskFree / diskTotal) * 100, 0, 100) : readDiskFallback(),
      networkRx,
      networkTx,
      networkRxBps,
      networkTxBps,
    };
  } catch {
    return { gpu: null, disk: readDiskFallback(), networkRx: null, networkTx: null, networkRxBps: null, networkTxBps: null };
  }
}

function initialSnapshot() {
  return {
    cpu: null,
    gpu: null,
    disk: readDiskFallback(),
    network: { uploadBps: null, downloadBps: null },
    updatedAt: 0,
  };
}

function apply(ctx) {
  let webServer;
  try {
    webServer = (typeof ctx?.get === "function" ? ctx.get("webServer") : undefined) || ctx?.webServer;
  } catch {
    webServer = ctx?.webServer;
  }
  if (!webServer || typeof webServer.register !== "function") {
    try { ctx?.logger?.warn?.(`[${NS}] webServer unavailable; metrics route skipped`); } catch {}
    return;
  }

  let snapshot = initialSnapshot();
  let previousNetwork = null;
  let refreshPromise = null;

  const refresh = async () => {
    const extra = await readWindowsMetrics();
    const now = Date.now();
    let uploadBps = null;
    let downloadBps = null;
    if (extra.networkTxBps !== null) uploadBps = Math.max(0, extra.networkTxBps);
    if (extra.networkRxBps !== null) downloadBps = Math.max(0, extra.networkRxBps);
    if ((uploadBps === null || downloadBps === null) && previousNetwork && now > previousNetwork.at) {
      const seconds = (now - previousNetwork.at) / 1000;
      if (uploadBps === null && extra.networkTx !== null && extra.networkTx >= previousNetwork.tx) {
        uploadBps = Math.max(0, (extra.networkTx - previousNetwork.tx) / seconds);
      }
      if (downloadBps === null && extra.networkRx !== null && extra.networkRx >= previousNetwork.rx) {
        downloadBps = Math.max(0, (extra.networkRx - previousNetwork.rx) / seconds);
      }
    }
    if (extra.networkRx !== null && extra.networkTx !== null) {
      previousNetwork = { rx: extra.networkRx, tx: extra.networkTx, at: now };
    }
    snapshot = {
      cpu: Number.isFinite(snapshot.cpu) ? snapshot.cpu : readCpuPercent(),
      gpu: extra.gpu,
      disk: extra.disk,
      network: { uploadBps, downloadBps },
      updatedAt: now,
    };
  };

  const refreshFast = () => {
    snapshot = {
      ...snapshot,
      cpu: readCpuPercent(),
      disk: readDiskFallback(),
      updatedAt: Date.now(),
    };
  };

  const scheduleRefresh = () => {
    if (refreshPromise) return refreshPromise;
    refreshPromise = refresh().catch((error) => {
      try { ctx?.logger?.debug?.(`[${NS}] metrics refresh failed: ${error?.message || error}`); } catch {}
    }).finally(() => { refreshPromise = null; });
    return refreshPromise;
  };

  const sendJson = (res, code, payload) => {
    const body = Buffer.from(JSON.stringify(payload), "utf8");
    res.writeHead(code, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Length": String(body.length),
    });
    res.end(body);
  };

  const rejected = (req, res) => {
    try {
      const connection = (typeof ctx?.get === "function" ? ctx.get("connection") : undefined) || ctx?.connection;
      if (!connection || typeof connection.requestRejection !== "function") return false;
      const code = connection.requestRejection(req);
      if (code === undefined || code === null || code === false) return false;
      res.statusCode = typeof code === "number" ? code : 403;
      res.end();
      return true;
    } catch {
      return false;
    }
  };

  /* Serve one bundled media file by streaming the requested byte range from
     disk. The Range grammar and status codes are unchanged from the previous
     in-memory version: 405 for a non-GET/HEAD method, 416 for an unsatisfiable
     range, 206 for a partial body, 200 for a whole body. */
  const registerMediaRoute = (path, file, contentType = "video/mp4") => webServer.register({
    kind: "exact",
    path,
    handler: (req, res) => {
      if (rejected(req, res)) return;
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405, { Allow: "GET, HEAD" });
        res.end();
        return;
      }
      const size = mediaSize(file);
      if (size < 0) {
        res.writeHead(404, { "Cache-Control": "no-store" });
        res.end();
        return;
      }
      let start = 0;
      let end = size - 1;
      const range = typeof req.headers.range === "string" ? req.headers.range.trim() : "";
      if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (!match) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end();
          return;
        }
        if (match[1] === "") {
          const suffix = Number(match[2]);
          if (!Number.isSafeInteger(suffix) || suffix <= 0) {
            res.writeHead(416, { "Content-Range": `bytes */${size}` });
            res.end();
            return;
          }
          start = Math.max(0, size - suffix);
        } else {
          start = Number(match[1]);
          end = match[2] === "" ? end : Number(match[2]);
        }
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= size || end < start) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end();
          return;
        }
        end = Math.min(end, size - 1);
      }
      const partial = Boolean(range);
      const headers = {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Content-Length": String(end - start + 1),
        "Cache-Control": "public, max-age=86400",
      };
      if (partial) headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
      res.writeHead(partial ? 206 : 200, headers);
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      const stream = mediaStream(file, start, end);
      stream.on("error", () => { try { res.destroy(); } catch { /* gone */ } });
      stream.pipe(res);
    },
  });
  const routeDisposer = webServer.register({
    kind: "exact",
    path: METRICS_PATH,
    handler: async (req, res) => {
      if (rejected(req, res)) return;
      if (req.method !== "GET") {
        sendJson(res, 405, { ok: false, error: "method not allowed" });
        return;
      }
      try {
        scheduleRefresh();
        sendJson(res, 200, { ok: true, data: snapshot });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const avatarImageRouteDisposer = registerMediaRoute(AVATAR_IMAGE_PATH, AVATAR_IMAGE_FILE, "image/gif");
  const avatarQinyuanchunImageRouteDisposer = registerMediaRoute(AVATAR_QINYUANCHUN_IMAGE_PATH, AVATAR_QINYUANCHUN_IMAGE_FILE, "image/gif");
  const avatarProSailorImageRouteDisposer = registerMediaRoute(AVATAR_PRO_SAILOR_IMAGE_PATH, AVATAR_PRO_SAILOR_IMAGE_FILE, "image/gif");
  const avatarProJImageRouteDisposer = registerMediaRoute(AVATAR_PRO_J_IMAGE_PATH, AVATAR_PRO_J_IMAGE_FILE, "image/gif");
  const avatarProSingerImageRouteDisposer = registerMediaRoute(AVATAR_PRO_SINGER_IMAGE_PATH, AVATAR_PRO_SINGER_IMAGE_FILE, "image/gif");
  const logicIdPhotoRouteDisposer = registerMediaRoute(LOGIC_ID_PHOTO_PATH, LOGIC_ID_PHOTO_FILE, "image/gif");
  const yanAnTorchImageRouteDisposer = registerMediaRoute(YAN_AN_TORCH_IMAGE_PATH, YAN_AN_TORCH_IMAGE_FILE, "image/jpeg");
  const beautyExplainedImageRouteDisposer = registerMediaRoute(BEAUTY_EXPLAINED_IMAGE_PATH, BEAUTY_EXPLAINED_IMAGE_FILE, "image/jpeg");
  const firstContactImageRouteDisposer = registerMediaRoute(FIRST_CONTACT_IMAGE_PATH, FIRST_CONTACT_IMAGE_FILE, "image/jpeg");
  const numberOneLockImageRouteDisposer = registerMediaRoute(NUMBER_ONE_LOCK_IMAGE_PATH, NUMBER_ONE_LOCK_IMAGE_FILE, "image/jpeg");

  /* Range requests let the browser seek and decode bundled background videos. */
  const chatVideoRouteDisposer = registerMediaRoute(CHAT_VIDEO_PATH, CHAT_VIDEO_FILE);
  const fourthDisasterVideoRouteDisposer = registerMediaRoute(FOURTH_DISASTER_VIDEO_PATH, FOURTH_DISASTER_VIDEO_FILE);
  const techDreamVideoRouteDisposer = registerMediaRoute(TECH_DREAM_VIDEO_PATH, TECH_DREAM_VIDEO_FILE);
  const longmarchVideoRouteDisposer = registerMediaRoute(LONGMARCH_VIDEO_PATH, LONGMARCH_VIDEO_FILE);
  const centralMilitaryVideoRouteDisposer = registerMediaRoute(CENTRAL_MILITARY_VIDEO_PATH, CENTRAL_MILITARY_VIDEO_FILE);
  const nationalSecurityVideoRouteDisposer = registerMediaRoute(NATIONAL_SECURITY_VIDEO_PATH, NATIONAL_SECURITY_VIDEO_FILE);
  const partyAffairsVideoRouteDisposer = registerMediaRoute(PARTY_AFFAIRS_VIDEO_PATH, PARTY_AFFAIRS_VIDEO_FILE);
  const nationalGovernmentVideoRouteDisposer = registerMediaRoute(NATIONAL_GOVERNMENT_VIDEO_PATH, NATIONAL_GOVERNMENT_VIDEO_FILE);
  const theFireRisesAudioRouteDisposer = registerMediaRoute(
    THE_FIRE_RISES_AUDIO_PATH,
    THE_FIRE_RISES_AUDIO_FILE,
    "audio/ogg",
  );
  const warAudioRouteDisposer = registerMediaRoute(WAR_AUDIO_PATH, WAR_AUDIO_FILE, "audio/ogg");
  const beethoven5AudioRouteDisposer = registerMediaRoute(
    BEETHOVEN5_AUDIO_PATH,
    BEETHOVEN5_AUDIO_FILE,
    "audio/ogg",
  );
  const tongxiaKaiXuanAudioRouteDisposer = registerMediaRoute(
    TONGXIA_KAI_XUAN_AUDIO_PATH,
    TONGXIA_KAI_XUAN_AUDIO_FILE,
    "audio/flac",
  );
  const tfrInvasionOfTaiwanAudioRouteDisposer = registerMediaRoute(TFR_INVASION_OF_TAIWAN_AUDIO_PATH, TFR_INVASION_OF_TAIWAN_AUDIO_FILE, "audio/flac");
  const tfrGawAudioRouteDisposer = registerMediaRoute(TFR_GAW_AUDIO_PATH, TFR_GAW_AUDIO_FILE, "audio/flac");
  const tfrSecondAmericanCivilWarAudioRouteDisposer = registerMediaRoute(TFR_SECOND_AMERICAN_CIVIL_WAR_AUDIO_PATH, TFR_SECOND_AMERICAN_CIVIL_WAR_AUDIO_FILE, "audio/flac");
  const tfrMagaKingAudioRouteDisposer = registerMediaRoute(TFR_MAGA_KING_AUDIO_PATH, TFR_MAGA_KING_AUDIO_FILE, "audio/flac");
  const tfrCommunistVictoryAudioRouteDisposer = registerMediaRoute(TFR_COMMUNIST_VICTORY_AUDIO_PATH, TFR_COMMUNIST_VICTORY_AUDIO_FILE, "audio/flac");
  const tfrUnitedVictoryAudioRouteDisposer = registerMediaRoute(TFR_UNITED_VICTORY_AUDIO_PATH, TFR_UNITED_VICTORY_AUDIO_FILE, "audio/flac");
  const tfrTrumpCumsAudioRouteDisposer = registerMediaRoute(TFR_TRUMP_CUMS_AUDIO_PATH, TFR_TRUMP_CUMS_AUDIO_FILE, "audio/wav");
  const tfrOldGuardConfederacyAudioRouteDisposer = registerMediaRoute(TFR_OLD_GUARD_CONFEDERACY_AUDIO_PATH, TFR_OLD_GUARD_CONFEDERACY_AUDIO_FILE, "audio/flac");
  const youSeeMeAudioRouteDisposer = registerMediaRoute(YOU_SEE_ME_AUDIO_PATH, YOU_SEE_ME_AUDIO_FILE, "audio/mpeg");
  const peopleMarchOnAudioRouteDisposer = registerMediaRoute(PEOPLE_MARCH_ON_AUDIO_PATH, PEOPLE_MARCH_ON_AUDIO_FILE, "audio/mpeg");
  const unmannedVictoryMarchAudioRouteDisposer = registerMediaRoute(UNMANNED_VICTORY_MARCH_AUDIO_PATH, UNMANNED_VICTORY_MARCH_AUDIO_FILE, "audio/mpeg");

  const worldRouteDisposer = webServer.register({
    kind: "exact",
    path: WORLD_STATUS_PATH,
    handler: async (req, res) => {
      if (rejected(req, res)) return;
      if (req.method !== "GET") {
        sendJson(res, 405, { ok: false, error: "method not allowed" });
        return;
      }
      try {
        const data = await getWorldStatus();
        sendJson(res, 200, { ok: true, data });
      } catch (error) {
        sendJson(res, 502, {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  const fastInterval = setInterval(refreshFast, FAST_SAMPLE_MS);
  const interval = setInterval(scheduleRefresh, SAMPLE_MS);
  refreshFast();
  scheduleRefresh();
  const dispose = () => {
    clearInterval(fastInterval);
    clearInterval(interval);
    try { if (typeof routeDisposer === "function") routeDisposer(); } catch {}
    try { if (typeof avatarImageRouteDisposer === "function") avatarImageRouteDisposer(); } catch {}
    try { if (typeof avatarQinyuanchunImageRouteDisposer === "function") avatarQinyuanchunImageRouteDisposer(); } catch {}
    try { if (typeof avatarProSailorImageRouteDisposer === "function") avatarProSailorImageRouteDisposer(); } catch {}
    try { if (typeof avatarProJImageRouteDisposer === "function") avatarProJImageRouteDisposer(); } catch {}
    try { if (typeof avatarProSingerImageRouteDisposer === "function") avatarProSingerImageRouteDisposer(); } catch {}
    try { if (typeof logicIdPhotoRouteDisposer === "function") logicIdPhotoRouteDisposer(); } catch {}
    try { if (typeof moonBaseImageRouteDisposer === "function") moonBaseImageRouteDisposer(); } catch {}
    try { if (typeof beautyExplainedImageRouteDisposer === "function") beautyExplainedImageRouteDisposer(); } catch {}
    try { if (typeof firstContactImageRouteDisposer === "function") firstContactImageRouteDisposer(); } catch {}
    try { if (typeof numberOneLockImageRouteDisposer === "function") numberOneLockImageRouteDisposer(); } catch {}
    try { if (typeof chatVideoRouteDisposer === "function") chatVideoRouteDisposer(); } catch {}
    try { if (typeof fourthDisasterVideoRouteDisposer === "function") fourthDisasterVideoRouteDisposer(); } catch {}
    try { if (typeof techDreamVideoRouteDisposer === "function") techDreamVideoRouteDisposer(); } catch {}
    try { if (typeof longmarchVideoRouteDisposer === "function") longmarchVideoRouteDisposer(); } catch {}
    try { if (typeof centralMilitaryVideoRouteDisposer === "function") centralMilitaryVideoRouteDisposer(); } catch {}
    try { if (typeof nationalSecurityVideoRouteDisposer === "function") nationalSecurityVideoRouteDisposer(); } catch {}
    try { if (typeof partyAffairsVideoRouteDisposer === "function") partyAffairsVideoRouteDisposer(); } catch {}
    try { if (typeof nationalGovernmentVideoRouteDisposer === "function") nationalGovernmentVideoRouteDisposer(); } catch {}
    try { if (typeof theFireRisesAudioRouteDisposer === "function") theFireRisesAudioRouteDisposer(); } catch {}
    try { if (typeof warAudioRouteDisposer === "function") warAudioRouteDisposer(); } catch {}
    try { if (typeof beethoven5AudioRouteDisposer === "function") beethoven5AudioRouteDisposer(); } catch {}
    try { if (typeof tongxiaKaiXuanAudioRouteDisposer === "function") tongxiaKaiXuanAudioRouteDisposer(); } catch {}
    try { if (typeof tfrInvasionOfTaiwanAudioRouteDisposer === "function") tfrInvasionOfTaiwanAudioRouteDisposer(); } catch {}
    try { if (typeof tfrGawAudioRouteDisposer === "function") tfrGawAudioRouteDisposer(); } catch {}
    try { if (typeof tfrSecondAmericanCivilWarAudioRouteDisposer === "function") tfrSecondAmericanCivilWarAudioRouteDisposer(); } catch {}
    try { if (typeof tfrMagaKingAudioRouteDisposer === "function") tfrMagaKingAudioRouteDisposer(); } catch {}
    try { if (typeof tfrCommunistVictoryAudioRouteDisposer === "function") tfrCommunistVictoryAudioRouteDisposer(); } catch {}
    try { if (typeof tfrUnitedVictoryAudioRouteDisposer === "function") tfrUnitedVictoryAudioRouteDisposer(); } catch {}
    try { if (typeof tfrTrumpCumsAudioRouteDisposer === "function") tfrTrumpCumsAudioRouteDisposer(); } catch {}
    try { if (typeof tfrOldGuardConfederacyAudioRouteDisposer === "function") tfrOldGuardConfederacyAudioRouteDisposer(); } catch {}
    try { if (typeof youSeeMeAudioRouteDisposer === "function") youSeeMeAudioRouteDisposer(); } catch {}
    try { if (typeof peopleMarchOnAudioRouteDisposer === "function") peopleMarchOnAudioRouteDisposer(); } catch {}
    try { if (typeof unmannedVictoryMarchAudioRouteDisposer === "function") unmannedVictoryMarchAudioRouteDisposer(); } catch {}
    try { if (typeof worldRouteDisposer === "function") worldRouteDisposer(); } catch {}
  };
  if (typeof ctx?.effect === "function") ctx.effect(() => dispose, `${NS}: metrics route`);
  try {
    ctx?.logger?.info?.(`[${NS}] metrics route ready: ${METRICS_PATH}; world status route: ${WORLD_STATUS_PATH}; chat video routes: ${CHAT_VIDEO_PATH}, ${FOURTH_DISASTER_VIDEO_PATH}, ${TECH_DREAM_VIDEO_PATH}, ${LONGMARCH_VIDEO_PATH}, ${CENTRAL_MILITARY_VIDEO_PATH}, ${NATIONAL_SECURITY_VIDEO_PATH}, ${PARTY_AFFAIRS_VIDEO_PATH}, ${NATIONAL_GOVERNMENT_VIDEO_PATH}; audio routes: ${THE_FIRE_RISES_AUDIO_PATH}, ${WAR_AUDIO_PATH}, ${BEETHOVEN5_AUDIO_PATH}, ${TONGXIA_KAI_XUAN_AUDIO_PATH}, ${TFR_INVASION_OF_TAIWAN_AUDIO_PATH}, ${TFR_GAW_AUDIO_PATH}, ${TFR_SECOND_AMERICAN_CIVIL_WAR_AUDIO_PATH}, ${TFR_MAGA_KING_AUDIO_PATH}, ${TFR_COMMUNIST_VICTORY_AUDIO_PATH}, ${TFR_UNITED_VICTORY_AUDIO_PATH}, ${TFR_TRUMP_CUMS_AUDIO_PATH}, ${TFR_OLD_GUARD_CONFEDERACY_AUDIO_PATH}, ${YOU_SEE_ME_AUDIO_PATH}, ${PEOPLE_MARCH_ON_AUDIO_PATH}, ${UNMANNED_VICTORY_MARCH_AUDIO_PATH}`);
  } catch {}
  return dispose;
}

const inject = ["webServer", "connection"];
const name = NS;

export { apply, inject, name };
