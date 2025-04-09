// Rules
interface Rules {
	name: string;
	type: unknown;
	optional?: boolean;
	minLen?: number;
	maxLen?: number;
	patterns?: (keyof typeof regexPatterns)[];
}

type ObjectRules = Record<string, Rules | undefined>;

// type FieldOf<T> = {
// 	[K in keyof T]: T[K] extends string | number | undefined ? K : never;
// }[Exclude<keyof T, "id">];
//
// type RulesFor<T> = Record<FieldOf<T>, Rules | undefined>;

// Patterns
export const regexPatterns = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	hash: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
	strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
};

export type { Rules, ObjectRules };
