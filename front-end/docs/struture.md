financial-manager-frontend/
│
├── src/
│ ├── domain/ # Camada de Domínio (Core Business)
│ │ ├── entities/
│ │ │ ├── Transaction.ts
│ │ │ ├── Account.ts
│ │ │ ├── Category.ts
│ │ │ ├── Budget.ts
│ │ │ ├── Goal.ts
│ │ │ └── User.ts
│ │ │
│ │ ├── value-objects/
│ │ │ ├── Money.ts
│ │ │ ├── DateRange.ts
│ │ │ ├── Email.ts
│ │ │ ├── CPF.ts
│ │ │ └── TransactionType.ts
│ │ │
│ │ ├── errors/
│ │ │ ├── DomainError.ts
│ │ │ ├── ValidationError.ts
│ │ │ └── BusinessRuleError.ts
│ │ │
│ │ └── services/ # Serviços de Domínio
│ │ ├── TransactionCalculator.ts
│ │ ├── BudgetAnalyzer.ts
│ │ ├── GoalProgressCalculator.ts
│ │ └── FinancialHealthScore.ts
│ │
│ ├── application/ # Camada de Aplicação (Use Cases)
│ │ ├── use-cases/
│ │ │ ├── transactions/
│ │ │ │ ├── CreateTransactionUseCase.ts
│ │ │ │ ├── UpdateTransactionUseCase.ts
│ │ │ │ ├── DeleteTransactionUseCase.ts
│ │ │ │ ├── ImportTransactionsUseCase.ts
│ │ │ │ ├── FilterTransactionsUseCase.ts
│ │ │ │ └── ExportTransactionsUseCase.ts
│ │ │ │
│ │ │ ├── accounts/
│ │ │ │ ├── CreateAccountUseCase.ts
│ │ │ │ ├── UpdateAccountUseCase.ts
│ │ │ │ ├── TransferBetweenAccountsUseCase.ts
│ │ │ │ ├── ReconcileAccountUseCase.ts
│ │ │ │ └── GetAccountSummaryUseCase.ts
│ │ │ │
│ │ │ ├── budgets/
│ │ │ │ ├── CreateBudgetUseCase.ts
│ │ │ │ ├── UpdateBudgetUseCase.ts
│ │ │ │ ├── AnalyzeBudgetStatusUseCase.ts
│ │ │ │ └── GetBudgetAlertsUseCase.ts
│ │ │ │
│ │ │ ├── reports/
│ │ │ │ ├── GenerateCashFlowReportUseCase.ts
│ │ │ │ ├── GenerateCategoryAnalysisUseCase.ts
│ │ │ │ ├── GenerateYearlyReportUseCase.ts
│ │ │ │ └── ExportReportUseCase.ts
│ │ │ │
│ │ │ ├── auth/
│ │ │ │ ├── LoginUseCase.ts
│ │ │ │ ├── LogoutUseCase.ts
│ │ │ │ ├── RefreshTokenUseCase.ts
│ │ │ │ └── ValidateSessionUseCase.ts
│ │ │ │
│ │ │ └── dashboard/
│ │ │ ├── GetDashboardDataUseCase.ts
│ │ │ ├── GetFinancialSummaryUseCase.ts
│ │ │ └── GetRecentActivitiesUseCase.ts
│ │ │
│ │ ├── ports/ # Interfaces (Contratos)
│ │ │ ├── repositories/
│ │ │ │ ├── ITransactionRepository.ts
│ │ │ │ ├── IAccountRepository.ts
│ │ │ │ ├── ICategoryRepository.ts
│ │ │ │ ├── IBudgetRepository.ts
│ │ │ │ └── IUserRepository.ts
│ │ │ │
│ │ │ ├── services/
│ │ │ │ ├── IAuthService.ts
│ │ │ │ ├── IStorageService.ts
│ │ │ │ ├── INotificationService.ts
│ │ │ │ ├── IAnalyticsService.ts
│ │ │ │ └── IExportService.ts
│ │ │ │
│ │ │ └── gateways/
│ │ │ ├── IPaymentGateway.ts
│ │ │ └── IBankingGateway.ts
│ │ │
│ │ ├── dto/ # Data Transfer Objects
│ │ │ ├── TransactionDTO.ts
│ │ │ ├── AccountDTO.ts
│ │ │ ├── BudgetDTO.ts
│ │ │ └── ReportDTO.ts
│ │ │
│ │ └── mappers/ # Mapeadores
│ │ ├── TransactionMapper.ts
│ │ ├── AccountMapper.ts
│ │ └── DomainToDTOMapper.ts
│ │
│ ├── infrastructure/ # Camada de Infraestrutura
│ │ ├── api/
│ │ │ ├── client/
│ │ │ │ ├── AxiosClient.ts
│ │ │ │ ├── APIInterceptors.ts
│ │ │ │ └── APIConfig.ts
│ │ │ │
│ │ │ ├── endpoints/
│ │ │ │ ├── TransactionEndpoints.ts
│ │ │ │ ├── AccountEndpoints.ts
│ │ │ │ ├── AuthEndpoints.ts
│ │ │ │ └── index.ts
│ │ │ │
│ │ │ └── websocket/
│ │ │ └── WebSocketClient.ts
│ │ │
│ │ ├── repositories/ # Implementação dos Repositórios
│ │ │ ├── TransactionRepository.ts
│ │ │ ├── AccountRepository.ts
│ │ │ ├── CategoryRepository.ts
│ │ │ ├── BudgetRepository.ts
│ │ │ └── CacheRepository.ts
│ │ │
│ │ ├── services/ # Implementação dos Serviços
│ │ │ ├── AuthService.ts
│ │ │ ├── LocalStorageService.ts
│ │ │ ├── IndexedDBService.ts
│ │ │ ├── NotificationService.ts
│ │ │ ├── AnalyticsService.ts
│ │ │ └── ExportService.ts
│ │ │
│ │ ├── cache/
│ │ │ ├── QueryCache.ts
│ │ │ ├── StateCache.ts
│ │ │ └── CacheStrategies.ts
│ │ │
│ │ └── persistence/
│ │ ├── LocalPersistence.ts
│ │ └── SessionPersistence.ts
│ │
│ ├── presentation/ # Camada de Apresentação (UI)
│ │ ├── components/
│ │ │ ├── common/ # Componentes reutilizáveis
│ │ │ │ ├── Button/
│ │ │ │ │ ├── Button.tsx
│ │ │ │ │ ├── Button.styles.ts
│ │ │ │ │ ├── Button.test.tsx
│ │ │ │ │ └── index.ts
│ │ │ │ ├── Input/
│ │ │ │ ├── Modal/
│ │ │ │ ├── Card/
│ │ │ │ ├── Table/
│ │ │ │ ├── Chart/
│ │ │ │ └── Loading/
│ │ │ │
│ │ │ ├── forms/ # Componentes de formulário
│ │ │ │ ├── TransactionForm/
│ │ │ │ ├── AccountForm/
│ │ │ │ ├── BudgetForm/
│ │ │ │ └── FilterForm/
│ │ │ │
│ │ │ ├── layouts/ # Layouts
│ │ │ │ ├── MainLayout/
│ │ │ │ ├── AuthLayout/
│ │ │ │ ├── DashboardLayout/
│ │ │ │ └── MobileLayout/
│ │ │ │
│ │ │ └── widgets/ # Widgets complexos
│ │ │ ├── TransactionList/
│ │ │ ├── AccountSummary/
│ │ │ ├── BudgetChart/
│ │ │ ├── ExpensesPieChart/
│ │ │ └── FinancialCalendar/
│ │ │
│ │ ├── pages/ # Páginas/Containers
│ │ │ ├── Dashboard/
│ │ │ │ ├── Dashboard.tsx
│ │ │ │ ├── Dashboard.styles.ts
│ │ │ │ ├── Dashboard.hooks.ts
│ │ │ │ └── Dashboard.test.tsx
│ │ │ ├── Transactions/
│ │ │ ├── Accounts/
│ │ │ ├── Budgets/
│ │ │ ├── Reports/
│ │ │ ├── Goals/
│ │ │ ├── Settings/
│ │ │ └── Auth/
│ │ │
│ │ ├── hooks/ # Custom Hooks
│ │ │ ├── useAuth.ts
│ │ │ ├── useTransaction.ts
│ │ │ ├── useAccount.ts
│ │ │ ├── useBudget.ts
│ │ │ ├── useNotification.ts
│ │ │ ├── usePagination.ts
│ │ │ ├── useInfiniteScroll.ts
│ │ │ ├── useDebounce.ts
│ │ │ └── useLocalStorage.ts
│ │ │
│ │ ├── contexts/ # React Contexts
│ │ │ ├── AuthContext.tsx
│ │ │ ├── ThemeContext.tsx
│ │ │ ├── NotificationContext.tsx
│ │ │ └── ConfigContext.tsx
│ │ │
│ │ ├── routes/ # Roteamento
│ │ │ ├── AppRouter.tsx
│ │ │ ├── PrivateRoute.tsx
│ │ │ ├── PublicRoute.tsx
│ │ │ └── routes.config.ts
│ │ │
│ │ └── styles/ # Estilos globais
│ │ ├── GlobalStyles.ts
│ │ ├── theme/
│ │ │ ├── colors.ts
│ │ │ ├── typography.ts
│ │ │ ├── spacing.ts
│ │ │ └── index.ts
│ │ └── utils/
│ │ └── mediaQueries.ts
│ │
│ ├── store/ # Gerenciamento de Estado
│ │ ├── slices/ # Redux Toolkit Slices
│ │ │ ├── authSlice.ts
│ │ │ ├── transactionSlice.ts
│ │ │ ├── accountSlice.ts
│ │ │ ├── budgetSlice.ts
│ │ │ └── uiSlice.ts
│ │ │
│ │ ├── actions/ # Actions
│ │ │ ├── transactionActions.ts
│ │ │ └── accountActions.ts
│ │ │
│ │ ├── selectors/ # Selectors
│ │ │ ├── transactionSelectors.ts
│ │ │ ├── accountSelectors.ts
│ │ │ └── dashboardSelectors.ts
│ │ │
│ │ ├── middleware/
│ │ │ ├── apiMiddleware.ts
│ │ │ ├── loggerMiddleware.ts
│ │ │ └── persistMiddleware.ts
│ │ │
│ │ └── store.ts
│ │
│ ├── shared/ # Código Compartilhado
│ │ ├── utils/
│ │ │ ├── formatters/
│ │ │ │ ├── money.formatter.ts
│ │ │ │ ├── date.formatter.ts
│ │ │ │ └── number.formatter.ts
│ │ │ ├── validators/
│ │ │ │ ├── transaction.validator.ts
│ │ │ │ ├── account.validator.ts
│ │ │ │ └── form.validator.ts
│ │ │ ├── helpers/
│ │ │ │ ├── array.helper.ts
│ │ │ │ ├── object.helper.ts
│ │ │ │ └── string.helper.ts
│ │ │ └── calculators/
│ │ │ └── financial.calculator.ts
│ │ │
│ │ ├── constants/
│ │ │ ├── api.constants.ts
│ │ │ ├── app.constants.ts
│ │ │ ├── routes.constants.ts
│ │ │ └── messages.constants.ts
│ │ │
│ │ ├── types/
│ │ │ ├── global.types.ts
│ │ │ ├── api.types.ts
│ │ │ └── component.types.ts
│ │ │
│ │ └── config/
│ │ ├── app.config.ts
│ │ ├── api.config.ts
│ │ └── i18n.config.ts
│ │
│ ├── tests/ # Configuração de Testes
│ │ ├── setup/
│ │ │ ├── setupTests.ts
│ │ │ └── testUtils.tsx
│ │ ├── mocks/
│ │ │ ├── handlers.ts
│ │ │ ├── server.ts
│ │ │ └── data/
│ │ └── fixtures/
│ │ └── testData.ts
│ │
│ ├── App.tsx # Componente raiz
│ ├── index.tsx # Entry point
│ └── setupProxy.js # Proxy para desenvolvimento
│
├── public/
│ ├── index.html
│ ├── manifest.json
│ └── assets/
│ ├── icons/
│ └── images/
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
