dg.modules.foundation = new dg.Module();

/**
 * Implements hook_regions_build_alter().
 */
function foundation_blocks_build_alter(blocks) {
  if (blocks.admin_menu) {
    blocks.admin_menu._attributes['class'].push('columns');
  }
  if (blocks.powered_by) {
    blocks.powered_by._attributes['class'].push('columns');
  }
  if (blocks.user_login) {
    if (!dg.currentUser().isAuthenticated() && dg.config('theme').name == 'frank' && dg.getPath() != 'user/login') {
      blocks.user_login._attributes['class'].push('top-bar-right');
    }
  }
}

/**
 * Implements hook_block_view_alter().
 */
function foundation_block_view_alter(element, block) {

  switch (block.get('id')) {

    // Make the main menu into a menu.
    case 'main_menu':
      element.menu._attributes['class'].push('menu', 'float-left');
      break;

    // Make the user menu into a menu.
    case 'user_menu':
      element.menu._attributes['class'].push('menu', 'float-right');
      break;

    // Make the main menu into a menu.
    case 'admin_menu':
      element.menu._attributes['class'].push('menu');
      break;

    // Make the powered by block into a menu.
    case 'powered_by':
      element.list._items.push(dg.l('Foundation', 'http://foundation.zurb.com'));
      element.list._attributes['class'].push('menu');
      break;

  }

}

/**
 * Implements hook_form_alter().
 */
function foundation_form_alter(form, form_state, form_id) {
  return new Promise(function(ok, err) {

    form._after_build.push('foundation.afterBuild');

    // Add Foundation attributes to form elements.
    for (var name in form) {
      if (!dg.isFormElement(name, form)) { continue; }
      var el = form[name];
      switch (el._type) {
        case 'actions':
          for (var _name in el) {
            if (!dg.isFormElement(name, form)) { continue; }
            dg.modules.foundation.formElementAddAttributes(el[_name]);
          }
          break;
        default:
          dg.modules.foundation.formElementAddAttributes(el);
          break;
      }
    }

    // Make any specific form alterations.
    switch (form_id) {
      case 'UserLoginForm':
          // Wrap the login form block elements in a div row.
          if (dg.config('theme').name == 'frank' && dg.getPath() != 'user/login') {
            form._prefix = '<div class="row">';
            form._suffix = '</div>';
          }
        break;
    }

    ok();
  });
}

/**
 * An after build handler for all forms to prep the form for foundation presentation.
 * @param form
 * @param form_state
 */
dg.modules.foundation.afterBuild = function(form, form_state) {

  //console.log(form);
  //console.log(form_state);
  //console.log(form_state.get('form'));


  // Add some columns to the login form block.
  if (form_state.get('form').getFormId() == 'UserLoginForm' && dg.getPath() != 'user/login') {
    form.name._attributes['class'].push('medium-4 columns');
    form.pass._attributes['class'].push('medium-4 columns');
    form.actions._attributes['class'].push('medium-3 columns');
  }

};

/**
 * A helper function to prep form elements for foundation presentation.
 * @param el
 */
dg.modules.foundation.formElementAddAttributes = function(el) {
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
};
