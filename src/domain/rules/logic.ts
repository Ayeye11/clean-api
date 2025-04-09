import { regexPatterns, type Rules } from "./types";

function applyRules(target: unknown, rules?: Rules): boolean;
function applyRules(
  target: unknown,
  rules?: Rules,
  info?: true,
): string | undefined;
function applyRules(
  target: unknown,
  rules?: Rules,
  info?: boolean,
): boolean | string | undefined {
  // Check rules
  if (!rules) return info ? undefined : true;

  // Check if exists
  if (target === undefined) {
    if (!rules.optional) {
      return info ? `Missing ${rules.name}` : false;
    }

    return info ? undefined : true;
  }

  // Check type
  if (typeof target !== "string" && typeof target !== "number") {
    return info ? `Invalid ${rules.name}` : false;
  }
  if (typeof target !== typeof rules.type) {
    return info ? `Invalid ${rules.name}` : false;
  }

  // Check pattern
  if (rules.patterns && rules.patterns.length > 0) {
    if (typeof target !== "string") {
      return info ? `Invalid ${rules.name}` : false;
    }
    for (const pattern of rules.patterns) {
      if (!regexPatterns[pattern].test(target)) {
        return info
          ? `${rules.name} does not match the required pattern`
          : false;
      }
    }
  }

  // Check length
  const len = typeof target === "string" ? target.length : target;
  if (rules.minLen && len < rules.minLen) {
    return info ? `${rules.name} is too short` : false;
  }
  if (rules.maxLen && len > rules.maxLen) {
    return info ? `${rules.name} is too long` : false;
  }

  // Its ok
  return info ? undefined : true;
}

export { applyRules };
