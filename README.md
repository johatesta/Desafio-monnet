# Desafio-monnet 🚀

## Requisitos ⚙️

Este proyecto requiere lo siguiente:

- **Node.js**: Asegúrate de tener la última versión de Node.js instalada. [Descargar Node.js](https://nodejs.org/)
- **Playwright**: Framework de pruebas utilizado para la ejecución de pruebas automatizadas.
- **IDE**: Puedes utilizar el editor de tu preferencia, pero se utilizó **Visual Studio Code**. [Descargar VS Code](https://code.visualstudio.com/)

## Instalación 🛠️

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. **Clona este repositorio**:

   Primero, clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/johatesta/Desafio-monnet.git


## Instalación de dependencias 🛠️

Para instalar las dependencias necesarias para el proyecto, simplemente ejecuta el siguiente comando en la terminal:

```bash
npm install

````

## Estructura del Proyecto 📁
/tests
    /API             # Archivos para las pruebas de API.
    /WEB             # Archivos para las pruebas de UI (Frontend).
    /pages           # Implementación del patrón Page Object Model (POM).
    /data            # Contiene archivos .xlsx con los casos de prueba.
    /fixtures        # Archivos para manejar fixtures y datos dinámicos.
    /utils           # Archivos para leer la data de los archivos Excel.
playwright.config.ts  # Configuración de Playwright.

## Cómo Ejecutar los Tests 🏃‍♀️💻

### Ejecutar Todos los Tests

Para ejecutar todos los tests, utiliza el siguiente comando en la terminal:

```bash
npm run test
```

Nota: Desde la configuración, solo se ha dejado el navegador Chromium.

##Tests Específicos de API 🧪
#Parte 1 del API de Pokémon
Para ejecutar la primera parte del ejercicio de API, utiliza este comando:

````bash

npm run test:apiparte1
````
#Parte 2 de las pruebas de API
```bash 
npm run test:apiparte2
```
##Tests de UI (Web) 🌐
Si necesitas ejecutar las pruebas de UI (Web), usa el siguiente comando:

````bash
npm run test:web
`````
##Ver Reportes 📊
Playwright genera un reporte de ejecución. Si deseas ver el reporte, ejecuta:
```bash
npm run test:report
```

Nota Importante 🔒
Durante el ejercicio, se utilizó una clave encriptada con SHA256 que fue proporcionada en el PDF del ejercicio. Esta clave NO es visible en el código fuente, ya que se configuró como una variable de entorno y se añadió al archivo .gitignore para protegerla.

¡Listo para comenzar! 🚀


