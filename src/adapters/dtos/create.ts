import { ErrHttp } from "@adapters/http";

const createDto = <T>(
  data: Record<string, unknown>,
  create: (data: Record<string, unknown>) => [string?, T?],
): T => {
  const [err, dto] = create(data);
  if (err) throw ErrHttp.badRequest(err);
  if (!dto) throw new Error("unexpected undefined dto");

  return dto;
};

export default createDto;
