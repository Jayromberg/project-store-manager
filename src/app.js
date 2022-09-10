const express = require('express');
const { productsRoute } = require('./routes');
const mapError = require('./utils/mapError');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', productsRoute);

app.use((error, _req, res, _next) => {
  const err = mapError(error.message);
  return res.status(err.code).json({ message: err.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;