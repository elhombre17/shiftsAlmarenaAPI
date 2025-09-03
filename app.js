import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import generar from "./generarArchivo.js";

const app = express();

// --- CORS ---
app.use(cors());

// --- Crear carpeta uploads si no existe ---
const uploadsPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// --- Configuración Multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// --- Ruta para recibir archivos ---
app.post("/uploads", upload.fields([
  { name: "reporte", maxCount: 1 },
  { name: "turnos", maxCount: 1 }
]), (req, res) => {

  // --- Aquí procesás los archivos ---
  // Ejemplo: generar un archivo nuevo llamado Turnos_Desayunos.xlsx
  generar()
  const filePath = "Turnos_Desayunos.xlsx";
  // reemplazar con tu función generar()

  // --- Enviar archivo al frontend ---
  res.download(filePath, "Turnos_Desayunos.xlsx", (err) => {
    if (err) {
      console.error("Error al enviar archivo:", err);
      res.status(500).send("Error al generar la descarga");
    }
  });
});

// --- Puerto dinámico asignado por Render ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});







