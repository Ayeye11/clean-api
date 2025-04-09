interface IdService {
  create(): string;
  verify(id: string): boolean;
}

export type { IdService };
