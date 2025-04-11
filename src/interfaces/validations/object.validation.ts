import type { ObjectRules } from "@domain/security/rules";
import { fieldValidation } from "./field.validation";

function objectValidation(
	object: Record<string, unknown>,
	rules: ObjectRules,
): boolean;
function objectValidation(
	object: Record<string, unknown>,
	rules: ObjectRules,
	info: true,
): string | undefined;
function objectValidation(
	object: Record<string, unknown>,
	rules: ObjectRules,
	info?: boolean,
): boolean | string | undefined {
	// Get fields to validate
	const fields = Object.keys(rules);

	for (const key of fields) {
		const err = fieldValidation(object[key], rules[key], true);
		if (err) return info ? err : false;
	}

	return info ? undefined : true;
}

export { objectValidation };
