
import create from 'zustand';

type Document = {
    type: string;
    name:string
    url: string;
};

type Tenant = {
    tenantName: string;
    tenantID: string;
    phoneNumber: string;
    propertyName: string;
    occupation: string;
    dueDate: string;
    dateOccupied: string;
    depositAmount: number;
    rent: number;
    rentStatus: string;
    documents: Document[];
};

interface Store {
    tenants: Tenant[];
    addTenant: (tenant: Tenant) => void;
    deleteTenant: (tenantID: string) => void;
    editTenant: (tenantID: string, updatedTenant: Partial<Tenant>) => void;
}

const initialTenants: Tenant[] = [
    {
        tenantName: "John Doe",
        tenantID: "T12345",
        phoneNumber: "+1234567890",
        propertyName: "Sunset Villa",
        occupation: "Software Developer",
        dueDate: "2024-09-10",
        dateOccupied: "2023-08-15",
        depositAmount: 1500,
        rent: 1200,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id.pdf", name: "John Doe ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement.pdf", name: "John Doe Lease Agreement" }
        ]
    },
    {
        tenantName: "Jane Smith",
        tenantID: "T67890",
        phoneNumber: "+0987654321",
        propertyName: "Oceanview Apartment",
        occupation: "Graphic Designer",
        dueDate: "2024-09-15",
        dateOccupied: "2023-09-01",
        depositAmount: 1800,
        rent: 1400,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-jane.pdf", name: "Jane Smith ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-jane.pdf", name: "Jane Smith Lease Agreement" }
        ]
    },
    {
        tenantName: "Alice Johnson",
        tenantID: "T54321",
        phoneNumber: "+1122334455",
        propertyName: "Lakeside Cottage",
        occupation: "Teacher",
        dueDate: "2024-10-01",
        dateOccupied: "2023-10-01",
        depositAmount: 1600,
        rent: 1300,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-alice.pdf", name: "Alice Johnson ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-alice.pdf", name: "Alice Johnson Lease Agreement" }
        ]
    },
    {
        tenantName: "Bob Brown",
        tenantID: "T98765",
        phoneNumber: "+2233445566",
        propertyName: "Mountain Retreat",
        occupation: "Engineer",
        dueDate: "2024-10-10",
        dateOccupied: "2023-11-01",
        depositAmount: 2000,
        rent: 1500,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-bob.pdf", name: "Bob Brown ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-bob.pdf", name: "Bob Brown Lease Agreement" }
        ]
    },
    {
        tenantName: "Emily Davis",
        tenantID: "T24680",
        phoneNumber: "+3344556677",
        propertyName: "City Loft",
        occupation: "Accountant",
        dueDate: "2024-11-01",
        dateOccupied: "2023-12-01",
        depositAmount: 1700,
        rent: 1400,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-emily.pdf", name: "Emily Davis ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-emily.pdf", name: "Emily Davis Lease Agreement" }
        ]
    },
    {
        tenantName: "Michael Clark",
        tenantID: "T13579",
        phoneNumber: "+4455667788",
        propertyName: "Countryside Home",
        occupation: "Writer",
        dueDate: "2024-11-10",
        dateOccupied: "2023-11-15",
        depositAmount: 1900,
        rent: 1600,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-michael.pdf", name: "Michael Clark ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-michael.pdf", name: "Michael Clark Lease Agreement" }
        ]
    },
    {
        tenantName: "Sophia White",
        tenantID: "T97531",
        phoneNumber: "+5566778899",
        propertyName: "Suburban House",
        occupation: "Nurse",
        dueDate: "2024-12-01",
        dateOccupied: "2023-12-01",
        depositAmount: 1800,
        rent: 1500,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-sophia.pdf", name: "Sophia White ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-sophia.pdf", name: "Sophia White Lease Agreement" }
        ]
    },
    {
        tenantName: "Daniel Wilson",
        tenantID: "T86420",
        phoneNumber: "+6677889900",
        propertyName: "Downtown Apartment",
        occupation: "Marketing Specialist",
        dueDate: "2024-12-10",
        dateOccupied: "2023-12-15",
        depositAmount: 2100,
        rent: 1800,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-daniel.pdf", name: "Daniel Wilson ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-daniel.pdf", name: "Daniel Wilson Lease Agreement" }
        ]
    },
    {
        tenantName: "Olivia Martin",
        tenantID: "T35791",
        phoneNumber: "+7788990011",
        propertyName: "Beachfront Condo",
        occupation: "Photographer",
        dueDate: "2024-12-15",
        dateOccupied: "2023-12-20",
        depositAmount: 2300,
        rent: 1900,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-olivia.pdf", name: "Olivia Martin ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-olivia.pdf", name: "Olivia Martin Lease Agreement" }
        ]
    },
    {
        tenantName: "Lucas Scott",
        tenantID: "T46802",
        phoneNumber: "+8899001122",
        propertyName: "Historic Home",
        occupation: "Architect",
        dueDate: "2024-12-20",
        dateOccupied: "2024-01-01",
        depositAmount: 2400,
        rent: 2000,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-lucas.pdf", name: "Lucas Scott ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-lucas.pdf", name: "Lucas Scott Lease Agreement" }
        ]
    },
    {
        tenantName: "Mia Turner",
        tenantID: "T57903",
        phoneNumber: "+9900112233",
        propertyName: "Modern Apartment",
        occupation: "Consultant",
        dueDate: "2025-01-01",
        dateOccupied: "2024-01-01",
        depositAmount: 2500,
        rent: 2100,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-mia.pdf", name: "Mia Turner ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-mia.pdf", name: "Mia Turner Lease Agreement" }
        ]
    },
    {
        tenantName: "James Harris",
        tenantID: "T68024",
        phoneNumber: "+1001223344",
        propertyName: "Country House",
        occupation: "Farmer",
        dueDate: "2025-01-10",
        dateOccupied: "2024-01-10",
        depositAmount: 2600,
        rent: 2200,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-james.pdf", name: "James Harris ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-james.pdf", name: "James Harris Lease Agreement" }
        ]
    },
    {
        tenantName: "Ava Lee",
        tenantID: "T79135",
        phoneNumber: "+2112334455",
        propertyName: "Penthouse Suite",
        occupation: "Entrepreneur",
        dueDate: "2025-01-15",
        dateOccupied: "2024-01-15",
        depositAmount: 2700,
        rent: 2300,
        rentStatus: "Paid",
        documents: [
            { type: "ID", url: "https://example.com/id-ava.pdf", name: "Ava Lee ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-ava.pdf", name: "Ava Lee Lease Agreement" }
        ]
    },
    {
        tenantName: "Henry Moore",
        tenantID: "T24680",
        phoneNumber: "+3113445566",
        propertyName: "Country Villa",
        occupation: "Scientist",
        dueDate: "2025-02-01",
        dateOccupied: "2024-02-01",
        depositAmount: 2800,
        rent: 2400,
        rentStatus: "Pending",
        documents: [
            { type: "ID", url: "https://example.com/id-henry.pdf", name: "Henry Moore ID" },
            { type: "Lease Agreement", url: "https://example.com/lease-agreement-henry.pdf", name: "Henry Moore Lease Agreement" }
        ]
    }
];


export const TenantsStore = create<Store>((set) => ({
    tenants: initialTenants,
    addTenant: (tenant) => set((state) => ({
        tenants: [tenant, ...state.tenants],
    })),
    deleteTenant: (tenantID) => set((state) => ({
        tenants: state.tenants.filter(tenant => tenant.tenantID !== tenantID),
    })),
    editTenant: (tenantID, updatedTenant) => set((state) => ({
        tenants: state.tenants.map(tenant => 
            tenant.tenantID === tenantID
                ? { ...tenant, ...updatedTenant }
                : tenant
        ),
    })),
}));
