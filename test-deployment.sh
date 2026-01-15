#!/bin/bash

# RAPTOR [X] Deployment Test Script
# Usage: bash test-deployment.sh

echo "🚀 RAPTOR [X] Deployment Test Suite"
echo "===================================="
echo ""

DOMAIN="scaterraptorx.eu"
API_DOMAIN="api.scaterraptorx.eu"
WEBSITE_URL="https://$DOMAIN"
API_HEALTH_URL="https://$API_DOMAIN/api/health"
API_CHAT_URL="https://$API_DOMAIN/api/chat"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: DNS Resolution
echo -e "${BLUE}TEST 1: DNS Resolution${NC}"
echo "Testing $DOMAIN..."
DNS_RESULT=$(dig +short $DOMAIN A | head -1)
if [ -n "$DNS_RESULT" ]; then
    echo -e "${GREEN}✅ Website DNS resolves to: $DNS_RESULT${NC}"
else
    echo -e "${RED}❌ Website DNS not resolving${NC}"
fi

echo ""
echo "Testing api.$DOMAIN..."
API_DNS_RESULT=$(dig +short $API_DOMAIN CNAME | head -1)
if [ -n "$API_DNS_RESULT" ]; then
    echo -e "${GREEN}✅ API DNS CNAME points to: $API_DNS_RESULT${NC}"
else
    echo -e "${YELLOW}⚠️  API DNS CNAME not found (may not be configured yet)${NC}"
fi

# Test 2: Website Availability
echo ""
echo -e "${BLUE}TEST 2: Website Availability${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $WEBSITE_URL)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Website responds with 200 OK${NC}"
else
    echo -e "${YELLOW}⚠️  Website returned HTTP $HTTP_CODE${NC}"
fi

# Test 3: API Health Check
echo ""
echo -e "${BLUE}TEST 3: API Health Endpoint${NC}"
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" $API_HEALTH_URL)
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -1)
BODY=$(echo "$HEALTH_RESPONSE" | head -1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ API health check returned 200 OK${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}❌ API health check returned HTTP $HTTP_CODE${NC}"
fi

# Test 4: API Chat
echo ""
echo -e "${BLUE}TEST 4: API Chat Endpoint${NC}"
CHAT_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $API_CHAT_URL \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi RAPTOR"}],"lang":"en","siteContext":"RAPTOR [X] skateboard"}')

HTTP_CODE=$(echo "$CHAT_RESPONSE" | tail -1)
BODY=$(echo "$CHAT_RESPONSE" | head -1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ API chat returned 200 OK${NC}"
    REPLY=$(echo "$BODY" | grep -o '"reply":"[^"]*"' | head -1)
    echo "Sample response: ${REPLY:0:80}..."
else
    echo -e "${RED}❌ API chat returned HTTP $HTTP_CODE${NC}"
    echo "Error: $BODY"
fi

# Test 5: HTTPS
echo ""
echo -e "${BLUE}TEST 5: HTTPS/SSL Certificate${NC}"
CERT_INFO=$(curl -s -I $WEBSITE_URL | grep -i "strict-transport")
if [ -n "$CERT_INFO" ]; then
    echo -e "${GREEN}✅ HTTPS is enforced${NC}"
else
    echo -e "${YELLOW}⚠️  HTTPS enforcement may not be active yet${NC}"
fi

echo ""
echo "===================================="
echo "🎉 Test Complete!"
echo ""
echo "Note: If any tests fail, wait a few minutes for DNS propagation and retry."
