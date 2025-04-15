import type {
	AccessControl,
	Action,
	Category,
} from "@domain/security/permissions";

const hasPermission = (
	ac: AccessControl,
	category: Category,
	action: Action,
) => {
	const actions = ac.permissions[category];
	if (!actions || !actions.includes(action)) return false;
	return true;
};

export { hasPermission };
