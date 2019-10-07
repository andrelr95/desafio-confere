const Finantial = require('../models/finantial');
const errorFactory = require('../utils/error-factory');

exports.insert = async (body) => {
    let result;
    try {
        result = await Finantial.create(body);
    } catch (err) {
        result = errorFactory.internalServerError('Erro ao salvar na base de dados', err)
    }
    return result;
}