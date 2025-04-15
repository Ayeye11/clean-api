import { AppErr } from "@domain/errs";
import {
	adminAccessControl,
	clientAccessControl,
	employeeAccessControl,
	Role,
} from "@domain/security/permissions";

const getPermissions = (role: string) => {
	switch (role) {
		case Role.ADMIN:
			return adminAccessControl;
		case Role.EMPLOYEE:
			return employeeAccessControl;
		case Role.CLIENT:
			return clientAccessControl;
		default:
			throw AppErr.forbidden();
	}
};

export { getPermissions };
