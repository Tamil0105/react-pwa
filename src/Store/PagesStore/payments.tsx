
import create from 'zustand';

type PaymentInfo = {
    propertyName: string;
    tenantName: string;
    paymentId: string;
    paymentStatus: string;
    paymentCollectedOn: string;
    paymentCollectedBy: string;
    rentOfMonth: string;
    balanceAmount: number;
    paymentMode: string;
    comments: string;
};

const payments: PaymentInfo[] = [
    {
        paymentId: "PAY001",
        propertyName: "Sunset Villa",
        tenantName: "John Doe",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-01",
        paymentCollectedBy: "Alice Thompson",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Credit Card",
        comments: "Payment received on time."
    },
    {
        paymentId: "PAY002",
        propertyName: "Oceanview Apartment",
        tenantName: "Jane Smith",
        paymentStatus: "Pending",
        paymentCollectedOn: "2024-09-05",
        paymentCollectedBy: "Bob Williams",
        rentOfMonth: "August 2024",
        balanceAmount: 200,
        paymentMode: "Bank Transfer",
        comments: "Partial payment received, balance due."
    },
    {
        paymentId: "PAY003",
        propertyName: "Lakeside Cottage",
        tenantName: "Alice Johnson",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-03",
        paymentCollectedBy: "Emily Davis",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Cash",
        comments: "Paid in full, no issues."
    },
    {
        paymentId: "PAY004",
        propertyName: "Mountain Retreat",
        tenantName: "Bob Brown",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-10",
        paymentCollectedBy: "Michael Scott",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Check",
        comments: "Late payment, but cleared."
    },
    {
        paymentId: "PAY005",
        propertyName: "City Loft",
        tenantName: "Emily Davis",
        paymentStatus: "Pending",
        paymentCollectedOn: "2024-09-08",
        paymentCollectedBy: "Lucas White",
        rentOfMonth: "August 2024",
        balanceAmount: 100,
        paymentMode: "Credit Card",
        comments: "Balance to be cleared by the 15th."
    },
    {
        paymentId: "PAY006",
        propertyName: "Countryside Home",
        tenantName: "Michael Clark",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-02",
        paymentCollectedBy: "Sophia Taylor",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Bank Transfer",
        comments: "Payment received early."
    },
    {
        paymentId: "PAY007",
        propertyName: "Suburban House",
        tenantName: "Sophia White",
        paymentStatus: "Pending",
        paymentCollectedOn: "2024-09-07",
        paymentCollectedBy: "James Brown",
        rentOfMonth: "August 2024",
        balanceAmount: 50,
        paymentMode: "Cash",
        comments: "Partial payment, awaiting balance."
    },
    {
        paymentId: "PAY008",
        propertyName: "Downtown Apartment",
        tenantName: "Daniel Wilson",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-04",
        paymentCollectedBy: "Mia Anderson",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Check",
        comments: "Payment processed without issues."
    },
    {
        paymentId: "PAY009",
        propertyName: "Beachfront Condo",
        tenantName: "Olivia Martin",
        paymentStatus: "Completed",
        paymentCollectedOn: "2024-09-09",
        paymentCollectedBy: "Ethan Roberts",
        rentOfMonth: "August 2024",
        balanceAmount: 0,
        paymentMode: "Credit Card",
        comments: "Payment received after reminder."
    },
    {
        paymentId: "PAY010",
        propertyName: "Historic Home",
        tenantName: "Lucas Scott",
        paymentStatus: "Pending",
        paymentCollectedOn: "2024-09-06",
        paymentCollectedBy: "Olivia Lee",
        rentOfMonth: "August 2024",
        balanceAmount: 150,
        paymentMode: "Bank Transfer",
        comments: "Partial payment, needs follow-up."
    }
];

interface Store {
    payments: PaymentInfo[];
    addPayment: (payment: PaymentInfo) => void;
    deletePayment: (paymentId: string) => void;
    editPayment: (paymentId: string, updatedPayment: Partial<PaymentInfo>) => void;
}

export const PaymentsStore = create<Store>((set) => ({
    payments: payments,
    addPayment: (payment) => set((state) => ({
        payments: [payment, ...state.payments],
    })),
    deletePayment: (paymentId) => set((state) => ({
        payments: state.payments.filter(payment => payment.paymentId !== paymentId),
    })),
    editPayment: (paymentId, updatedPayment) => set((state) => ({
        payments: state.payments.map(payment => 
            payment.paymentId === paymentId
                ? { ...payment, ...updatedPayment }
                : payment
        ),
    })),
}));
