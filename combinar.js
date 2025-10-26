import convertirFechaHoraExcel from './serialExceltoString.js';

export default function combinados(datosReporte, datosTurnosDiaUno, datosTurnosDiaDos){
    let combinado = []; 
    let errorPax = [];
    let sinTurno = new Set();
    datosReporte.forEach(filaReporte => {
        let tieneTurno = false;
        datosTurnosDiaUno.forEach(filaTurnos => {
            if (filaTurnos[5] == filaReporte[0] && !filaTurnos[1]?.toLowerCase().includes("error")) {
                const nuevaFila = [filaTurnos[2], filaTurnos[0], filaTurnos[1], filaTurnos[3], filaTurnos[4], filaTurnos[5]];
                combinado.push(nuevaFila);
                tieneTurno = true;
                if(filaReporte[2] != filaTurnos[3]){
                    //console.log("Diferencia en la habitacion: ", filaTurnos[5]);
                    errorPax.push(filaTurnos[5]);
                }
            }
        });

        // Si no se encontró ningún turno
        if (!tieneTurno) {
            sinTurno.add(filaReporte[0]);
        }
    });

    datosReporte.forEach(filaReporte => {
        sinTurno.forEach(hab => {
            if(filaReporte[0] == hab){
                const nuevaFila = [99999, "DESAYUNO", "Sin Turno", filaReporte[2], filaReporte[1], filaReporte[0]];
                combinado.push(nuevaFila);
            }
        })
    })


    combinado.sort((a, b) => a[0] - b[0])

    combinado.forEach(fila =>{
        if(fila[0] == 99999){
            fila[0] = " - ";
        }else{
            fila[0] = convertirFechaHoraExcel(fila[0]);
        }
    })

    let diaDos = [];
    
    datosTurnosDiaDos.forEach(filaTurnos => {
        if (!filaTurnos[1]?.toLowerCase().includes("error")){
            const fila = [filaTurnos[2], filaTurnos[0], filaTurnos[1], filaTurnos[3], filaTurnos[4], filaTurnos[5]];
            diaDos.push(fila);
        }
    })     

    diaDos.sort((a, b) => a[0] - b[0])

    diaDos.forEach(fila =>{
        if(fila[0] == 99999){
            fila[0] = " - ";
        }else{
            fila[0] = convertirFechaHoraExcel(fila[0]);
        }
    })

    combinado = [...combinado, ...diaDos];

    return { combinado, errorPax };
}
