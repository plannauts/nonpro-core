function analyzeMasterLayouts() {
  const presentation = SlidesApp.getActivePresentation();
  const layouts = presentation.getLayouts();

  console.log("=== Layout Analysis Start ===");

  layouts.forEach((layout, index) => {
    const name = layout.getLayoutName();
    const shapes = layout.getPageElements();
    let placeholders = [];

    shapes.forEach(shape => {
      try {
        const placeholderType = shape.getPlaceholderType();
        if (placeholderType) {
          placeholders.push({
            type: placeholderType.toString(),
            index: shape.getPlaceholderIndex()
          });
        }
      } catch (e) {
        // Not a placeholder, skip
      }
    });

    console.log(`[${index}] Name: "${name}"`);
    if (placeholders.length > 0) {
      console.log(`    Placeholders: ${placeholders.map(p => `${p.type}(${p.index})`).join(', ')}`);
    } else {
      console.log(`    (No Placeholders)`);
    }
  });

  console.log("=== Layout Analysis End ===");
}
