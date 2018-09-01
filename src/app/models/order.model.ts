

export interface Order {
    id?: string;
    items?: OrderProduct[];
    transactionDetails?: Details;
    datePlaced?: any;
    remitStatus?: boolean;
}

interface OrderProduct {
    product?: {
        id?: string;
        pattern?: string;
        unitPrice?: number;
    };
    quantity?: number;
    totalPrice?: number;
    transactionDetails?: Details;
}

interface Details {
    staff?: string;
    transactionType?: string;
    amountPaid?: number;
    balance?: number;
}
