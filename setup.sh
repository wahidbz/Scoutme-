#!/bin/bash

# 🏆 ScoutMe - Quick Setup Script
# ================================

echo "🏆 ScoutMe - Quick Setup"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check if image folder exists
echo -e "${YELLOW}📁 Checking image folder...${NC}"
if [ ! -d "image" ]; then
    echo "Creating image folder..."
    mkdir -p image/players image/teams image/academies image/shops
    echo -e "${GREEN}✅ Image folders created${NC}"
else
    echo -e "${GREEN}✅ Image folder exists${NC}"
fi

# 2. Check for .env file
echo ""
echo -e "${YELLOW}🔑 Checking environment variables...${NC}"
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env and add your API keys!${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# 3. Create logo placeholder if doesn't exist
echo ""
echo -e "${YELLOW}🖼️  Checking logo...${NC}"
if [ ! -f "image/logo.png" ]; then
    echo "Creating logo placeholder..."
    # Create simple SVG as PNG placeholder
    cat > image/logo.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
  <circle cx="60" cy="60" r="60" fill="#1F7A1F"/>
  <text x="60" y="80" font-size="48" fill="#FFD700" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">SM</text>
</svg>
EOF
    echo -e "${GREEN}✅ Logo placeholder created (SVG)${NC}"
else
    echo -e "${GREEN}✅ Logo exists${NC}"
fi

# 4. Summary
echo ""
echo "================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Add your logo to image/logo.png"
echo "3. Update Firebase config in script.js"
echo "4. Run: python3 -m http.server 8000"
echo "5. Open: http://localhost:8000"
echo ""
echo "For deployment:"
echo "- Firebase: firebase deploy"
echo "- Netlify: drag & drop folder"
echo "- Vercel: vercel deploy"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
