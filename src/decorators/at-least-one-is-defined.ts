import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

export function AtLeastOneIsDefined<T extends object>(
  constraints?: (keyof T)[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  @ValidatorConstraint()
  class AtleastOneIsDefinedConstraint implements ValidatorConstraintInterface {
    validate(_: unknown, validationArguments: ValidationArguments) {
      const constraints: (keyof T)[] = validationArguments.constraints;
      const obj = validationArguments.object as T;

      for (const key of constraints) {
        if (obj[key] !== undefined) {
          return true;
        }
      }
      return false;
    }

    defaultMessage(args: ValidationArguments) {
      return `At least one of the fields ['${args.constraints.join(
        "', '"
      )}'] must be defined in ${args.targetName}.`;
    }
  }

  return Validate(
    AtleastOneIsDefinedConstraint,
    constraints,
    validationOptions
  );
}
