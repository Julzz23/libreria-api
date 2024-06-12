export function formatearFecha(fecha: string): string | null {
  const formato = /^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/;
  const match = fecha.match(formato);
  if (match) {
    const dia = match[1];
    const mes = match[2];
    const año = match[3].length === 2 ? '20' + match[3] : match[3];

    const fechaModificada = new Date(
      parseInt(año),
      parseInt(mes) - 1,
      parseInt(dia),
    ).toISOString();

    return fechaModificada;
  } else {
    return null;
  }
}
