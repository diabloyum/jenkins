export const enumToConfig = E =>
    Object.keys(E).map(key => ({value: key, label: E[key]}));
