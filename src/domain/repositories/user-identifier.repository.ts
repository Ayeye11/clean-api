import type { UserIdentifier } from "@domain/entities";

interface UserIdentifierRepository {
  // Create
  create(user: UserIdentifier): Promise<void>;

  // Read
  findOneBy(identifier: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<UserIdentifier | null>;

  isAvailable(identifier: {
    email: string;
    username: string;
  }): Promise<null | "email" | "username">;

  findMany(limit: number, offset: number): Promise<UserIdentifier[]>;
}

export type { UserIdentifierRepository };
