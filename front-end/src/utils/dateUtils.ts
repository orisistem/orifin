const cardRules: { [key: string]: { closeDay: number; dueDay: number } } = {
  '1': { closeDay: 25, dueDay: 2 }, // Nubank
  '2': { closeDay: 5, dueDay: 12 }, // Itaucard Visa
  '3': { closeDay: 12, dueDay: 19 }, // Itaucard Master
  '4': { closeDay: 14, dueDay: 20 }, // Inter
  '5': { closeDay: 12, dueDay: 25 }, // Amazon Master
};

export const calculateDueDate = (
  transactionDate: Date,
  cardId: string
): Date => {
  const rule = cardRules[cardId];
  if (!rule) {
    return transactionDate; // ou lançar um erro
  }

  const transactionDay = transactionDate.getDate();
  const transactionMonth = transactionDate.getMonth();
  const transactionYear = transactionDate.getFullYear();

  let dueMonth = transactionMonth;
  let dueYear = transactionYear;

  // Se a transação ocorreu ANTES do dia de fechamento, a fatura vence no mesmo mês do fechamento.
  if (transactionDay < rule.closeDay) {
    dueMonth = transactionMonth;
  } else {
    // Se a transação ocorreu NO DIA ou DEPOIS do fechamento, a fatura vence no mês seguinte.
    dueMonth = transactionMonth + 1;
  }

  // Agora, ajustamos o mês de vencimento da fatura.
  // Se o dia de vencimento é menor que o dia de fechamento (ex: Nubank), o vencimento é sempre um mês após o mês de fechamento.
  const dueDate = new Date(
    dueYear,
    dueMonth + (rule.dueDay < rule.closeDay ? 1 : 0),
    rule.dueDay
  );

  // Zera as horas para evitar problemas com fuso horário
  dueDate.setHours(0, 0, 0, 0);

  return dueDate;
};
