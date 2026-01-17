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

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
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

const buildSystemPrompt = (language, siteContext) => `You are the RAPTOR [X] brand concierge for street skateboarding.
Stay professional, smooth, and confident. Focus on skateboarding, street culture, streetwear, gear setups, and RAPTOR [X] brand drops.

Mandatory response rules:
1) Always scan and review ALL SITE CONTEXT (full page content) before answering.
2) Normalize user intent first. If two questions share the same intent, respond with the SAME wording and structure every time.
3) Use the SITE CONTEXT as the single source of truth. Do NOT invent or guess details.
4) If information is missing or ambiguous, say it is not available on the website and ask a clarifying question.

Visual & icon rules:
1) If relevant images exist in SITE CONTEXT, include them in the answer as full URLs on their own lines, prefixed with "Image: ".
2) Never crop or alter images; only provide the original URL.
3) Use helpful icons/emojis when appropriate: apparel 👕🧥, shoes 👟, skateboard 🛹, gear 🧰, events 📅, location 📍, time ⏰, price 💸.

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

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/health") {
    if (req.method === "OPTIONS") {
      return sendJson(res, 204, {});
    }
    if (req.method !== "GET") {
      return sendJson(res, 405, { error: "Method not allowed." });
    }

    const isOpenAI = AI_PROVIDER === "openai";
    const isOpenRouter = AI_PROVIDER === "openrouter";
    if (!isOpenAI && !isOpenRouter) {
      return sendJson(res, 500, {
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

    return sendJson(res, 200, {
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
      return sendJson(res, 204, {});
    }

    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed." });
    }

    const isOpenAI = AI_PROVIDER === "openai";
    const isOpenRouter = AI_PROVIDER === "openrouter";
    if (!isOpenAI && !isOpenRouter) {
      return sendJson(res, 500, { error: "Invalid AI_PROVIDER. Use openrouter or openai." });
    }
    if (isOpenRouter && !OPENROUTER_API_KEY) {
      return sendJson(res, 500, { error: "Missing OPENROUTER_API_KEY." });
    }
    if (isOpenAI && !OPENAI_API_KEY) {
      return sendJson(res, 500, { error: "Missing OPENAI_API_KEY." });
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
        return sendJson(res, providerResponse.status, {
          error: providerData.error?.message || `${providerName} request failed.`
        });
      }

      const reply = providerData.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return sendJson(res, 502, { error: "No response content received." });
      }

      return sendJson(res, 200, { reply });
    } catch (error) {
      return sendJson(res, 500, { error: error.message || "Server error." });
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
