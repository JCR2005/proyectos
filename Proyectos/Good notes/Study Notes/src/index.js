const fs = require('fs');
const os = require('os');
const path = require('path');

function ocultarPanel() {
  const div = document.getElementById('imagenPrincipal');
  const botonIniciar = document.getElementById('botonIniciar');
  const contenedorSecundario = document.getElementById('contenedorSecundario');

  // Ocultar botón
  botonIniciar.classList.toggle('oculto');

  // Ocultar imagen principal
  setTimeout(() => {
    div.classList.toggle('oculto');
  }, 300);

  // Mostrar contenedor secundario
  setTimeout(() => {
    contenedorSecundario.classList.toggle('oculto');
  }, 800);

  // Después de todo, manejar archivos
  setTimeout(() => {
    // 📁 Carpeta base en el directorio del usuario
    const dirBase = os.homedir(); 
    const rutaStudyNotes = path.join(dirBase, 'StudyNotes');

    // ✅ Crear la carpeta si no existe
    if (!fs.existsSync(rutaStudyNotes)) {
      fs.mkdirSync(rutaStudyNotes);
      console.log('Carpeta StudyNotes creada en:', rutaStudyNotes);
    } else {
      console.log('Carpeta StudyNotes ya existe en:', rutaStudyNotes);
    }

    const rutaCarpetas = path.join(rutaStudyNotes, 'Carpetas');   
    if (!fs.existsSync(rutaCarpetas)) {
      fs.mkdirSync(rutaCarpetas);
    } 

    const rutaArchiveros = path.join(rutaStudyNotes, 'Archiveros');   
    if (!fs.existsSync(rutaArchiveros)) {
      fs.mkdirSync(rutaArchiveros);
    } 

    const rutaNotas = path.join(rutaStudyNotes, 'Notas');   
    if (!fs.existsSync(rutaNotas)) {
      fs.mkdirSync(rutaNotas);
    } 
    // ✅ Definir ubicación segura para guardar datos según el sistema operativo
    const appData = process.platform === 'win32'
      ? process.env.APPDATA
      : process.platform === 'darwin'
        ? path.join(os.homedir(), 'Library', 'Application Support')
        : path.join(os.homedir(), '.config');

    const carpetaApp = path.join(appData, 'StudyNotes');

    // ✅ Crear carpeta para los datos si no existe
    if (!fs.existsSync(carpetaApp)) {
      fs.mkdirSync(carpetaApp, { recursive: true });
    }

    // ✅ Escribir el archivo JSON
    const rutaDatos = path.join(carpetaApp, 'datos_temp.txt');
    fs.writeFileSync(rutaDatos, JSON.stringify(rutaArchiveros, null, 2));

    // ✅ Redirigir a la página principal
    window.location.href = 'paginaPrincipal/paginaPrincipal.html';
  }, 1200);
}

// Escuchar clic en botón de inicio
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.botonIniciar');
  if (btn) {
    btn.addEventListener('click', ocultarPanel);
  }
});
