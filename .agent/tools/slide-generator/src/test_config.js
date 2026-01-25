// src/test_config.js

/**
 * Test the CONFIG settings against the actual presentation
 */
function testConfig() {
  console.log("=== CONFIG Test Start ===");

  // Test 1: CONFIG object exists
  console.log("\n[Test 1] Checking CONFIG object...");
  if (typeof CONFIG === 'undefined') {
    console.log("  ❌ FAILED: CONFIG is not defined");
    return;
  }
  console.log("  ✅ PASSED: CONFIG object exists");

  // Test 2: Get actual layouts from presentation
  console.log("\n[Test 2] Loading presentation layouts...");
  const presentation = SlidesApp.getActivePresentation();
  const actualLayouts = presentation.getLayouts();
  const layoutNames = actualLayouts.map(layout => layout.getLayoutName());
  console.log(`  Found ${layoutNames.length} layouts in presentation`);

  // Test 3: Check each defined layout exists in presentation
  console.log("\n[Test 3] Validating layout definitions...");
  let allLayoutsValid = true;

  for (const [key, layoutDef] of Object.entries(CONFIG.LAYOUTS)) {
    const layoutName = layoutDef.NAME;
    const exists = layoutNames.includes(layoutName);

    if (exists) {
      console.log(`  ✅ ${key}: "${layoutName}" found`);
    } else {
      console.log(`  ❌ ${key}: "${layoutName}" NOT FOUND`);
      allLayoutsValid = false;
    }
  }

  if (allLayoutsValid) {
    console.log("  ✅ PASSED: All layout names are valid");
  } else {
    console.log("  ❌ FAILED: Some layout names are invalid");
  }

  // Test 4: Check shortcodes
  console.log("\n[Test 4] Validating shortcodes...");
  let allShortcodesValid = true;

  for (const [shortcode, layoutKey] of Object.entries(CONFIG.SHORTCODES)) {
    const layoutExists = CONFIG.LAYOUTS.hasOwnProperty(layoutKey);

    if (layoutExists) {
      console.log(`  ✅ ${shortcode} -> ${layoutKey}`);
    } else {
      console.log(`  ❌ ${shortcode} -> ${layoutKey} (layout not defined)`);
      allShortcodesValid = false;
    }
  }

  if (allShortcodesValid) {
    console.log("  ✅ PASSED: All shortcodes map to valid layouts");
  } else {
    console.log("  ❌ FAILED: Some shortcodes are invalid");
  }

  // Test 5: Detailed layout verification
  console.log("\n[Test 5] Detailed layout placeholder verification...");

  for (const [key, layoutDef] of Object.entries(CONFIG.LAYOUTS)) {
    const layoutName = layoutDef.NAME;
    const layout = actualLayouts.find(l => l.getLayoutName() === layoutName);

    if (!layout) {
      console.log(`  ⚠️  ${key}: Layout "${layoutName}" not found, skipping...`);
      continue;
    }

    console.log(`\n  ${key} (${layoutName}):`);

    // Get actual placeholders
    const elements = layout.getPageElements();
    const actualPlaceholders = [];

    elements.forEach(element => {
      try {
        const elementType = element.getPageElementType();
        let placeholderType = null;
        let placeholderIndex = null;

        if (elementType === SlidesApp.PageElementType.SHAPE) {
          const shape = element.asShape();
          placeholderType = shape.getPlaceholderType();
          if (placeholderType) {
            placeholderIndex = shape.getPlaceholderIndex();
          }
        } else if (elementType === SlidesApp.PageElementType.IMAGE) {
          const image = element.asImage();
          placeholderType = image.getPlaceholderType();
          if (placeholderType) {
            placeholderIndex = image.getPlaceholderIndex();
          }
        }

        if (placeholderType && placeholderType !== 'NONE') {
          actualPlaceholders.push({
            type: placeholderType.toString(),
            index: placeholderIndex
          });
        }
      } catch (e) {
        // Skip
      }
    });

    // Check defined placeholders
    for (const [phName, phDef] of Object.entries(layoutDef.PLACEHOLDERS)) {
      const found = actualPlaceholders.find(
        p => p.type === phDef.type && p.index === phDef.index
      );

      if (found) {
        console.log(`    ✅ ${phName}: ${phDef.type}(${phDef.index})`);
      } else {
        console.log(`    ❌ ${phName}: ${phDef.type}(${phDef.index}) NOT FOUND`);
        console.log(`       Available: ${actualPlaceholders.map(p => `${p.type}(${p.index})`).join(', ')}`);
      }
    }
  }

  console.log("\n=== CONFIG Test End ===");
}

/**
 * Quick test to list all shortcodes and their mappings
 */
function listShortcodes() {
  console.log("=== Shortcode Reference ===");
  for (const [shortcode, layoutKey] of Object.entries(CONFIG.SHORTCODES)) {
    const layoutName = CONFIG.LAYOUTS[layoutKey]?.NAME || 'UNDEFINED';
    console.log(`${shortcode} -> ${layoutKey} (${layoutName})`);
  }
  console.log("======================");
}
