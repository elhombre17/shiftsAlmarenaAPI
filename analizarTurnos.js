import XLSX from 'xlsx'
import convertirFechaHoraExcel from './serialExceltoString.js';

function obtenerDia(sumarDia, fechaInicio) {
  // Obtener fecha y hora actuales en Argentina
  const fecha = new Date(`${fechaInicio}T00:00:01`);

  console.log(fecha);

  // Sumar un día
  fecha.setDate(fecha.getDate() + sumarDia);

  // Formatear en YYYY-MM-DD
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy}`;
}


function limpiarTurnos (reporte, inicio){
    //Traemos el reporte en cuestion
        const workbook = XLSX.readFile(reporte);
    
        //Traemos la hoja del reporte
        const hoja = workbook.Sheets[workbook.SheetNames[0]];
    
        //Extraemos los datos y los ponemos en un array
        let datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
    
        const fin = datos.findIndex(word => word.includes("Page"));

        datos = datos.slice(inicio, fin-1).map(fila => {            
            return [fila[0], fila[2], fila[3], fila[4], fila[5], fila[8]]; 
        })

        return datos; 
}

export function desayunosDiaUno(reporte, inicio, fechaInicio){
    const datos = limpiarTurnos(reporte, inicio)
    const diaUno = obtenerDia(0, fechaInicio);
    return datos.filter(fila => {
        const fechaConvertida = convertirFechaHoraExcel(fila[2]);
        let [fecha, hora] = fechaConvertida.split(" ");
        return fecha == diaUno;
    });
}

export function desayunosDiaDos(reporte, inicio, fechaInicio){
    const datos = limpiarTurnos(reporte, inicio)
    let diaDos = obtenerDia(1, fechaInicio);
     return datos.filter(fila => {
        const fechaConvertida = convertirFechaHoraExcel(fila[2]);
        let [fecha, hora] = fechaConvertida.split(" ");
        return fecha == diaDos;
    });
}