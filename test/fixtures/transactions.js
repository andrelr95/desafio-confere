module.exports = [
  {
    value: 100.0,
    description: 'Bicicleta ZXY Aro 21',
    type: 'debit',
    installments: null,
    card: {
      number: '5200555500001237',
      expiry: '20/21',
      cvv: '123',
      holder: 'Fulano de tal'
    }
  },
  {
    value: 1500.0,
    description: 'Carro Ferrari F50',
    type: 'debit',
    installments: null,
    card: {
      number: '5200555500005555',
      expiry: '01/21',
      cvv: '546',
      holder: 'Tal de Fulano'
    }
  },
  {
    value: 700.0,
    description: 'DVD',
    type: 'debit',
    installments: null,
    card: {
      number: '5200555500009999',
      expiry: '07/21',
      cvv: '332',
      holder: 'Fulano de fulano'
    }
  },
  {
    value: 50.0,
    description: 'Jogo',
    type: 'debit',
    installments: null,
    card: {
      number: '5200555500009898',
      expiry: '09/21',
      cvv: '434',
      holder: 'Fulano Carlos'
    }
  },
  {
    value: 300.0,
    description: 'Bicicleta ZXY Aro 29',
    type: 'debit',
    installments: null,
    card: {
      number: '5200555500007676',
      expiry: '02/21',
      cvv: '122',
      holder: 'Tal de Carlos'
    }
  }
];

// {
//   value: 100.0, // Valor da transação
//   description: "Bicicleta ZXY Aro 21", // Descrição da transação
//   type: "debit", // Tipo de transação (`debit`, `credit`, `installment_credit`)
//   installments: null, // Número de parcelas, caso seja debito, passar `null`
//   card: {
//     number: "5200555500001234", // Número do cartão
//     expiry: "20/21", // Validade do cartão
//     cvv: "123", // Código de verificação do cartão
//     holder: "Fulano de tal" // Nome do portador do cartão
//   }
// }
