/**
 * Extract placeholders from page elements
 */
function extractPlaceholders(pageElements) {
  let placeholders = [];

  pageElements.forEach(element => {
    try {
      const elementType = element.getPageElementType();
      let placeholderType = null;
      let placeholderIndex = null;

      // Check if element is a Shape with placeholder
      if (elementType === SlidesApp.PageElementType.SHAPE) {
        const shape = element.asShape();
        placeholderType = shape.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = shape.getPlaceholderIndex();
        }
      }
      // Check if element is an Image with placeholder
      else if (elementType === SlidesApp.PageElementType.IMAGE) {
        const image = element.asImage();
        placeholderType = image.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = image.getPlaceholderIndex();
        }
      }
      // Check if element is a Table with placeholder
      else if (elementType === SlidesApp.PageElementType.TABLE) {
        const table = element.asTable();
        placeholderType = table.getPlaceholderType();
        if (placeholderType) {
          placeholderIndex = table.getPlaceholderIndex();
        }
      }

      if (placeholderType) {
        placeholders.push({
          type: placeholderType.toString(),
          index: placeholderIndex
        });
      }
    } catch (e) {
      // Skip elements that cause errors
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
