export interface OrderCustomer {
    _id: string;
    nama: string;
    email: string;
}

export interface OrderProduct {
    _id: string;
    nama: string;
    kodeSku: string;
    satuan: string;
    hargaJual: number;
}

export interface Order {
    _id: string;
    orderId: string;
    customerId: OrderCustomer;
    productId: OrderProduct;
    quantity: number;
    grossAmount: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    paymentUrl?: string;
    paymentType?: string;
    transactionId?: string;
    transactionStatus?: string;
    transactionTime?: string;
    settlementTime?: string;
}

export interface OrdersResponse {
    success: boolean;
    data: Order[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
