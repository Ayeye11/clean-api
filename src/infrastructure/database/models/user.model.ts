import type { UserIdentifier } from "@domain/entities";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users_identifier" })
class UserIdentifierModel implements UserIdentifier {
	private constructor(
		id: string,
		roleId: string,
		email: string,
		username: string,
		password: string,
	) {
		this.id = id;
		this.roleId = roleId;
		this.email = email;
		this.username = username;
		this.password = password;
	}

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

	static create(entity: UserIdentifier): UserIdentifierModel {
		return new UserIdentifierModel(
			entity.id,
			entity.roleId,
			entity.email,
			entity.username,
			entity.password,
		);
	}

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
