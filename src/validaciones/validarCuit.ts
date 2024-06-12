export function validarCuit(cuit: string): boolean {
  const formato = /^\d{2}-\d{8}-\d{1}$/;
  return formato.test(cuit);
}
