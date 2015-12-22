var foundation = new dg.Module();

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
