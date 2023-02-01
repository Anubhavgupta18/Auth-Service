const express = require('express');
const { PORT } = require('./config/serverConfig');

const createAndStartServer = () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
        
    });
}

createAndStartServer();