import type { ObjectRules } from "./types.security";
import patterns from "./regex.security";

// Authenticate
const registerRules: ObjectRules = {
  email: {
    name: "email",
    type: "",
    patterns: [patterns.email],
    maxLen: 40,
  },

  username: {
    name: "username",
    type: "",
    minLen: 3,
    maxLen: 20,
  },

  password: {
    name: "password",
    type: "",
    patterns: [patterns.strong],
    minLen: 7,
    maxLen: 40,
  },
};

const loginRules: ObjectRules = {
  email: {
    name: "email",
    type: "",
    patterns: [patterns.email],
    maxLen: 40,
  },

  username: {
    name: "username",
    type: "",
    minLen: 3,
    maxLen: 20,
  },

  password: {
    name: "password",
    type: "",
    patterns: [patterns.strong],
    minLen: 7,
    maxLen: 40,
  },
};

export { registerRules, loginRules };
