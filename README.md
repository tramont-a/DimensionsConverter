# Dimensions Converter Chrome Extension

A Chrome extension that converts imperial units to metric units when you highlight text containing dimensions on any web page. The conversion results appear in a beautiful sticky note panel on the top right of your browser.

## Features

- **Auto-detection**: Automatically detects imperial units in highlighted text
- **Instant Conversion**: Converts to metric units with a single click (highlight)
- **Sticky Note Panel**: Results appear in an elegant floating panel on the top right
- **Multiple Units Supported**: 
  - Length: inches, feet, yards, miles
  - Weight: pounds, ounces, tons
  - Temperature: Fahrenheit to Celsius
  - Area: square inches, square feet, square yards, square miles
- **Copy to Clipboard**: One-click copy of converted values
- **Draggable Panel**: Move the panel anywhere on the screen
- **Auto-dismiss**: Panel automatically closes after 10 seconds
- **Clean Design**: Modern gradient UI with smooth animations

## Supported Unit Conversions

### Length
- inch/inches/in → cm
- foot/feet/ft → cm  
- yard/yards/yd → m
- mile/miles/mi → km

### Weight
- pound/pounds/lb/lbs → kg
- ounce/ounces/oz → g
- ton/tons → kg

### Temperature
- Fahrenheit/°F/F → Celsius/°C

### Area
- square inch/in² → cm²
- square foot/ft² → m²
- square yard/yd² → m²
- square mile/mi² → km²

## Installation

1. **Clone or Download** this repository
   ```
   git clone <repository-url>
   ```

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right corner)

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the extension folder
   - Select and open the folder

4. **Verify Installation**
   - You should see "Dimensions Converter" in your extensions list
   - The extension icon should appear in your toolbar

## Usage

1. **Highlight Text**: Select any text on a web page that contains dimensions with imperial units
   
2. **View Conversions**: A sticky note panel automatically appears on the top right showing:
   - Original measurement
   - Converted metric value
   - Copy button for each conversion

3. **Copy Results**: Click the "Copy" button to copy the converted value to your clipboard

4. **Move Panel**: Click and drag the header to move the panel anywhere on screen

5. **Close Panel**: Click the "✕" button or wait 10 seconds for auto-dismiss

## Examples

- Highlight "6 feet" → See "183.36cm"
- Highlight "200 pounds" → See "90.72kg"
- Highlight "68°F" → See "20.00°C"
- Highlight "5 miles" → See "8.05km"

## File Structure

```
DimensionsCoverter/
├── manifest.json          # Extension configuration
├── content_script.js      # Main conversion logic & UI
├── background.js          # Background service worker
├── styles.css            # Styling for the floating panel
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Technical Details

- **Content Script**: Runs on all web pages and detects text selection
- **Unit Recognition**: Uses regex patterns to identify measurements
- **Conversion Calculation**: Precise mathematical conversions with proper rounding
- **UI Framework**: Pure JavaScript with CSS animations
- **Performance**: Lightweight with minimal memory footprint

## Troubleshooting

### Extension not detecting text
- Make sure you're highlighting actual text containing units (e.g., "6 feet", "50 pounds")
- Try refreshing the page after installing the extension
- Verify the extension is enabled in `chrome://extensions/`

### Conversion not appearing
- Check that the unit format matches supported formats (see Supported Units section)
- Ensure the number and unit are together (e.g., "5 inches" works, "5 i" doesn't)

### Panel styling issues
- This is unlikely as styles are injected directly
- Clear browser cache: `Ctrl+Shift+Delete`
- Reload the extension in `chrome://extensions/`

## Future Enhancements

- Support for more unit types (volume, pressure, etc.)
- Reverse conversion (metric to imperial)
- User preferences and settings page
- Keyboard shortcut for quick access
- Theme customization options

## License

This extension is provided as-is for personal use.

## Support

For issues or feature requests, please check the manifest.json and ensure all files are in the correct directory structure.
