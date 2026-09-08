// Verifica se o e-mail tem um formato valido (algo@algo.algo)
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
