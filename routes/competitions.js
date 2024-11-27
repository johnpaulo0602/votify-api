const express = require('express');
const router = express.Router();
const Competition = require('../models/Competition');
const Option = require('../models/Option');

router.post('/', async (req, res) => {
  try {
    const { title, description, startDate, endDate, options } = req.body;

    // Validação dos dados recebidos
    if (!title || !startDate || !endDate || !options || options.length < 2) {
      return res.status(400).json({ message: 'Dados inválidos. Certifique-se de que todos os campos obrigatórios foram preenchidos e que existem pelo menos duas opções.' });
    }

    // converte as datas para objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // Verificar se as datas são válidas
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Datas inválidas. Certifique-se de que as datas estão no formato correto.' });
    }

 
    const today = new Date();
    today.setHours("0, 0, 0, 0");

    const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());

    // Verificar se startDate não está no passado
    if (startDateOnly < today) {
      return res.status(400).json({ message: 'A data de início não pode estar no passado.' });
    }

    // Verificar se startDate é anterior a endDate
    if (start >= end) {
      return res.status(400).json({ message: 'A data de início deve ser anterior à data de término.' });
    }

    // Criar a competição
    const competition = await Competition.create({
      title,
      description,
      startDate: start,
      endDate: end
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
