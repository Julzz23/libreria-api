export function validarDNI(dni: string): boolean {
  const formato = /^\d{8}$/;
  return formato.test(dni);
}
