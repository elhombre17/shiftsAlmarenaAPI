import limpiarReporte from './analizarReporte.js'
import { desayunosDiaUno, desayunosDiaDos} from './analizarTurnos.js';
import combinados from './combinar.js';
import exportExcel from './exportExcel.js';

export default function generar(fechaInicio){

const reporteDesayuno = "uploads/reporte.xls"
const inicioDesayuno = 16; 

const datosReporte = limpiarReporte(reporteDesayuno, inicioDesayuno); 

//console.log(datosReporte)

// Limpiar Listado de Turnos
const reporteTurno = "uploads/turnos.xls"
const inicioTurno = 4; 

const datosTurnosDiaUno = desayunosDiaUno(reporteTurno, inicioTurno, fechaInicio);
const datosTurnosDiaDos = desayunosDiaDos(reporteTurno, inicioTurno, fechaInicio);

//console.log(datosTurnosDiaUno);
//console.log(datosTurnosDiaDos);

// Combinar Listado de Turnos y Reporte de Desayunos

const { combinado, errorPax } = combinados(datosReporte, datosTurnosDiaUno, datosTurnosDiaDos);

// Pasar a excel

 exportExcel(combinado);

// Pasar errores de habitaciones

return errorPax;

}


