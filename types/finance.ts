// Finance Overview Types
export interface IncomeSource {
    source: string;
    amount: number;
    count: number;
    percentage: number;
}

export interface ExpenseSource {
    source: string;
    amount: number;
    count: number;
    percentage: number;
}

export interface MonthlyData {
    month: string;
    year: number;
    income: {
        fromSales: number;
        fromSettledOrders: number;
        total: number;
    };
    expenses: {
        fromPurchases: number;
        total: number;
    };
    netProfit: number;
}

export interface PaymentAnalysis {
    pending: {
        count: number;
        amount: number;
    };
    settlement: {
        count: number;
        amount: number;
    };
    cancel: {
        count: number;
        amount: number;
    };
    deny: {
        count: number;
        amount: number;
    };
    expire: {
        count: number;
        amount: number;
    };
    failure: {
        count: number;
        amount: number;
    };
}

export interface FinanceOverview {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
    incomeSources: IncomeSource[];
    expenseSources: ExpenseSource[];
    monthlyData: MonthlyData[];
    paymentAnalysis: PaymentAnalysis;
}

export interface FinanceOverviewResponse {
    success: boolean;
    data: FinanceOverview;
}

// Finance Cashflow Types
export interface CashflowTransaction {
    date: string;
    type: string;
    amount: number;
    balance: number;
}

export interface FinanceCashflow {
    cashflow: CashflowTransaction[];
    finalBalance: number;
}

export interface FinanceCashflowResponse {
    success: boolean;
    data: FinanceCashflow;
}

// Finance Payments Types
export interface PaymentTransaction {
    _id: string;
    orderId: string;
    date: string;
    customer: string;
    product: string;
    amount: number;
    paymentStatus: string;
    paymentType?: string;
    orderStatus: string;
    transactionTime?: string;
    settlementTime?: string;
}

export interface PaymentSummary {
    total: number;
    pending: number;
    settlement: number;
    failed: number;
    totalPendingAmount: number;
    totalSettledAmount: number;
}

export interface FinancePayments {
    summary: PaymentSummary;
    transactions: PaymentTransaction[];
}

export interface FinancePaymentsResponse {
    success: boolean;
    data: FinancePayments;
}

// Finance Income Types
export interface Sale {
    _id: string;
    date: string;
    type: string;
    customer: string;
    product: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
}

export interface Order {
    _id: string;
    date: string;
    type: string;
    orderId: string;
    customer: string;
    product: string;
    quantity: number;
    totalAmount: number;
    paymentType: string;
}

export interface IncomeSummary {
    totalFromSales: number;
    totalFromOrders: number;
    totalIncome: number;
    salesCount: number;
    ordersCount: number;
}

export interface FinanceIncome {
    summary: IncomeSummary;
    sales: Sale[];
    orders: Order[];
}

export interface FinanceIncomeResponse {
    success: boolean;
    data: FinanceIncome;
}

// Finance Expenses Types
export interface Purchase {
    _id: string;
    date: string;
    type: string;
    supplier: string;
    material: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
}

export interface ExpenseSummary {
    totalFromPurchases: number;
    totalExpenses: number;
    purchasesCount: number;
}

export interface FinanceExpenses {
    summary: ExpenseSummary;
    purchases: Purchase[];
}

export interface FinanceExpensesResponse {
    success: boolean;
    data: FinanceExpenses;
}
