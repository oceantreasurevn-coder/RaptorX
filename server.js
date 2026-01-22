const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8787;
const ROOT_DIR = process.cwd();
const AI_PROVIDER = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/auto";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM;
const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO;
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".woff2": "font/woff2"
};

const getCorsOrigin = (req) => {
  const origin = req?.headers?.origin;
  if (!origin) return "*";
  return origin;
};

const getCorsHeaders = (req) => {
  const allowHeaders = req?.headers?.["access-control-request-headers"];
  return {
    "Access-Control-Allow-Origin": getCorsOrigin(req),
    "Access-Control-Allow-Headers": allowHeaders || "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin"
  };
};

const sendJson = (req, res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...getCorsHeaders(req)
  });
  res.end(JSON.stringify(payload));
};

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });

const submitToGoogleScript = async (payload) => {
  if (!GOOGLE_SCRIPT_URL) {
    return { status: "skipped" };
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Google Sheet sync failed.");
  }
  return data;
};

const buildSystemPrompt = (language, siteContext) => `You are the RAPTOR [X] brand concierge for street skateboarding.
Stay professional, smooth, and confident. Focus on skateboarding, street culture, streetwear, gear setups, and RAPTOR [X] brand drops.

Mandatory response rules:
1) Always scan and review ALL SITE CONTEXT (full page content) before answering.
2) Normalize user intent first. If two questions share the same intent, respond with the SAME wording and structure every time.
3) Use the SITE CONTEXT as the single source of truth. Do NOT invent or guess details.
4) If information is missing or ambiguous, say it is not available on the website and ask a clarifying question.

Visual & icon rules:
1) If the question mentions any collection product name or sub-name, ALWAYS include the matching product image from PRODUCT IMAGE MAP.
2) For deck-related questions, ALWAYS use images from PRODUCT IMAGE MAP (collection decks) and NEVER use gear images.
3) If "France" or related terms appear, prefer the product entry tagged with "LIMITED FOR FRANCE" in PRODUCT IMAGE MAP.
4) If gear is mentioned (not decks), use the matching image from GEAR IMAGE MAP.
5) Only include images directly relevant to the answer and listed in SITE CONTEXT.
6) Provide image URLs on their own lines prefixed with "Image: ".
7) Place all image lines at the VERY TOP of the response before any text.
8) Never crop or alter images; only provide the original URL.
9) Use helpful icons/emojis when appropriate: apparel 👕🧥, shoes 👟, skateboard 🛹, gear 🧰, events 📅, location 📍, time ⏰, price 💸.

Follow this response workflow:
1) Receive the user's question or suggested keyword.
2) Review all information available in SITE CONTEXT and answer using it first.
3) For any product or skateboarding-related topics, always prioritize SITE CONTEXT before any supplementary info.

Tie answers back to RAPTOR [X] when relevant, and propose stylish, realistic recommendations based only on the SITE CONTEXT.
If the user asks about unrelated topics, politely steer back to skate, street culture, or streetwear.
Keep answers concise and end with one helpful follow-up question.
Respond in ${language}.

SITE CONTEXT:
${siteContext || "No website context provided."}`;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sendConfirmationEmail = async ({ to, name, lang, formSummary, origin }) => {
  if (!RESEND_API_KEY || !RESEND_FROM || !to) {
    return { status: "skipped" };
  }

  const isFrench = lang === "fr";
  const subject = isFrench
    ? "RAPTOR [X] — Inscription confirmée"
    : "RAPTOR [X] — Registration Confirmed";

  const greeting = isFrench
    ? `Bonjour ${name || ""}`.trim()
    : `Hi ${name || ""}`.trim();

  const intro = isFrench
    ? "Merci pour votre inscription. Nous avons bien reçu vos informations."
    : "Thanks for registering. We've received your details.";

  const statusLabel = isFrench ? "Statut" : "Status";
  const statusValue = isFrench ? "Envoyé avec succès" : "Submitted successfully";
  const detailTitle = isFrench ? "Détails envoyés" : "Submission details";
  const ctaLabel = isFrench ? "Voir le programme" : "View the schedule";
  const storyLabel = isFrench ? "Lire l'article" : "Read the story";
  const footerLine = isFrench
    ? "Si une information est incorrecte, répondez simplement à cet email."
    : "If any detail is incorrect, just reply to this email.";
  const teamLine = isFrench
    ? "L'équipe RAPTOR [X] enverra bientôt les mises à jour."
    : "The RAPTOR [X] team will send updates shortly.";

  const safeSummary = formSummary ? escapeHtml(formSummary) : "";
  const siteUrl = origin && origin !== "null" ? origin : "https://scaterraptorx.com/";
  const scheduleUrl = `${siteUrl.replace(/\/$/, "")}/#schedule`;
  const blogUrl = `${siteUrl.replace(/\/$/, "")}/#blog`;
  const heroImage = `${siteUrl.replace(/\/$/, "")}/event/Skater%20at%20Republique%20Paris%202.png`;
  const heroAlt = isFrench ? "RaptorX Unleashed UK Roadshow" : "RaptorX Unleashed UK Roadshow";

  const eventTitle = "RaptorX Unleashed: Waking Up the UK Streets";
  const eventIntro = isFrench
    ? "Scaters lance officiellement la série RaptorX avec une tournée sur 3 villes : Londres, Bristol et Manchester. Démos live, rencontres avec les pros et drops exclusifs."
    : "Scaters officially launches the RaptorX series with a 3-city tour across London, Bristol, and Manchester. Live demos, pro rider meetups, and exclusive gear drops.";
  const eventDateRange = isFrench ? "04–06 avril 2026" : "04–06 April 2026";
  const eventCities = "London • Bristol • Manchester";
  const scheduleHeading = isFrench ? "Temps forts du roadshow" : "Roadshow highlights";
  const scheduleItems = isFrench
    ? [
        "04 AVR — Londres : Southbank Centre Skate Space (14:00–18:00)",
        "05 AVR — Bristol : Dean Lane Skatepark (13:00–17:00)",
        "06 AVR — Manchester : Projekts MCR Skatepark (16:00–20:00)"
      ]
    : [
        "04 APR — London: Southbank Centre Skate Space (14:00–18:00)",
        "05 APR — Bristol: Dean Lane Skatepark (13:00–17:00)",
        "06 APR — Manchester: Projekts MCR Skatepark (16:00–20:00)"
      ];
  const safetyNote = isFrench
    ? "Safety First, Ride Pro : kit sécurité pro + conseils d'instructeurs certifiés."
    : "Safety First, Ride Pro: pro safety gear + guidance from certified instructors.";

  const html = `
    <div style="margin:0;padding:32px;background:#0b0b0b;">
      <div style="max-width:620px;margin:0 auto;background:#111111;border:1px solid #262626;border-radius:16px;overflow:hidden;font-family:'Aptos Display','Segoe UI',Arial,sans-serif;color:#f2f2f2;">
        <div style="padding:28px 28px 18px;">
          <div style="letter-spacing:0.35em;font-size:12px;font-weight:700;text-transform:uppercase;color:#facc15;margin-bottom:16px;">RAPTOR [X]</div>
          <h2 style="margin:0 0 8px;font-size:24px;line-height:1.3;">${greeting}</h2>
          <p style="margin:0 0 14px;color:#d0d0d0;line-height:1.6;">${intro}</p>

          <div style="display:inline-block;background:#1f1f1f;border:1px solid #2f2f2f;border-radius:999px;padding:6px 14px;margin:4px 0 8px;">
            <span style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">${statusLabel}</span>
            <span style="margin-left:8px;font-weight:700;color:#facc15;">${statusValue}</span>
          </div>
        </div>

        <img src="${heroImage}" alt="${heroAlt}" style="display:block;width:100%;height:auto;max-width:620px;">

        <div style="padding:22px 28px 28px;">
          <div style="font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:#9ca3af;">UK Roadshow</div>
          <h3 style="margin:10px 0 6px;font-size:22px;line-height:1.3;color:#ffffff;">${eventTitle}</h3>
          <p style="margin:0 0 12px;color:#d0d0d0;line-height:1.6;">${eventIntro}</p>

          <div style="margin:0 0 12px;">
            <span style="display:inline-block;background:#151515;border:1px solid #2b2b2b;border-radius:999px;padding:6px 10px;margin:0 8px 8px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#facc15;">${eventDateRange}</span>
            <span style="display:inline-block;background:#151515;border:1px solid #2b2b2b;border-radius:999px;padding:6px 10px;margin:0 8px 8px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#e5e5e5;">${eventCities}</span>
          </div>

          <div style="border:1px solid #262626;border-radius:12px;padding:14px 16px;margin-bottom:16px;background:#0f0f0f;">
            <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;">${scheduleHeading}</div>
            ${scheduleItems.map((item) => `
              <div style="margin:6px 0;color:#e5e5e5;font-size:13px;line-height:1.6;">${item}</div>
            `).join("")}
            <div style="margin-top:10px;color:#facc15;font-weight:700;font-size:12px;letter-spacing:0.06em;">${safetyNote}</div>
          </div>

          <p style="margin:0 0 18px;color:#d0d0d0;line-height:1.6;">${teamLine}</p>

          ${safeSummary ? `
            <div style="background:#0f0f0f;border:1px solid #262626;border-radius:12px;padding:16px;margin-bottom:18px;">
              <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;">${detailTitle}</div>
              <pre style="margin:0;white-space:pre-wrap;font-family:Consolas,monospace;font-size:12px;color:#e5e5e5;">${safeSummary}</pre>
            </div>
          ` : ""}

          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <a href="${scheduleUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#facc15;color:#111111;font-weight:700;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;font-size:12px;">${ctaLabel}</a>
            <a href="${blogUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;border:1px solid #3a3a3a;color:#f2f2f2;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;font-size:12px;">${storyLabel}</a>
          </div>

          <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;line-height:1.6;">${footerLine}</p>
          <p style="margin:18px 0 0;color:#6b7280;font-size:12px;">— Scaters / RAPTOR [X]</p>
        </div>
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [to],
      subject,
      html,
      ...(RESEND_REPLY_TO ? { reply_to: RESEND_REPLY_TO } : {})
    })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Email send failed.");
  }

  return { status: "sent" };
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/health") {
    if (req.method === "OPTIONS") {
      return sendJson(req, res, 204, {});
    }
    if (req.method !== "GET") {
      return sendJson(req, res, 405, { error: "Method not allowed." });
    }

    const isOpenAI = AI_PROVIDER === "openai";
    const isOpenRouter = AI_PROVIDER === "openrouter";
    if (!isOpenAI && !isOpenRouter) {
      return sendJson(req, res, 500, {
        status: "error",
        configured: false,
        message: "Invalid AI_PROVIDER. Use openrouter or openai."
      });
    }

    const configured = isOpenAI ? Boolean(OPENAI_API_KEY) : Boolean(OPENROUTER_API_KEY);
    const model = isOpenAI ? OPENAI_MODEL : OPENROUTER_MODEL;
    const message = configured
      ? "ready"
      : `Missing ${isOpenAI ? "OPENAI_API_KEY" : "OPENROUTER_API_KEY"}.`;

    return sendJson(req, res, 200, {
      status: configured ? "ok" : "error",
      provider: isOpenAI ? "openai" : "openrouter",
      model,
      configured,
      message,
      uptime: Math.round(process.uptime())
    });
  }

  if (requestUrl.pathname === "/api/chat") {
    if (req.method === "OPTIONS") {
      return sendJson(req, res, 204, {});
    }

    if (req.method !== "POST") {
      return sendJson(req, res, 405, { error: "Method not allowed." });
    }

    const isOpenAI = AI_PROVIDER === "openai";
    const isOpenRouter = AI_PROVIDER === "openrouter";
    if (!isOpenAI && !isOpenRouter) {
      return sendJson(req, res, 500, { error: "Invalid AI_PROVIDER. Use openrouter or openai." });
    }
    if (isOpenRouter && !OPENROUTER_API_KEY) {
      return sendJson(req, res, 500, { error: "Missing OPENROUTER_API_KEY." });
    }
    if (isOpenAI && !OPENAI_API_KEY) {
      return sendJson(req, res, 500, { error: "Missing OPENAI_API_KEY." });
    }

    try {
      const body = await readRequestBody(req);
      const payload = body ? JSON.parse(body) : {};
      const rawMessages = Array.isArray(payload.messages) ? payload.messages : [];
      const language = payload.lang === "fr" ? "French" : "English";
      const siteContext = typeof payload.siteContext === "string" ? payload.siteContext.trim() : "";

      const messages = rawMessages
        .filter((item) => item && typeof item.content === "string")
        .map((item) => ({ role: item.role, content: item.content }))
        .slice(-12);

      const requestBody = {
        temperature: 0,
        max_tokens: 400,
        messages: [{ role: "system", content: buildSystemPrompt(language, siteContext) }, ...messages]
      };

      const apiUrl = isOpenAI
        ? "https://api.openai.com/v1/chat/completions"
        : "https://openrouter.ai/api/v1/chat/completions";
      const headers = isOpenAI
        ? {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        : {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": req.headers.origin || `http://${req.headers.host}`,
            "X-Title": "RAPTOR [X] Site Chat"
          };

      const providerResponse = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...requestBody,
          model: isOpenAI ? OPENAI_MODEL : OPENROUTER_MODEL
        })
      });

      const providerData = await providerResponse.json();
      if (!providerResponse.ok) {
        const providerName = isOpenAI ? "OpenAI" : "OpenRouter";
        return sendJson(req, res, providerResponse.status, {
          error: providerData.error?.message || `${providerName} request failed.`
        });
      }

      const reply = providerData.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return sendJson(req, res, 502, { error: "No response content received." });
      }

      return sendJson(req, res, 200, { reply });
    } catch (error) {
      return sendJson(req, res, 500, { error: error.message || "Server error." });
    }
  }

  if (requestUrl.pathname === "/api/register") {
    if (req.method === "OPTIONS") {
      return sendJson(req, res, 204, {});
    }

    if (req.method !== "POST") {
      return sendJson(req, res, 405, { error: "Method not allowed." });
    }

    try {
      const body = await readRequestBody(req);
      const payload = body ? JSON.parse(body) : {};
      const form = payload.form || {};
      const fields = payload.fields || {};
      const googleFormActionUrl = payload.googleFormActionUrl || "";
      const lang = payload.lang === "fr" ? "fr" : "en";

      const params = new URLSearchParams();
      Object.entries(fields).forEach(([key, entryId]) => {
        if (!entryId) return;
        const value = form[key];
        if (Array.isArray(value)) {
          value.filter(Boolean).forEach((item) => params.append(entryId, item));
        } else if (value) {
          params.append(entryId, value);
        }
      });

      let formStatus = "failed";
      let formError = "";
      let formTarget = "google_form";
      let formSubmitted = false;

      const canUseGoogleForm = Boolean(
        googleFormActionUrl && googleFormActionUrl.startsWith("https://docs.google.com/forms/")
      );

      if (canUseGoogleForm) {
        try {
          const formResponse = await fetch(googleFormActionUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
          });
          if (!formResponse.ok) {
            throw new Error(`Google Form submission failed (${formResponse.status}).`);
          }
          formSubmitted = true;
          formStatus = "submitted";
        } catch (error) {
          formStatus = "failed";
          formError = error.message || "Google Form submission failed.";
        }
      } else {
        formError = "Invalid Google Form action URL.";
      }

      if (!formSubmitted && GOOGLE_SCRIPT_URL) {
        formTarget = "google_script";
        try {
          await submitToGoogleScript({
            form,
            lang,
            source: "raptorx-site",
            meta: {
              origin: req.headers.origin || "",
              userAgent: req.headers["user-agent"] || ""
            }
          });
          formSubmitted = true;
          formStatus = "submitted";
          formError = "";
        } catch (error) {
          formStatus = "failed";
          formError = error.message || "Google Sheet sync failed.";
        }
      }

      const name = form.entrant_name_dob || "";
      const email = form.email || "";
      const formSummary = Object.entries(form)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
        .join("\n");

      let emailStatus = "skipped";
      try {
        const emailResult = await sendConfirmationEmail({
          to: email,
          name,
          lang,
          formSummary,
          origin: req.headers.origin || ""
        });
        emailStatus = emailResult.status;
      } catch (error) {
        emailStatus = "failed";
      }

      return sendJson(req, res, 200, {
        status: "ok",
        formStatus,
        formTarget,
        ...(formError ? { formError } : {}),
        emailStatus
      });
    } catch (error) {
      return sendJson(req, res, 500, { error: error.message || "Server error." });
    }
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Method not allowed.");
  }

  let filePath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  filePath = decodeURIComponent(filePath);
  const resolvedPath = path.join(ROOT_DIR, filePath);

  if (!resolvedPath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Forbidden.");
  }

  fs.stat(resolvedPath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Not found.");
    }

    const ext = path.extname(resolvedPath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(resolvedPath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`RAPTOR [X] server running at http://localhost:${PORT}`);
});
