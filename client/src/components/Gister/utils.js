export function checkEmptyObject(object, key) {
  return Object.values(object[key]).filter(Boolean).length === 0;
}

export function removeCheckedFields(inputName, check, subInputName = null) {
  document
    .querySelectorAll(
      `input[name=${subInputName}],input[name=${inputName}]:not([value=${check}]`
    )
    .forEach((element) => (element.checked = false));
}
