export const validateFields = async (schema: any, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });

    return null; // Validation OK
  } catch (e: any) {
    return e.inner.reduce(
      (acc: any, error: any) => ({
        ...acc,
        [error.path]: {
          type: error.type ?? 'validation',
          message: error.message,
        },
      }),
      {},
    );
  }
};

export const validateAndSetErrors = async (schema: any, setError: any, data: any) => {
  const validationErrors = await validateFields(schema, data);

  if (validationErrors) {
    for (const field in validationErrors) {
      if (field in validationErrors) {
        setError(field as any, { type: validationErrors[field].type, message: validationErrors[field].message });
      }
    }
  }

  return validationErrors;
};

// export const getFormValues = (fieldNames: T[], getValues: (fields: T[]) => string[]): Record<keyof T, any> => {
export const getFormValues = (fieldNames: string[], getValues: (fields: string[]) => string[]) => {
  const fieldValues = getValues(fieldNames);

  return fieldNames.reduce(
    (acc, fieldName, index) => ({
      ...acc,
      [fieldName]: fieldValues[index],
    }),
    {},
  );
};
