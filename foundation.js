dg.modules.foundation = new dg.Module();

/**
 * Implements hook_regions_build_alter().
 */
function foundation_blocks_build_alter(blocks) {
  if (blocks.admin_menu) {
    blocks.admin_menu._attributes['class'].push('medium-6', 'columns');
  }
  if (blocks.powered_by) {
    blocks.powered_by._attributes['class'].push('medium-6', 'columns');
  }
}

/**
 * Implements hook_block_view_alter().
 */
function foundation_block_view_alter(element, block) {

  switch (block.get('id')) {

    // Make the main menu into a foundation menu.
    case 'main_menu':
      element.menu._attributes['class'].push('menu');
      break;

    // Make the main menu into a foundation menu.
    case 'admin_menu':
      element.menu._attributes['class'].push('menu');
      break;

    // Make the powered by block into a foundation menu.
    case 'powered_by':
      element.list._items.push(dg.l('Foundation', 'http://foundation.zurb.com'));
      element.list._items.reverse();
      element.list._attributes['class'].push('menu', 'align-right');
      break;

  }

}

/**
 * Implements hook_form_alter().
 */
function foundation_form_alter(form, form_state, form_id) {
  return new Promise(function(ok, err) {

    // Add Foundation attributes to form elements.
    for (var name in form) {
      if (!dg.isFormElement(name, form)) { continue; }
      var el = form[name];
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(name, form)) { continue; }
            foundationFormElementAddAttributes(el[_name]);
          }
          break;
        default:
          foundationFormElementAddAttributes(el);
          break;
      }
    }

    ok();
  });
}

function foundationFormElementAddAttributes(el) {
  switch (el._type) {
    case 'submit':
      switch (el._button_type) {
        case 'primary':
        default:
          el._attributes['class'].push('button');
          break;
      }
      break;
    default:
      break;
  }
}
