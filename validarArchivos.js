export default function validarArchivos(reporteFileInfo, turnosFileInfo){
    let errorReporte = false;
    let errorTurnos = false;
    
    if(reporteFileInfo.originalname != "reporte.xls" && reporteFileInfo.originalname != "reporte.xlsx"){
        errorReporte = true; 
        console.log("reporte no va")
    }
    
    if(turnosFileInfo.originalname != "turnos.xls" && turnosFileInfo.originalname != "turnos.xlsx" ){
        errorTurnos = true; 
        console.log("turnos no va")
    }

    return { errorReporte, errorTurnos }
}