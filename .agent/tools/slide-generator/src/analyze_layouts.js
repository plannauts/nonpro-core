/**
 * Extract placeholders from page elements (with debug info)
 */
function extractPlaceholders(pageElements, debug = false) {
  let placeholders = [];

  pageElements.forEach((element, idx) => {
    try {
      const elementType = element.getPageElementType();

      if (debug) {
        console.log(`  Element[${idx}] Type: ${elementType}`);
      }

      let placeholderType = null;
      let placeholderIndex = null;

      // Check if element is a Shape with placeholder
      if (elementType === SlidesApp.PageElementType.SHAPE) {
        const shape = element.asShape();
        placeholderType = shape.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = shape.getPlaceholderIndex();
        }
        if (debug) {
          if (placeholderType) {
            console.log(`    -> Shape with placeholder: ${placeholderType}(${placeholderIndex})`);
          } else {
            console.log(`    -> Shape (no placeholder), ShapeType: ${shape.getShapeType()}`);
          }
        }
      }
      // Check if element is an Image with placeholder
      else if (elementType === SlidesApp.PageElementType.IMAGE) {
        const image = element.asImage();
        placeholderType = image.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = image.getPlaceholderIndex();
        }
        if (debug) {
          if (placeholderType) {
            console.log(`    -> Image with placeholder: ${placeholderType}(${placeholderIndex})`);
          } else {
            console.log(`    -> Image (no placeholder)`);
          }
        }
      }
      // Check if element is a Table with placeholder
      else if (elementType === SlidesApp.PageElementType.TABLE) {
        const table = element.asTable();
        placeholderType = table.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = table.getPlaceholderIndex();
        }
        if (debug) {
          if (placeholderType) {
            console.log(`    -> Table with placeholder: ${placeholderType}(${placeholderIndex})`);
          } else {
            console.log(`    -> Table (no placeholder)`);
          }
        }
      }

      if (placeholderType) {
        placeholders.push({
          type: placeholderType.toString(),
          index: placeholderIndex
        });
      }
    } catch (e) {
      if (debug) {
        console.log(`    -> Error: ${e.message}`);
      }
    }
  });

  return placeholders;
}

/**
 * Analyze master layouts in the presentation
 */
function analyzeMasterLayouts() {
  const presentation = SlidesApp.getActivePresentation();
  const layouts = presentation.getLayouts();

  console.log("=== Master Layout Analysis Start ===");

  layouts.forEach((layout, index) => {
    const name = layout.getLayoutName();
    const shapes = layout.getPageElements();
    const placeholders = extractPlaceholders(shapes);

    console.log(`[${index}] Name: "${name}"`);
    if (placeholders.length > 0) {
      console.log(`    Placeholders: ${placeholders.map(p => `${p.type}(${p.index})`).join(', ')}`);
    } else {
      console.log(`    (No Placeholders)`);
    }
  });

  console.log("=== Master Layout Analysis End ===");
}

/**
 * Analyze actual slides in the presentation
 */
function analyzeSlides() {
  const presentation = SlidesApp.getActivePresentation();
  const slides = presentation.getSlides();

  console.log("=== Slides Analysis Start ===");

  slides.forEach((slide, index) => {
    const shapes = slide.getPageElements();
    const placeholders = extractPlaceholders(shapes);

    console.log(`[Slide ${index + 1}]`);
    if (placeholders.length > 0) {
      console.log(`    Placeholders: ${placeholders.map(p => `${p.type}(${p.index})`).join(', ')}`);
    } else {
      console.log(`    (No Placeholders)`);
    }
  });

  console.log("=== Slides Analysis End ===");
}

/**
 * Analyze master layouts with detailed debug information
 */
function analyzeMasterLayoutsDebug() {
  const presentation = SlidesApp.getActivePresentation();
  const layouts = presentation.getLayouts();

  console.log("=== Master Layout Analysis (DEBUG MODE) Start ===");

  layouts.forEach((layout, index) => {
    const name = layout.getLayoutName();
    const shapes = layout.getPageElements();

    console.log(`[${index}] Layout Name: "${name}"`);
    console.log(`  Total Elements: ${shapes.length}`);

    const placeholders = extractPlaceholders(shapes, true);

    console.log(`  Total Placeholders Found: ${placeholders.length}`);
    if (placeholders.length > 0) {
      console.log(`  Summary: ${placeholders.map(p => `${p.type}(${p.index})`).join(', ')}`);
    }
    console.log('');
  });

  console.log("=== Master Layout Analysis (DEBUG MODE) End ===");
}
