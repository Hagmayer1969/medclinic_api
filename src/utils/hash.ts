import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// Transforma a senha em texto puro num hash antes de salvar no banco
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compara a senha digitada no login com o hash guardado no banco
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
