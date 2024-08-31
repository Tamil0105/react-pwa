import create from 'zustand';

type UserInfo = {
    userName: string;
    active:boolean;
    userID: string;
    contactNumber: string;
    emailID: string;
    role: string;
    address: string;
    createdBy: string;
    password: string;
};

interface Store {
    users: UserInfo[];
    addUser: (user: UserInfo) => void;
    deleteUser: (userID: string) => void;
    editUser: (userID: string, updatedUser: Partial<UserInfo>) => void;
}

const Users:UserInfo[] =[{
    userName: "Alice Johnson",
    active:true,
    userID: "U12345",
    contactNumber: "+1234567890",
    emailID: "alice.johnson@example.com",
    role: "Admin",
    address: "123 Elm Street, Springfield",
    createdBy: "System",
    password: "hashedPassword1"
},
{
    userName: "Bob Brown",
    active:true,
    userID: "U67890",
    contactNumber: "+0987654321",
    emailID: "bob.brown@example.com",
    role: "Editor",
    address: "456 Oak Avenue, Shelbyville",
    createdBy: "Alice Johnson",
    password: "hashedPassword2"
},
{
    userName: "Charlie Davis",
    active:true,
    userID: "U23456",
    contactNumber: "+1122334455",
    emailID: "charlie.davis@example.com",
    role: "PaymentCollector",
    address: "789 Pine Road, Capital City",
    createdBy: "Bob Brown",
    password: "hashedPassword3"
},
{
    userName: "Diana Evans",
    active:true,
    userID: "U34567",
    contactNumber: "+2233445566",
    emailID: "diana.evans@example.com",
    role: "PaymentCollector",
    address: "321 Maple Lane, Springfield",
    createdBy: "System",
    password: "hashedPassword4"
},
{
    userName: "Ethan Fisher",
    active:true,
    userID: "U45678",
    contactNumber: "+3344556677",
    emailID: "ethan.fisher@example.com",
    role: "PaymentCollector",
    address: "654 Birch Boulevard, Shelbyville",
    createdBy: "Alice Johnson",
    password: "hashedPassword5"
}]

export const UserStore = create<Store>((set) => ({
    users: Users, 
    addUser: (user) => set((state) => ({
        users: [user, ...state.users],
    })),
    deleteUser: (userID) => set((state) => ({
        users: state.users.filter(user => user.userID !== userID),
    })),
    editUser: (userID, updatedUser) => set((state) => ({
        users: state.users.map(user => 
            user.userID === userID
                ? { ...user, ...updatedUser }
                : user
        ),
    })),
}));
