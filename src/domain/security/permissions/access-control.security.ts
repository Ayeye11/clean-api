import { Action, Role, type AccessControl } from "./types.security";

// ---- ADMIN
const adminAccessControl: AccessControl = {
	role: Role.ADMIN,
	permissions: {
		users: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
		products: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
		orders: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
	},
} as const;

// ---- EMPLOYEE
const employeeAccessControl: AccessControl = {
	role: Role.EMPLOYEE,
	permissions: {
		products: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
		orders: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
	},
} as const;

// ---- CLIENT
const clientAccessControl: AccessControl = {
	role: Role.CLIENT,
	permissions: {
		products: [Action.VIEW],
		orders: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
	},
} as const;

export { adminAccessControl, employeeAccessControl, clientAccessControl };
