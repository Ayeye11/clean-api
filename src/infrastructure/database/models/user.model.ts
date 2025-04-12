import type { UserIdentifier } from "@domain/entities";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users_identifier" })
class UserIdentifierModel implements UserIdentifier {
	@PrimaryColumn({ name: "id" })
	id!: string;

	@Column({ name: "role_id" })
	roleId!: string;

	@Column({ name: "email" })
	email!: string;

	@Column({ name: "username" })
	username!: string;

	@Column({ name: "password" })
	password!: string;

	toEntity(): UserIdentifier {
		return {
			id: this.id,
			roleId: this.roleId,
			email: this.email,
			username: this.username,
			password: this.password,
		};
	}
}

export { UserIdentifierModel };
