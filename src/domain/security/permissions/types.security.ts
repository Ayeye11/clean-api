// Types
enum Role {
	ADMIN = "ROLE_ADMIN",
	EMPLOYEE = "ROLE_EMPLOYEE",
	CLIENT = "ROLE_CLIENT",
	DEFAULT = Role.CLIENT,
}

enum Category {
	USERS = "users",
	PRODUCTS = "products",
	ORDERS = "orders",
}

enum Action {
	VIEW = "ACTION_VIEW",
	CREATE = "ACTION_CREATE",
	UPDATE = "ACTION_UPDATE",
	DELETE = "ACTION_DELETE",
}

type Permissions = Partial<Record<Category, Action[]>>;

interface AccessControl {
	role: Role;
	permissions: Permissions;
}

export { Role, Category, Action };
export type { Permissions, AccessControl };
