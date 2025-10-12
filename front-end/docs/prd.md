# Product Requirements Document (PRD) - OriFin

## 1. Introdução

### 1.1. Visão Geral do Produto

O OriFin é um sistema de gestão de finanças pessoais projetado para ajudar indivíduos a monitorar e controlar suas despesas e receitas de forma eficiente. O objetivo é proporcionar uma visão clara da saúde financeira, permitindo que os usuários tomem decisões mais informadas sobre seus gastos e poupanças.

### 1.2. Nome do Produto

**OriFin** (Origem das Finanças / Orientação Financeira)

### 1.3. Objetivo Principal

Capacitar os usuários a ter total controle e visibilidade sobre suas finanças pessoais, facilitando o registro de transações, a categorização de gastos e a projeção de saldo, com foco especial na gestão de despesas e cartões de crédito.

## 2. Público-Alvo

Indivíduos que desejam organizar suas finanças pessoais, controlar gastos, acompanhar dívidas (especialmente de cartão de crédito) e planejar seu orçamento de forma mais eficaz.

## 3. Funcionalidades Principais

### 3.1. Registro de Despesas

- **Descrição:** O usuário poderá registrar cada despesa realizada.
- **Detalhes:**
  - **Valor:** Campo numérico para o montante da despesa.
  - **Data da Compra:** Data em que a despesa foi efetuada.
  - **Data de Vencimento/Pagamento:** Data prevista para o pagamento da despesa.
  - **Descrição:** Campo de texto livre para detalhes da despesa (ex: "Jantar com amigos", "Compras no supermercado").
  - **Meio de Pagamento/Fonte:** Seleção de onde o dinheiro saiu:
    - Dinheiro (Cash)
    - PIX
    - Cartão de Crédito (com seleção do cartão específico, se houver múltiplos)
    - Débito
    - Outros (a definir)

### 3.2. Categorização de Despesas

- **Descrição:** Cada despesa registrada deverá ser associada a uma categoria predefinida ou personalizada pelo usuário.
- **Detalhes:**
  - **Categorias Padrão:** Alimentação, Transporte, Moradia (Aluguel/Financiamento), Contas de Consumo (Água, Luz, Internet), Lazer, Saúde, Educação, Vestuário, Investimentos, Outros.
  - **Categorias Personalizadas:** O usuário poderá adicionar, editar e remover suas próprias categorias.

### 3.3. Dashboard Interativo

- **Descrição:** Uma tela inicial que oferece uma visão resumida e dinâmica das finanças do usuário.
- **Detalhes:**
  - **Destaque de Vencimentos:** Exibição clara das despesas com vencimento próximo (ex: nos próximos 7 dias).
  - **Montante de Despesas a Pagar por Categoria:** Gráfico ou lista mostrando o total de despesas pendentes agrupadas por categoria.
  - **Montante de Despesas a Pagar por Meio de Pagamento:** Gráfico ou lista mostrando o total de despesas pendentes agrupadas por meio de pagamento (ex: total a pagar no Cartão A, total a pagar via PIX).
  - **Resumo Geral:** Saldo atual, total de receitas e total de despesas no período selecionado (mês atual por padrão).

### 3.4. Visualização de Despesas em Tabela

- **Descrição:** Uma tela dedicada para listar todas as despesas de forma detalhada em formato de tabela.
- **Detalhes:**
  - **Colunas:** Valor, Data da Compra, Data de Vencimento, Descrição, Categoria, Meio de Pagamento.
  - **Funcionalidades:**
    - Filtros por período (mês, ano, personalizado).
    - Filtros por categoria.
    - Filtros por meio de pagamento.
    - Ordenação por colunas (valor, data, etc.).
    - Pesquisa por descrição.
    - Edição e exclusão de despesas diretamente na tabela.

### 3.5. Saldo Mensal e Projeção

- **Descrição:** O sistema permitirá que o usuário visualize o saldo financeiro ao longo dos meses, considerando receitas e despesas.
- **Detalhes:**
  - **Registro de Receitas:** Campo para registrar receitas mensais (salário, renda extra, etc.).
  - **Gráfico de Saldo:** Visualização gráfica do saldo projetado mês a mês, considerando receitas fixas e despesas registradas (pagas e a pagar).
  - **Comparativo:** Comparação entre receitas e despesas por mês.

### 3.6. Gestão de Cartões de Crédito

- **Descrição:** Funcionalidade para gerenciar múltiplos cartões de crédito, associando datas importantes para cada um.
- **Detalhes:**
  - **Cadastro de Cartão:** Nome do cartão (ex: "Visa Banco X"), Limite.
  - **Data de Fechamento da Fatura:** Data fixa mensal em que a fatura do cartão é fechada.
  - **Data de Vencimento da Fatura:** Data fixa mensal em que o pagamento da fatura é devido.
  - **Integração com Despesas:** Ao registrar uma despesa com cartão de crédito, o sistema deve associá-la ao cartão correto e considerar as datas de fechamento/vencimento para a projeção de saldo e dashboard.

## 4. Requisitos Não Funcionais

- **Performance:** O sistema deve ser responsivo, com carregamento rápido das telas e dados.
- **Segurança:** Proteção dos dados financeiros do usuário através de autenticação segura e criptografia.
- **Usabilidade:** Interface intuitiva e fácil de usar, mesmo para usuários sem experiência prévia em gestão financeira.
- **Confiabilidade:** Alta disponibilidade e consistência dos dados.

## 5. Considerações Técnicas (Breve)

- **Tecnologias:** A serem definidas, mas com foco em tecnologias que permitam o reaproveitamento de componentes (ex: React/Vue/Angular para Front-end, Node.js/Python/Java para Back-end, PostgreSQL/MySQL para Banco de Dados).
- **API:** Desenvolvimento de APIs RESTful para comunicação entre front-end e back-end.
- **Hospedagem:** Solução de hospedagem escalável e segura.

## 6. Próximos Passos

- Design da Interface do Usuário (UI/UX) - Wireframes e Mockups.
- Modelagem detalhada do banco de dados.
- Definição da arquitetura técnica final.
- Início do desenvolvimento do MVP (Minimum Viable Product).

---
