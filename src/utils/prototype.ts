// @ts-ignore
Array.prototype.css = function (): string {
  return this?.filter(Boolean).join(' ');
};

// @ts-ignore
Array.prototype.sortAsc = function (): Array {
  return this?.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
};

// @ts-ignore
Array.prototype.sortDesc = function (): Array {
  return this?.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1));
};

/**
 * Sort nested Arrays
 * @param property - property to sort by, separated by '.', e.g. "property.last.name"
 */
// @ts-ignore
Array.prototype.sortNested = function ({ property, order = 'asc' }: { property: string; order?: 'asc' | 'desc' }): Array {
  const isAsc = order.toLowerCase() === 'asc';
  const prop = property.split('.');
  const len = prop.length;

  return this.sort((aParam, bParam) => {
    let i = 0;
    let a = aParam;
    let b = bParam;

    while (i < len) {
      a = a[prop[i]];
      b = b[prop[i]];
      i++;
    }

    return a === b ? 0 : a < b ? (isAsc ? -1 : 1) : isAsc ? 1 : -1;
  });
};

// @ts-ignore

Array.prototype.removeItem = function (value: any): Array {
  return this?.filter((item) => item !== value);
};

// @ts-ignore
String.prototype.removeWhitespace = function (): string {
  return this?.replace(/\s+/g, '');
};
