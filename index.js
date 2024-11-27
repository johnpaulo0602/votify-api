const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Competition = require('./models/Competition');
const Option = require('./models/Option');
const Vote = require('./models/Vote');
const competitionsRouter = require('./routes/competitions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/competitions', competitionsRouter);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API Votify!');
});

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado com sucesso.');
}).catch((error) => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
