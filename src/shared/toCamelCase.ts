type AnyObject = { [key: string]: any };

export function toCamelCase<T>(obj: T, seen = new WeakSet()): T {
  if (obj === null || typeof obj !== 'object') return obj; // Handle non-object values

  // Prevent circular references
  if (seen.has(obj)) {
    throw new Error('Circular reference detected');
  }

  seen.add(obj);

  if (Array.isArray(obj)) {
    // Recursively handle arrays
    return obj.map((item) => toCamelCase(item, seen)) as T;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Convert snake_case key to camelCase
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );

    // Recursively process values if they are objects or arrays
    (acc as AnyObject)[camelCaseKey] = toCamelCase(value, seen);

    return acc;
  }, {} as T);
}
