interface HashService {
  create(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

export type { HashService };
