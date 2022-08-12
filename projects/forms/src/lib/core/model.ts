import { FormSchema } from "./form";

export namespace Model {
  export class Valid<S extends FormSchema> {
    readonly isValid: true = true;
    constructor(
      readonly data: { [P in keyof S]: S[P]["__config"]["__output"] }
    ) {}
  }

  export type TypeOf<S extends FormSchema> = {
    [P in keyof S]: S[P]["__config"]["__output"];
  };

  export type TypeOfOptional<S extends FormSchema> = {
    [P in keyof S]: S[P]["__config"]["__optionalOutput"];
  };

  export class InValid<S extends FormSchema> {
    readonly isValid: false = false;
    constructor(
      readonly data: {
        [P in keyof S]: S[P]["__config"]["__optionalOutput"];
      }
    ) {}
  }

  export type Value<S extends FormSchema> = Valid<S> | InValid<S>;

  export const valid = <S extends FormSchema>(data: {
    [P in keyof S]: S[P]["__config"]["__output"];
  }) => new Valid(data);

  export const inValid = <S extends FormSchema>(data: {
    [P in keyof S]: S[P]["__config"]["__optionalOutput"];
  }) => new InValid(data);
}
