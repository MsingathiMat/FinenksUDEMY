

export const getEnv = (key: string, defaultValue: string | undefined) => {
  const value = process.env[key];
  
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue;
};
