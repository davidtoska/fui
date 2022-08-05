import { LabeledValue } from "../types";

export namespace V {
  export const isLabeledValue = (value: unknown): value is LabeledValue => {
    const key1: keyof LabeledValue = "label";
    const key2: keyof LabeledValue = "value";
    if (!V.hasKey(value, key1)) {
      return false;
    }
    if (!V.hasKey(value, key2)) {
      return false;
    }
    return V.isString(value.value) && V.isString(value.label);
  };

  export const isString = (str: unknown, minLength = 0): str is string => {
    if (typeof str !== "string") {
      return false;
    }

    const evalLength = minLength < 0 ? 0 : minLength;
    return str.length >= evalLength;
  };

  export const isNumber = (value: unknown): value is number => {
    const isNumber = typeof value === "number";
    const notNaN = !Number.isNaN(value);
    return isNumber && notNaN;
  };

  export const isNil = (item: unknown): item is null | undefined => item === null || item === undefined;

  export const hasKey = <T extends string>(obj: unknown, key: T): obj is Record<typeof key, unknown> => {
    if (!V.isRecord(obj)) {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  export const isRecord = (obj: unknown): obj is Record<string, unknown> => {
    if (!obj) {
      return false;
    }

    if (Array.isArray(obj)) {
      return false;
    }

    if (typeof obj !== "object") {
      return false;
    }

    if (obj === null) {
      return false;
    }
    return true;
  };
}
