#!/bin/bash

# Hostinger Cache Clear Script
# This script attempts to force cache invalidation via multiple methods

echo "🔧 Attempting cache invalidation methods..."
echo "=================================="

# Method 1: Clear via Cloudflare API (if enabled)
echo "1️⃣  Trying CloudFlare purge..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/purge_cache" \
  -H "X-Auth-Email: your_email@example.com" \
  -H "X-Auth-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"files":["https://www.scaterraptorx.eu/index.html"]}' 2>/dev/null || echo "❌ CloudFlare API not configured"

echo ""

# Method 2: Hit website with cache-busting headers
echo "2️⃣  Sending cache-bust requests..."
for i in {1..3}; do
  curl -s -I \
    -H "Pragma: no-cache" \
    -H "Cache-Control: no-cache, no-store, must-revalidate, max-age=0" \
    -H "Expires: Thu, 01 Jan 1970 00:00:00 GMT" \
    https://www.scaterraptorx.eu > /dev/null
  echo "   Request $i sent..."
  sleep 1
done

echo ""

# Method 3: Check current version
echo "3️⃣  Checking current version..."
VERSION=$(curl -s https://www.scaterraptorx.eu | grep -o "v2.0\|floatDistance" | head -1)
if [ -z "$VERSION" ]; then
  echo "❌ Still old version - Hostinger cache active"
else
  echo "✅ New version detected!"
fi

echo ""
echo "=================================="
echo "⚠️  If still seeing old version, you MUST manually:"
echo "   1. Go to: https://hpanel.hostinger.com"
echo "   2. Select domain: scaterraptorx.eu"
echo "   3. Find: Performance / CDN / Caching section"
echo "   4. Click: 'Clear All Cache' or 'Purge Cache'"
echo "   5. Wait 2-3 minutes"
echo "   6. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
