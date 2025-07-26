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
  const ruta = path.join(carpetaApp, 'datos_temp.txt');

  if (fs.existsSync(ruta)) {
    const cont = fs.readFileSync(ruta, 'utf-8');
    const ruta1 = JSON.parse(cont);
    alert(ruta1)
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

    const contenedor = document.getElementById('contenedorDeArchivadores');

    lista.forEach(carpeta => {
      const div = document.createElement('div');
      div.className = 'archivador';

      const img = document.createElement('div');

      const archivero = fs.readdirSync(carpeta.ruta);

      archivero.length===0 ? img.className = 'icono_vacio'  : (archivero.length < 6 ?  img.className = 'icono_medio' : img.className = 'icono');

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

   const menuItems = document.querySelectorAll('.menu-item');
    
    // Seleccionamos todos los divs de contenido que queremos controlar
    // Asegúrate de que tus paneles tengan la clase 'content-section' si quieres usar esa lógica.
    // Si tus paneles se llaman: #panelArchivadores, #panelCarpetas, etc., puedes seleccionarlos así:
    const contentSections = document.querySelectorAll('#contenedorDeArchivadores, #contenedorDeCarpetas, #contenedorDeNotas'); 
    // O si todos tienen una clase común:
    // const contentSections = document.querySelectorAll('.tu-clase-comun-de-panel');

    // Función para mostrar la sección correcta y ocultar las demás
    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active'); // Oculta todas las secciones
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active'); // Muestra la sección objetivo
        } else {
            console.error(`Error: La sección con ID '${targetId}' no fue encontrada.`);
        }
    }

    // Función para actualizar la clase 'active' en los elementos del menú
    function updateMenuItems(clickedMenuItem) {
        menuItems.forEach(item => {
            item.classList.remove('active'); // Quita la clase 'active' de todos los elementos del menú
        });
        clickedMenuItem.classList.add('active'); // Añade la clase 'active' al elemento clickeado
    }

    // Añadir un Event Listener a cada elemento del menú (enlace)
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // MUY IMPORTANTE para <a>! Evita que el navegador navegue a '#'
            
            const targetId = item.getAttribute('data-target-panel'); // Obtiene el ID del panel del atributo data-
            
            showSection(targetId);
            updateMenuItems(item);
        });
    });

 
});



