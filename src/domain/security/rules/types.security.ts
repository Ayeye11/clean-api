// Types
interface FieldRules {
	name: string;
	type: unknown;
	optional?: boolean;
	minLen?: number;
	maxLen?: number;
	patterns?: RegExp[];
}

type ObjectRules = Record<string, FieldRules>;

export type { FieldRules, ObjectRules };
