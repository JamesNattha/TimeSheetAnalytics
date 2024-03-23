const handleChangeValidate = (e, formValues, setFormValues) => {
  const { name, value } = e.target;
  setFormValues({
    ...formValues,
    [name]: {
      ...formValues[name],
      value: value,
      error: false
    }
  });
};

const handleSubmitForm = (e, formValues, setFormValues) => {
  e.preventDefault();
  let isError = false;
  const formFields = Object.keys(formValues);
  let newFormValues = { ...formValues };
  let saveValues = {};

  for (let index = 0; index < formFields.length; index++) {
    const currentField = formFields[index];
    const currentValue = formValues[currentField].value;
    saveValues = { ...saveValues, [currentField]: currentValue };
    if (!currentValue && formValues[currentField].errorMessage != '') {
      isError = true;
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: true
        }
      };
    }
  }
  setFormValues(newFormValues);
  return {
    isError: isError,
    data: saveValues
  };
};

export { handleChangeValidate, handleSubmitForm };
