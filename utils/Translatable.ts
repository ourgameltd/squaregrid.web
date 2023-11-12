export interface ITranslatable {
}

export function Translatable<T extends ITranslatable>(instance: T, t: any, prefix: string = "App."): T {
  let valueInstance: any = [];
  Object.keys(instance).map(key => {
    const value = t(`${prefix}.${key}`);
    valueInstance[key] = value;
  });
  return Object.assign({} as T, valueInstance);
}