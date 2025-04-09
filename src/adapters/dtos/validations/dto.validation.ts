import { applyRules, type ObjectRules } from "@domain/rules";

const validateDto = (
  values: Record<string, unknown>,
  rules: ObjectRules,
): string | undefined => {
  const keys = Object.keys(values);

  for (const key of keys) {
    const err = applyRules(values[key], rules[key], true);
    if (err) return err;
  }
};

export default validateDto;
