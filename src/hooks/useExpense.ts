import { useEffect, useState } from 'react';

import { CreateExpenseUseCase, Expense } from '../core';
import { ExpenseRepository } from '../infra';

export const useExpense = () => {
  const repo = new ExpenseRepository();
  const createExpenseUseCase = new CreateExpenseUseCase(repo);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = async (expense: Expense) => {
    const newExpense = await createExpenseUseCase.execute(expense);
    setExpenses([...expenses, newExpense]);

    await load();
  };

  const load = async () => {
    const expenses = await repo.list();
    setExpenses(expenses);
  };

  useEffect(() => {
    load();
  }, []);

  return { expenses, addExpense };
};
