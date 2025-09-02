import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();

// --- CORS ---
app.use(cors({
  origin: "https://tu-front.vercel.app", // cambiá por tu dominio real
  methods: ["GET","POST","PUT","DELETE"]
}));

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
  console.log("Archivos recibidos:", req.files);

  // --- Aquí procesás los archivos ---
  // Ejemplo: generar un archivo nuevo llamado Turnos_Desayunos.xlsx
  const newFilePath = path.join(uploadsPath, "Turnos_Desayunos.xlsx");
  fs.writeFileSync(newFilePath, "Contenido procesado de ejemplo"); // reemplazar con tu función generar()

  // --- Enviar archivo al frontend ---
  res.download(newFilePath, "Turnos_Desayunos.xlsx", (err) => {
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

