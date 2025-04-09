import type { UserIdentifier } from "@domain/entities";

interface UserIdentifierRepository {
  // Create
  create(): Promise<void>;

  // Read
  findOneBy(identifier: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<UserIdentifier | undefined>;
  exists(identifier: { email?: string; username?: string }): Promise<boolean>;
  exists(
    identifier: { email?: string; username?: string },
    info: true,
  ): Promise<string>;
  exists(
    identifier: { email?: string; username?: string },
    info?: boolean,
  ): Promise<boolean | string>;
  findMany(limit: number, offset: number): Promise<UserIdentifier[]>;
}

export type { UserIdentifierRepository };
