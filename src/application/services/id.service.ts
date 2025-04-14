export interface IdService {
	create(): string;
	isValid(id: string): boolean;
}
