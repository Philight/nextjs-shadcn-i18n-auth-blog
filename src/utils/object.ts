// @ts-nocheck

type GenericObject = { [key: string]: any } | Record<string, any>;

export const isObject = (item: any): boolean => item && typeof item === 'object' && !Array.isArray(item);

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const deepMerge = <T, R>(target: T, source: R): T => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};

/**
 * Function to mutate an object deeply at a specified path
 * @param obj The object to be mutated
 * @param path The path to the property to be mutated (e.g., 'nestedObject.subKey2')
 * @param value The value to set at the specified path
 */
export const deepMutate = (obj: GenericObject, path: string, value: any): GenericObject => {
  const keys = path.split('.');

  if (value === undefined) {
    return obj;
  }

  function setPropertyRecursive(o: GenericObject, k: string[], v: any, index: number = 0): GenericObject {
    // Check if we have reached the final key in the path
    if (index === k.length - 1) {
      // Set the value at the final key
      return Object.assign(o, { [k[index]]: v });
    }

    // Check if the current key does not exist or is not an object
    if (!o[k[index]] || typeof o[k[index]] !== 'object') {
      o[k[index]] = {}; // Create an empty object if not already present
    }

    // Recursively call with the next key in the path
    return Object.assign(o, { [k[index]]: setPropertyRecursive(o[k[index]] || {}, k, v, index + 1) });
  }

  // Start the recursion with the provided object and keys
  return setPropertyRecursive(obj, keys, value);
};
