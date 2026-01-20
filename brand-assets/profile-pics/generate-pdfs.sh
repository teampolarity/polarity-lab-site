#!/bin/bash

# Generate PDF profile pictures from HTML templates
# Uses headless Chrome to print HTML to PDF

echo "🎨 Generating PDF profile pictures for all subsidiaries..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define files to convert (input:output pairs)
FILES=(
  "polarity-lab/polarity-icon-400x400.html:polarity-lab/polarity-icon-400x400.pdf"
  "polarity-lab/polarity-wordmark-400x400.html:polarity-lab/polarity-wordmark-400x400.pdf"
  "polarity-app/polarity-app-icon-400x400.html:polarity-app/polarity-app-icon-400x400.pdf"
  "waxfeed/waxfeed-disc-400x400.html:waxfeed/waxfeed-disc-400x400.pdf"
  "waxfeed/waxfeed-logo-400x400.html:waxfeed/waxfeed-logo-400x400.pdf"
  "waxfeed/waxfeed-full-logo-400x400.html:waxfeed/waxfeed-full-logo-400x400.pdf"
  "avdp/avdp-logo-400x400.html:avdp/avdp-logo-400x400.pdf"
)

# Check if Chrome is available
CHROME_PATH=""
if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif [ -x "/Applications/Chromium.app/Contents/MacOS/Chromium" ]; then
  CHROME_PATH="/Applications/Chromium.app/Contents/MacOS/Chromium"
elif command -v chromium &> /dev/null; then
  CHROME_PATH="chromium"
elif command -v google-chrome &> /dev/null; then
  CHROME_PATH="google-chrome"
else
  echo "❌ Chrome/Chromium not found!"
  echo ""
  echo "📋 Manual instructions:"
  echo "1. Open each HTML file in Chrome/Safari"
  echo "2. Press Cmd+P to print"
  echo "3. Select 'Save as PDF'"
  echo "4. Set margins to 'None'"
  echo "5. Save in the same folder as the HTML"
  echo ""
  exit 1
fi

echo "✅ Found Chrome at: $CHROME_PATH"
echo ""

# Generate PDFs
for file_pair in "${FILES[@]}"; do
  html_file="${file_pair%%:*}"
  pdf_file="${file_pair##*:}"
  html_path="$SCRIPT_DIR/$html_file"
  pdf_path="$SCRIPT_DIR/$pdf_file"
  
  echo "📄 Generating: $pdf_file"
  
  "$CHROME_PATH" \
    --headless \
    --disable-gpu \
    --print-to-pdf="$pdf_path" \
    --print-to-pdf-no-header \
    --no-margins \
    "file://$html_path" \
    2>/dev/null
  
  if [ -f "$pdf_path" ]; then
    echo "   ✅ Created: $(basename "$pdf_path")"
  else
    echo "   ❌ Failed: $(basename "$pdf_path")"
  fi
done

echo ""
echo "🎉 PDF generation complete!"
echo ""
echo "📁 Location: brand-assets/profile-pics/"
echo ""
echo "Generated files:"
echo "  🔴 Polarity Lab"
echo "     - polarity-icon-400x400.pdf"
echo "     - polarity-wordmark-400x400.pdf"
echo "  🔵 Polarity App"
echo "     - polarity-app-icon-400x400.pdf"
echo "  🎵 Waxfeed"
echo "     - waxfeed-disc-400x400.pdf"
echo "     - waxfeed-logo-400x400.pdf"
echo "     - waxfeed-full-logo-400x400.pdf (with purple tab)"
echo "  📹 AVDP"
echo "     - avdp-logo-400x400.pdf"
echo ""
