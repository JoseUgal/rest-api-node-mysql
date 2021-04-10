const express = require('express');
const app = express();


// Settings ( Puerto, Entorno Desarrollo, Nombre Aplicación)
// Si un sistema nos da un puerto lo cogemos y sino cogerá el 30000
app.set('port', process.env.port || 3000);

// Middlewares ( Funciones que se ejecutan antes de las rutas)
// Hará accesible el formato JSON
app.use(express.json());

// Routes ( Comunicador servidor-navegador )
app.use(require('./routes/employees'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${ app.get('port') }`);
});