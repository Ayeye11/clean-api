//Regex patterns
const patterns = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  hash: /^\$2[aby]\$.{56}$/,
  strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
} as const;

export default patterns;
