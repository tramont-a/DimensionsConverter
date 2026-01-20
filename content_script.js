// Unit conversion mappings
const conversionRules = {
  // Length
  'inch': { metric: 'cm', factor: 2.54, abbr: 'in' },
  'inches': { metric: 'cm', factor: 2.54, abbr: 'in' },
  'in': { metric: 'cm', factor: 2.54, abbr: 'in' },
  'foot': { metric: 'cm', factor: 30.48, abbr: 'ft' },
  'feet': { metric: 'cm', factor: 30.48, abbr: 'ft' },
  'ft': { metric: 'cm', factor: 30.48, abbr: 'ft' },
  'mile': { metric: 'km', factor: 1.60934, abbr: 'mi' },
  'miles': { metric: 'km', factor: 1.60934, abbr: 'mi' },
  'mi': { metric: 'km', factor: 1.60934, abbr: 'mi' },
  'yard': { metric: 'm', factor: 0.9144, abbr: 'yd' },
  'yards': { metric: 'm', factor: 0.9144, abbr: 'yd' },
  'yd': { metric: 'm', factor: 0.9144, abbr: 'yd' },

  // Weight
  'pound': { metric: 'kg', factor: 0.453592, abbr: 'lb' },
  'pounds': { metric: 'kg', factor: 0.453592, abbr: 'lb' },
  'lb': { metric: 'kg', factor: 0.453592, abbr: 'lb' },
  'lbs': { metric: 'kg', factor: 0.453592, abbr: 'lb' },
  'ounce': { metric: 'g', factor: 28.3495, abbr: 'oz' },
  'ounces': { metric: 'g', factor: 28.3495, abbr: 'oz' },
  'oz': { metric: 'g', factor: 28.3495, abbr: 'oz' },
  'ton': { metric: 'kg', factor: 907.185, abbr: 'ton' },
  'tons': { metric: 'kg', factor: 907.185, abbr: 'ton' },

  // Temperature
  'fahrenheit': { metric: 'celsius', type: 'temp', abbr: '°F' },
  '°f': { metric: 'celsius', type: 'temp', abbr: '°F' },
  'f': { metric: 'celsius', type: 'temp', abbr: '°F' },

  // Area
  'square inch': { metric: 'cm²', factor: 6.4516, abbr: 'in²' },
  'square foot': { metric: 'm²', factor: 0.092903, abbr: 'ft²' },
  'square yard': { metric: 'm²', factor: 0.836127, abbr: 'yd²' },
  'square mile': { metric: 'km²', factor: 2.58999, abbr: 'mi²' }
};

// Create a list of unique units organized by type
const unitsByType = {
  'Length': [
    { name: 'inch', abbr: 'in' },
    { name: 'foot', abbr: 'ft' },
    { name: 'yard', abbr: 'yd' },
    { name: 'mile', abbr: 'mi' },
    { name: 'centimeter', abbr: 'cm' },
    { name: 'meter', abbr: 'm' },
    { name: 'kilometer', abbr: 'km' }
  ],
  'Weight': [
    { name: 'pound', abbr: 'lb' },
    { name: 'ounce', abbr: 'oz' },
    { name: 'ton', abbr: 'ton' },
    { name: 'gram', abbr: 'g' },
    { name: 'kilogram', abbr: 'kg' }
  ],
  'Temperature': [
    { name: 'Fahrenheit', abbr: '°F' },
    { name: 'Celsius', abbr: '°C' }
  ],
  'Area': [
    { name: 'square inch', abbr: 'in²' },
    { name: 'square foot', abbr: 'ft²' },
    { name: 'square yard', abbr: 'yd²' },
    { name: 'square mile', abbr: 'mi²' },
    { name: 'square centimeter', abbr: 'cm²' },
    { name: 'square meter', abbr: 'm²' },
    { name: 'square kilometer', abbr: 'km²' }
  ]
};

// Function to convert temperature
function convertTemperature(value) {
  const celsius = (value - 32) * 5 / 9;
  return celsius.toFixed(2);
}

// Function to parse and convert units while preserving format
function parseAndConvertPreservingFormat(text) {
  const unitPattern = /(\d+\.?\d*)\s*([a-zA-Z°]+(?:\s+[a-zA-Z°]+)?)/g;
  let conversions = [];
  let match;
  let hasConversions = false;

  while ((match = unitPattern.exec(text)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase().trim();
    
    // Try to find matching unit in conversion rules
    for (const [key, conversion] of Object.entries(conversionRules)) {
      if (unit.includes(key) || key.includes(unit)) {
        hasConversions = true;
        let convertedValue;
        if (conversion.type === 'temp') {
          convertedValue = convertTemperature(value);
        } else {
          convertedValue = (value * conversion.factor).toFixed(2);
        }
        
        conversions.push({
          original: match[0],
          value: value,
          convertedValue: convertedValue,
          unit: conversion.abbr,
          metricUnit: conversion.metric,
          isTemp: conversion.type === 'temp'
        });
        break;
      }
    }
  }

  if (hasConversions && conversions.length > 0) {
    // Create format-preserved string
    let formattedResult = text;
    // Replace from the end to the beginning to maintain indices
    for (let i = conversions.length - 1; i >= 0; i--) {
      const conv = conversions[i];
      const replacement = conv.isTemp ? 
        `${conv.convertedValue}°C` : 
        `${conv.convertedValue}${conv.metricUnit}`;
      formattedResult = formattedResult.replace(conv.original, replacement);
    }
    
    return {
      formatted: formattedResult,
      conversions: conversions
    };
  }

  return null;
}

// Function to parse and convert units
function parseAndConvert(text) {
  // Regex to find numbers followed by unit names
  const unitPattern = /(\d+\.?\d*)\s*([a-zA-Z°]+(?:\s+[a-zA-Z°]+)?)/g;
  let matches = [];
  let match;

  while ((match = unitPattern.exec(text)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase().trim();
    
    // Try to find matching unit in conversion rules
    for (const [key, conversion] of Object.entries(conversionRules)) {
      if (unit.includes(key) || key.includes(unit)) {
        let result;
        if (conversion.type === 'temp') {
          const convertedValue = convertTemperature(value);
          result = {
            original: `${value}${conversion.abbr}`,
            value: value,
            unit: conversion.abbr,
            metric: convertedValue,
            metricUnit: conversion.metric,
            converted: `${convertedValue}°C`
          };
        } else {
          const convertedValue = (value * conversion.factor).toFixed(2);
          result = {
            original: `${value}${conversion.abbr}`,
            value: value,
            unit: conversion.abbr,
            metric: convertedValue,
            metricUnit: conversion.metric,
            converted: `${convertedValue}${conversion.metric}`
          };
        }
        matches.push(result);
        break;
      }
    }
  }

  return matches;
}

// Track current panel state to prevent duplicate panels
let currentPanel = null;
let lastHighlightedText = null;

// Function to create and display the floating panel
function displayFloatingPanel(conversions, formattedResult = null) {
  // Remove existing panel if present
  const existingPanel = document.getElementById('dimensions-converter-panel');
  if (existingPanel) {
    existingPanel.classList.add('hidden');
    setTimeout(() => existingPanel.remove(), 300);
  }

  // Create panel container
  const panel = document.createElement('div');
  panel.id = 'dimensions-converter-panel';
  panel.className = 'dimensions-converter-panel';
  currentPanel = panel;

  // Create header with title and close button
  const header = document.createElement('div');
  header.className = 'converter-header converter-drag-handle';
  header.innerHTML = '<span class="converter-title">📏 Conversions</span>';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'converter-close';
  closeBtn.innerHTML = '✕';
  closeBtn.onclick = () => {
    panel.classList.add('hidden');
    setTimeout(() => {
      panel.remove();
      currentPanel = null;
      lastHighlightedText = null;
    }, 300);
  };
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Add formatted result if available
  if (formattedResult) {
    const formattedItem = document.createElement('div');
    formattedItem.className = 'converter-item converter-formatted-item';
    
    const formattedLabel = document.createElement('div');
    formattedLabel.className = 'converter-original';
    formattedLabel.textContent = 'Format Preserved:';
    formattedLabel.style.fontSize = '11px';
    formattedLabel.style.opacity = '0.8';
    
    const formattedValue = document.createElement('div');
    formattedValue.className = 'converter-converted';
    formattedValue.innerHTML = `
      <span>${formattedResult}</span>
      <button class="converter-copy-btn" title="Copy to clipboard">Copy</button>
    `;
    
    const copyBtn = formattedValue.querySelector('.converter-copy-btn');
    copyBtn.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(formattedResult).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    };
    
    formattedItem.appendChild(formattedLabel);
    formattedItem.appendChild(formattedValue);
    panel.appendChild(formattedItem);

    // Add a divider
    const divider = document.createElement('div');
    divider.style.height = '1px';
    divider.style.background = 'rgba(255, 255, 255, 0.2)';
    divider.style.margin = '8px 0';
    panel.appendChild(divider);
  }

  // Create conversion items
  conversions.forEach((conversion) => {
    const item = document.createElement('div');
    item.className = 'converter-item';
    
    const original = document.createElement('div');
    original.className = 'converter-original';
    original.textContent = `${conversion.original}`;
    
    const converted = document.createElement('div');
    converted.className = 'converter-converted';
    converted.innerHTML = `
      <span>${conversion.converted}</span>
      <button class="converter-copy-btn" title="Copy to clipboard">Copy</button>
    `;
    
    const copyBtn = converted.querySelector('.converter-copy-btn');
    copyBtn.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(conversion.converted).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    };
    
    item.appendChild(original);
    item.appendChild(converted);
    panel.appendChild(item);
  });

  // Add drag functionality
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      panel.style.left = (e.clientX - offset.x) + 'px';
      panel.style.top = (e.clientY - offset.y) + 'px';
      panel.style.right = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Add panel to page
  document.body.appendChild(panel);

  // Auto-close after 10 seconds
  setTimeout(() => {
    if (panel.parentElement) {
      panel.classList.add('hidden');
      setTimeout(() => {
        panel.remove();
        currentPanel = null;
        lastHighlightedText = null;
      }, 300);
    }
  }, 10000);
}

// Function to perform manual conversion
function performManualConversion(fromValue, fromUnit, toUnit) {
  fromValue = parseFloat(fromValue);
  if (isNaN(fromValue)) return null;

  // Find conversion path from fromUnit to toUnit
  let result = null;

  if (fromUnit === 'Fahrenheit' || fromUnit === '°F') {
    if (toUnit === 'Celsius' || toUnit === '°C') {
      result = ((fromValue - 32) * 5 / 9).toFixed(2);
    }
  } else if (fromUnit === 'Celsius' || fromUnit === '°C') {
    if (toUnit === 'Fahrenheit' || toUnit === '°F') {
      result = ((fromValue * 9 / 5) + 32).toFixed(2);
    }
  } else {
    // For non-temperature conversions, convert through a base unit (cm, g, cm²)
    let baseValue = fromValue;
    let baseUnit = '';

    // Convert to base unit first
    const conversionMap = {
      'in': { base: 'cm', factor: 2.54 },
      'ft': { base: 'cm', factor: 30.48 },
      'yd': { base: 'm', factor: 0.9144 },
      'mi': { base: 'km', factor: 1.60934 },
      'cm': { base: 'cm', factor: 1 },
      'm': { base: 'm', factor: 1 },
      'km': { base: 'km', factor: 1 },
      'lb': { base: 'kg', factor: 0.453592 },
      'oz': { base: 'g', factor: 28.3495 },
      'ton': { base: 'kg', factor: 907.185 },
      'g': { base: 'g', factor: 1 },
      'kg': { base: 'kg', factor: 1 },
      'in²': { base: 'cm²', factor: 6.4516 },
      'ft²': { base: 'm²', factor: 0.092903 },
      'yd²': { base: 'm²', factor: 0.836127 },
      'mi²': { base: 'km²', factor: 2.58999 },
      'cm²': { base: 'cm²', factor: 1 },
      'm²': { base: 'm²', factor: 1 },
      'km²': { base: 'km²', factor: 1 }
    };

    const fromConv = conversionMap[fromUnit];
    const toConv = conversionMap[toUnit];

    if (fromConv && toConv && fromConv.base === toConv.base) {
      baseValue = fromValue * fromConv.factor;
      result = (baseValue / toConv.factor).toFixed(2);
    }
  }

  return result;
}

// Function to display manual converter panel
function displayManualConverterPanel() {
  // Remove existing panel if present
  const existingPanel = document.getElementById('dimensions-converter-panel');
  if (existingPanel) {
    existingPanel.classList.add('hidden');
    setTimeout(() => existingPanel.remove(), 300);
  }

  // Create panel container
  const panel = document.createElement('div');
  panel.id = 'dimensions-converter-panel';
  panel.className = 'dimensions-converter-panel';
  currentPanel = panel;

  // Create header
  const header = document.createElement('div');
  header.className = 'converter-header converter-drag-handle';
  header.innerHTML = '<span class="converter-title">📏 Manual Converter</span>';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'converter-close';
  closeBtn.innerHTML = '✕';
  closeBtn.onclick = () => {
    panel.classList.add('hidden');
    setTimeout(() => {
      panel.remove();
      currentPanel = null;
    }, 300);
  };
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Create input section
  const inputSection = document.createElement('div');
  inputSection.className = 'converter-input-section';

  // From unit section
  const fromGroup = document.createElement('div');
  fromGroup.className = 'converter-group';
  fromGroup.innerHTML = '<label class="converter-label">From:</label>';
  
  const fromInput = document.createElement('input');
  fromInput.type = 'number';
  fromInput.className = 'converter-input';
  fromInput.placeholder = '0.0';
  fromInput.step = '0.01';

  const fromUnitSelect = document.createElement('select');
  fromUnitSelect.className = 'converter-select';
  
  // Add unit options
  for (const [type, units] of Object.entries(unitsByType)) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = type;
    units.forEach(unit => {
      const option = document.createElement('option');
      option.value = unit.abbr;
      option.textContent = `${unit.name} (${unit.abbr})`;
      optgroup.appendChild(option);
    });
    fromUnitSelect.appendChild(optgroup);
  }

  fromGroup.appendChild(fromInput);
  fromGroup.appendChild(fromUnitSelect);
  inputSection.appendChild(fromGroup);

  // To unit section
  const toGroup = document.createElement('div');
  toGroup.className = 'converter-group';
  toGroup.innerHTML = '<label class="converter-label">To:</label>';
  
  const toUnitSelect = document.createElement('select');
  toUnitSelect.className = 'converter-select';
  
  // Add unit options
  for (const [type, units] of Object.entries(unitsByType)) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = type;
    units.forEach(unit => {
      const option = document.createElement('option');
      option.value = unit.abbr;
      option.textContent = `${unit.name} (${unit.abbr})`;
      optgroup.appendChild(option);
    });
    toUnitSelect.appendChild(optgroup);
  }

  toGroup.appendChild(toUnitSelect);
  inputSection.appendChild(toGroup);
  panel.appendChild(inputSection);

  // Result section
  const resultSection = document.createElement('div');
  resultSection.className = 'converter-result-section';
  resultSection.innerHTML = '<div class="converter-result">Enter a value to convert</div>';
  panel.appendChild(resultSection);

  // Handle conversions
  const updateResult = () => {
    const value = fromInput.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    if (!value || value === '') {
      resultSection.innerHTML = '<div class="converter-result">Enter a value to convert</div>';
      return;
    }

    const result = performManualConversion(value, fromUnit, toUnit);
    if (result !== null) {
      const resultHTML = `
        <div class="converter-result-item">
          <div class="converter-result-text">${value}${fromUnit} = <strong>${result}${toUnit}</strong></div>
          <button class="converter-copy-btn" title="Copy to clipboard">Copy</button>
        </div>
      `;
      resultSection.innerHTML = resultHTML;
      
      const copyBtn = resultSection.querySelector('.converter-copy-btn');
      copyBtn.onclick = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${result}${toUnit}`).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        });
      };
    }
  };

  fromInput.addEventListener('input', updateResult);
  fromUnitSelect.addEventListener('change', updateResult);
  toUnitSelect.addEventListener('change', updateResult);

  // Add drag functionality
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      panel.style.left = (e.clientX - offset.x) + 'px';
      panel.style.top = (e.clientY - offset.y) + 'px';
      panel.style.right = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Add panel to page
  document.body.appendChild(panel);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'DISPLAY_PANEL') {
    displayFloatingPanel(request.data);
  } else if (request.type === 'SHOW_MANUAL_CONVERTER') {
    displayManualConverterPanel();
  }
  sendResponse({});
});

// Listen for text selection
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText && selectedText.length > 0) {
    // Don't show panel again if the same text is still highlighted
    if (selectedText === lastHighlightedText && currentPanel) {
      return;
    }
    
    const conversions = parseAndConvert(selectedText);
    
    if (conversions.length > 0) {
      // Update tracking variables
      lastHighlightedText = selectedText;
      
      // Check if format can be preserved (multiple dimensions)
      const formatResult = parseAndConvertPreservingFormat(selectedText);
      const formattedString = formatResult ? formatResult.formatted : null;
      
      // Display panel with both individual and format-preserved conversions
      displayFloatingPanel(conversions, formattedString);
    }
  } else {
    // Clear tracking when selection is cleared
    lastHighlightedText = null;
  }
});
