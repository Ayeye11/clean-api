import type { ObjectRules } from "./types";

export const registerRules: ObjectRules = {
	email: {
		name: "email",
		type: "",
		patterns: ["email"],
		maxLen: 100,
	},
	username: {
		name: "username",
		type: "",
		minLen: 4,
		maxLen: 20,
	},
	password: {
		name: "password",
		type: "",
		minLen: 7,
		maxLen: 40,
		patterns: ["strong"],
	},
};

export const loginRules: ObjectRules = {
	email: {
		name: "email",
		type: "",
		patterns: ["email"],
		maxLen: 100,
	},
	password: {
		name: "password",
		type: "",
		maxLen: 40,
	},
};
