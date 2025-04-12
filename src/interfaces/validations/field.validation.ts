import type { FieldRules } from "@domain/security/rules";

// Target must be an string or number
function fieldValidation(
	target: unknown,
	rules: FieldRules | undefined,
): boolean;
function fieldValidation(
	target: unknown,
	rules: FieldRules | undefined,
	info: true,
): string | undefined;
function fieldValidation(
	target: unknown,
	rules: FieldRules | undefined,
	info?: boolean,
): boolean | string | undefined {
	// Check rules
	if (!rules) return info ? undefined : true;

	// Check undefined
	if (target === undefined) {
		if (!rules.optional) {
			return info ? `Missing ${rules.name}` : false;
		}

		return info ? undefined : true;
	}

	// Check type
	if (typeof target !== "string" && typeof target !== "number") {
		return `Invalid ${rules.name}`;
	}
	if (typeof target !== typeof rules.type) {
		return `Invalid ${rules.name}`;
	}

	// Check pattern
	if (rules.patterns && rules.patterns.length > 0) {
		if (typeof target !== "string") {
			return `Invalid ${rules.name}`;
		}

		for (const p of rules.patterns) {
			if (!p.test(target)) {
				return info
					? `${rules.name} does not match the required pattern`
					: false;
			}
		}
	}

	// Check length
	const len = typeof target === "string" ? target.length : target;

	if (rules.minLen && rules.minLen > len) {
		return info ? `${rules.name} is too short` : false;
	}
	if (rules.maxLen && rules.maxLen < len) {
		return info ? `${rules.name} is too long` : false;
	}

	// All ok
	return info ? undefined : true;
}

export { fieldValidation };
