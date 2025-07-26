const fs = require('fs');
const path = require('path');
const os = require('os');

window.addEventListener('DOMContentLoaded', () => {


  const appData = process.platform === 'win32'
    ? process.env.APPDATA
    : process.platform === 'darwin'
    ? path.join(os.homedir(), 'Library', 'Application Support')
    : path.join(os.homedir(), '.config');
 
  const carpetaApp = path.join(appData, 'StudyNotes');
  const ruta = path.join(carpetaApp, 'datos_temp_carpetas.txt');

  if (fs.existsSync(ruta)) {
    const cont = fs.readFileSync(ruta, 'utf-8');
    const ruta1 = JSON.parse(cont);

    const contenido = fs.readdirSync(ruta1, { withFileTypes: true });
    const lista = [];
    
    contenido.forEach((item) => {
      if (item.isDirectory()) {
        const subRuta = path.join(ruta1, item.name);
        const elementos = fs.readdirSync(subRuta);

        lista.push({
          nombre: item.name,
          ruta: subRuta,
          estado: elementos.length === 0 ? 'vacía' : 'con contenido'
        });
      }
    });

    const contenedor = document.getElementById('contenedorDeCarptetas');

    lista.forEach(carpeta => {
      const div = document.createElement('div');
      div.className = 'carpeta';

      const img = document.createElement('div');

      const archivero = fs.readdirSync(carpeta.ruta);

    const tamañoTotalBytes = archivero.reduce((acc, archivo) => acc + archivo.size, 0);

    const tamañoTotalMB = tamañoTotalBytes / (1024 * 1024);

    if (tamañoTotalMB === 0) {
    img.className = 'icono_vacio';
    } else if (tamañoTotalMB < 500) { 
    img.className = 'icono_medio';
    } else {
    img.className = 'icono';
}

      const texto = document.createElement('span');

      texto.className = 'nombre';
      texto.textContent = carpeta.nombre;

      div.addEventListener('click', () => {
      
        const ruta=carpeta.ruta;
      
        const appData = process.platform === 'win32'
          ? process.env.APPDATA
          : process.platform === 'darwin'
          ? path.join(os.homedir(), 'Library', 'Application Support')
          : path.join(os.homedir(), '.config');
      
        const carpetaApp = path.join(appData, 'StudyNotes');
          
        if (!fs.existsSync(carpetaApp)) {
          fs.mkdirSync(carpetaApp, { recursive: true });
        }
      
        const rutaDatos = path.join(carpetaApp, 'datos_temp_carpetas.txt');
        fs.writeFileSync(rutaDatos, JSON.stringify(ruta, null, 2));    
        window.location.href = '../paginaCarpetas/paginaCarpetas.html';

      });

      div.append(img, texto);
      contenedor.appendChild(div);
    });

  } else {
    console.log('Archivo datos_temp.txt no encontrado.');
  }
});
