

const ConvertToFormData = <T extends object,>(data: T ) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string' || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      formData.append(key, value.toString());
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value === null || value === undefined) {
      formData.append(key, '');
    } else {
      console.warn(`Unhandled value type for key: ${key}`);
    }
  });

  return formData;
};

export default ConvertToFormData;
