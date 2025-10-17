import { useState } from 'react';
import { Layout, Button } from '../../components';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CreditCard,
  Calendar,
  CheckCircle2,
  LineChart,
  Wallet,
} from 'lucide-react';
import {
  ResponsiveContainer,
  // @ts-ignore
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

// Em um cenário real, este componente seria movido para seu próprio arquivo,
// por exemplo: src/presentation/components/widgets/StatCard.tsx
const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex items-center'>
        <div className='p-3 bg-blue-100 rounded-full'>
          <Icon className='h-6 w-6 text-blue-600' />
        </div>
        <div className='ml-4'>
          <p className='text-sm font-medium text-gray-500'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
        </div>
      </div>
    </div>
  );
};

// Novo componente para o resumo do dia
const DailySummaryCard = () => {
  // Em um cenário real, estes dados viriam de um hook (ex: useDailyExpenses)
  const expensesDueToday = [
    {
      description: 'Plano de Internet',
      amount: 'R$ 99,90',
      source: 'Débito Automático',
    },
    {
      description: 'Fatura do Cartão XP',
      amount: 'R$ 475,30',
      source: 'Cartão XP Visa',
    },
  ];
  // const expensesDueToday: any[] = []; // Para testar o estado sem vencimentos

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
  }).format(today);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800 capitalize'>
        {formattedDate}
      </h2>
      <div className='mt-4'>
        {expensesDueToday.length > 0 ? (
          <div className='space-y-4'>
            <p className='text-sm text-gray-600'>
              Você tem {expensesDueToday.length} conta(s) vencendo hoje:
            </p>
            <ul className='space-y-3'>
              {expensesDueToday.map((expense, index) => (
                <li key={index} className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-gray-800'>
                      {expense.description}
                    </p>
                    <p className='text-xs text-gray-500'>{expense.source}</p>
                  </div>
                  <p className='font-bold text-red-600'>{expense.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-center py-4'>
            <CheckCircle2 className='h-12 w-12 text-green-500 mb-2' />
            <p className='font-semibold text-gray-800'>
              Nenhuma conta vence hoje!
            </p>
            <p className='text-sm text-gray-500'>
              Aproveite seu dia com tranquilidade.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ForecastModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  // Gera dados mocados para os próximos 12 meses
  const generateForecastData = () => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const month = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
      }).format(date);

      const revenue = 5000 + Math.random() * 500;
      const expense = 3000 + Math.random() * 800;
      const balance = revenue - expense;

      data.push({ month, revenue, expense, balance });
    }
    return data;
  };

  const forecastData = generateForecastData();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const totalRevenue = forecastData.reduce(
    (acc, item) => acc + item.revenue,
    0
  );
  const totalExpense = forecastData.reduce(
    (acc, item) => acc + item.expense,
    0
  );
  const totalBalance = totalRevenue - totalExpense;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Projeção Financeira (12 Meses)
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            X
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Mês
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Receitas
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Despesas
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {forecastData.map((row, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize'>
                    {row.month}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-green-600'>
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600'>
                    {formatCurrency(row.expense)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold'>
                    {formatCurrency(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className='bg-gray-100'>
              <tr className='font-bold text-gray-800'>
                <td className='px-6 py-3 text-left'>Total</td>
                <td className='px-6 py-3 text-left text-green-700'>
                  {formatCurrency(totalRevenue)}
                </td>
                <td className='px-6 py-3 text-left text-red-700'>
                  {formatCurrency(totalExpense)}
                </td>
                <td className='px-6 py-3 text-left'>
                  {formatCurrency(totalBalance)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

const ExpenseForecastModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  // Gera dados mocados para os próximos 6 meses
  const generateExpenseForecastData = () => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const month = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
      }).format(date);

      const cards = [
        { name: 'Cartão XP Visa', total: 1800 + Math.random() * 200 },
        { name: 'Cartão Nubank', total: 400 + Math.random() * 150 },
      ];
      const fixedCosts = [
        { description: 'Aluguel', amount: 1200.0 },
        { description: 'Internet', amount: 99.9 },
        { description: 'Eletricidade', amount: 140 + Math.random() * 40 },
      ];

      const totalCards = cards.reduce((acc, card) => acc + card.total, 0);
      const totalFixed = fixedCosts.reduce((acc, cost) => acc + cost.amount, 0);

      data.push({
        month,
        cards,
        fixedCosts,
        total: totalCards + totalFixed,
      });
    }
    return data;
  };

  const expenseData = generateExpenseForecastData();

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl max-h-[90vh] flex flex-col'>
        <div className='flex justify-between items-center mb-6 flex-shrink-0'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Projeção de Despesas
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            X
          </Button>
        </div>
        <div className='overflow-y-auto space-y-6 pr-2'>
          {expenseData.map((monthData, index) => (
            <div
              key={index}
              className='bg-gray-50 p-4 rounded-lg border border-gray-200'
            >
              <h3 className='font-bold text-lg text-gray-900 capitalize mb-3'>
                {monthData.month}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Coluna de Cartões */}
                <div>
                  <h4 className='font-semibold text-gray-700 mb-2'>
                    Cartões de Crédito
                  </h4>
                  <ul className='space-y-2'>
                    {monthData.cards.map((card, i) => (
                      <li key={i} className='flex justify-between text-sm'>
                        <span>{card.name}</span>
                        <span className='font-medium'>
                          {formatCurrency(card.total)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Coluna de Custos Fixos */}
                <div>
                  <h4 className='font-semibold text-gray-700 mb-2'>
                    Custos Fixos
                  </h4>
                  <ul className='space-y-2'>
                    {monthData.fixedCosts.map((cost, i) => (
                      <li key={i} className='flex justify-between text-sm'>
                        <span>{cost.description}</span>
                        <span className='font-medium'>
                          {formatCurrency(cost.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='border-t mt-4 pt-3 flex justify-between font-bold text-base'>
                <span>Total do Mês</span>
                <span>{formatCurrency(monthData.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  // Mock data para os gráficos. Em um cenário real, viria de hooks.
  const categoryData = [
    { name: 'Alimentação', value: 850.75 },
    { name: 'Moradia', value: 1200.0 },
    { name: 'Transporte', value: 350.25 },
    { name: 'Lazer', value: 410.5 },
    { name: 'Outros', value: 309.0 },
  ];

  const paymentMethodData = [
    { name: 'Cartão XP', value: 1850.3 },
    { name: 'PIX', value: 750.2 },
    { name: 'Débito', value: 520.0 },
  ];

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <Layout>
      <div className='space-y-8'>
        <header className='flex flex-wrap justify-between items-center gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Painel de Controle
            </h1>
            <p className='text-gray-600 mt-1'>
              Sua visão geral financeira para este mês.
            </p>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => setIsExpenseModalOpen(true)}
            >
              <Wallet className='mr-2 h-4 w-4' />
              Projeção de Despesas
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <LineChart className='mr-2 h-4 w-4' />
              Projeção Geral
            </Button>
          </div>
        </header>

        <ForecastModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <ExpenseForecastModal
          isOpen={isExpenseModalOpen}
          onClose={() => setIsExpenseModalOpen(false)}
        />

        {/* Card de Resumo do Dia */}
        <DailySummaryCard />

        {/* Seção de Resumo Geral */}
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            title='Receitas do Mês'
            value='R$ 5.250,00'
            icon={TrendingUp}
          />
          <StatCard
            title='Despesas do Mês'
            value='R$ 3.120,50'
            icon={TrendingDown}
          />
          <StatCard title='Saldo Atual' value='R$ 2.129,50' icon={DollarSign} />
          <StatCard
            title='Vencendo em 7 dias'
            value='R$ 850,00'
            icon={AlertCircle}
          />
        </section>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Despesas por Categoria */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
              <Calendar className='h-5 w-5 mr-2 text-gray-600' />
              Despesas por Categoria
            </h2>
            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    'Total',
                  ]}
                />
                <Legend />
                <Pie
                  data={categoryData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  nameKey='name'
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Despesas por Meio de Pagamento */}
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
              <CreditCard className='h-5 w-5 mr-2 text-gray-600' />
              Despesas por Meio de Pagamento
            </h2>
            <ResponsiveContainer width='100%' height={250}>
              <BarChart data={paymentMethodData} layout='vertical'>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number' tickFormatter={formatCurrency} />
                <YAxis type='category' dataKey='name' width={100} />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    'Total',
                  ]}
                  cursor={{ fill: 'rgba(230, 230, 230, 0.5)' }}
                />
                <Bar dataKey='value' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </Layout>
  );
};
