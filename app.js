import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import generar from "./generarArchivo.js";

const app = express();

const PORT = 3000;
const HOST = "127.0.0.1";

app.use(cors());

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

// Recibir dos archivos (dni y firma)
app.post("/uploads", upload.fields([
  { name: "reporte", maxCount: 1 },
  { name: "turnos", maxCount: 1 }
]), (req, res) => {
        console.log(req.files); // info de ambos archivos
        generar();
        const filePath = "Turnos_Desayunos.xlsx";

        res.download(filePath, "Turnos_Desayunos.xlsx", (err) => {
            if (err) {
            console.error("Error al enviar archivo:", err);
            res.status(500).send("Error al generar la descarga");
            }
        });
    }
);

// --- app.listen al final ---
const PORT = process.env.PORT || 3000; // Render asigna PORT dinámicamente
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


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

