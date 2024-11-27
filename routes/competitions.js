const express = require('express');
const router = express.Router();
const Competition = require('../models/Competition');
const Option = require('../models/Option');

router.post('/', async (req, res) => {
  try {
    const { title, description, startDate, endDate, options } = req.body;

    // Validação básica dos dados
    if (!title || !startDate || !endDate || !options || options.length < 2) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique os campos obrigatórios. Verifique se há pelo menos duas opções.' });
    }

    // Criar a competição
    const competition = await Competition.create({
      title,
      description,
      startDate,
      endDate
    });

    // Criar as opções e associá-las à competição
    const optionPromises = options.map(optionName => {
      return Option.create({ name: optionName, competitionId: competition.id });
    });
    await Promise.all(optionPromises);

    res.status(201).json({ message: 'Competição criada com sucesso!', competitionId: competition.id });
  } catch (error) {
    console.error('Erro ao criar competição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


module.exports = router;
