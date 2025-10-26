import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import generar from "./generarArchivo.js";
import validarArchivos from "./validarArchivos.js";

const app = express();

app.use(cors());
// --- Crear carpeta uploads si no existe ---
const uploadsPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}


// Configuración de multer (mantiene el nombre original)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // misma carpeta para todos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // mantiene el nombre original
  },
});

const upload = multer({ storage });

// Recibir dos archivos
app.post("/uploads", upload.fields([
  { name: "reporte", maxCount: 1 },
  { name: "turnos", maxCount: 1 }
]), (req, res) => {
    const reporteFileInfo = req.files["reporte"]?.[0];
    const turnosFileInfo = req.files["turnos"]?.[0];

    const { errorReporte, errorTurnos } = validarArchivos(reporteFileInfo, turnosFileInfo);

    const fechaInicio = req.body.fechaInicio;
    let errorPax = [];

    if (errorReporte == false && errorTurnos == false){
      errorPax = generar(fechaInicio);
    }

    res.json({
        errorPax: errorPax,
        errorReporte: errorReporte,
        errorTurnos: errorTurnos
    })
  }
);

// Descargar reporte
app.get("/downloadReporte", async (req, res) => {
        const filePath = "Turnos_Desayunos.xlsx";
        res.download(filePath, "Turnos_Desayunos.xlsx", (err) => {
            if (err) {
            console.error("Error al enviar archivo:", err);
            res.status(500).send("Error al generar la descarga");
            }
        })
     }
);

app.get("/wakeUp", async (req, res) => {
  res.json({
    conect: true
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

})


// Limpiar Reporte de Desayunos 
/*import limpiarReporte from './analizarReporte.js'
import { desayunosDiaUno, desayunosDiaDos} from './analizarTurnos.js';
import combinados from './combinar.js';
import exportExcel from './exportExcel.js';

const reporteDesayuno = "G001/reporte.xls"
const inicioDesayuno = 16; 

const datosReporte = limpiarReporte(reporteDesayuno, inicioDesayuno); 

//console.log(datosReporte)

// Limpiar Listado de Turnos
const reporteTurno = "turnos/turnos.xls"
const inicioTurno = 4; 

const datosTurnosDiaUno = desayunosDiaUno(reporteTurno, inicioTurno);
const datosTurnosDiaDos = desayunosDiaDos(reporteTurno, inicioTurno);

//console.log(datosTurnosDiaUno);
//console.log(datosTurnosDiaDos);

// Combinar Listado de Turnos y Reporte de Desayunos

const combinado = combinados(datosReporte, datosTurnosDiaUno, datosTurnosDiaDos);

// Pasar a excel
exportExcel(combinado);

console.log(combinado)
*/


