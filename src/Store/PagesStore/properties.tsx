import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Property {
  propertyName: string;
  propertyID:string;
  propertyStatus: string;
  propertyType: string;
  propertyAddress: string;
  rentAmount: string;
  numberOfRooms: string;
  depositAmount: string;
  size: string;
  comments: string;
}


interface Store {
  Properties: Property[];
  addProperty: (property: Property) => void;
  deleteProperty: (propertyID: string) => void;
  editProperty: (propertyID: string, updatedProperty: Partial<Property>) => void;
}

const initialProperties: Property[] = [
  {
    // Sunny Villa is a residential property located in Springville, currently unoccupied.
    "propertyName": "Sunny Villa",
    "propertyID": "PV123",
    "propertyAddress": "123 Sunshine Ave, Springville",
    "propertyType": "Residential",
    "propertyStatus": "Unoccupied",
    "depositAmount": "1500",
    "rentAmount": "3000",
    "size": "2500",
    "numberOfRooms": "4",
    "comments": "Good condition, spacious rooms."
  },
  {
    // Green Meadows is a residential property in Rivertown, currently occupied.
    "propertyName": "Green Meadows",
    "propertyID": "PM456",
    "propertyAddress": "456 Green Rd, Rivertown",
    "propertyType": "Residential",
    "propertyStatus": "Occupied",
    "depositAmount": "1800",
    "rentAmount": "3200",
    "size": "2800",
    "numberOfRooms": "5",
    "comments": "Well-maintained, popular among families."
  },
  {
    // Downtown Loft is a commercial property situated in Metropolis, currently unoccupied.
    "propertyName": "Downtown Loft",
    "propertyID": "PL789",
    "propertyAddress": "789 City Center, Metropolis",
    "propertyType": "Commercial",
    "propertyStatus": "Unoccupied",
    "depositAmount": "5000",
    "rentAmount": "8000",
    "size": "3000",
    "numberOfRooms": "0",
    "comments": "Prime location for businesses."
  },
  {
    // Hilltop Estate is a residential property located in Hilltown, currently occupied.
    "propertyName": "Hilltop Estate",
    "propertyID": "HE101",
    "propertyAddress": "101 Hillcrest, Hilltown",
    "propertyType": "Residential",
    "propertyStatus": "Occupied",
    "depositAmount": "2000",
    "rentAmount": "3500",
    "size": "3200",
    "numberOfRooms": "6",
    "comments": "Spacious and luxurious, family-friendly."
  },
  {
    // Beachfront Condo is a residential property in Seaside, currently unoccupied.
    "propertyName": "Beachfront Condo",
    "propertyID": "BC202",
    "propertyAddress": "202 Ocean Drive, Seaside",
    "propertyType": "Residential",
    "propertyStatus": "Unoccupied",
    "depositAmount": "2500",
    "rentAmount": "4000",
    "size": "1500",
    "numberOfRooms": "3",
    "comments": "Great views, ideal for vacationers."
  },
  {
    // Urban Office Space is a commercial property located in Citycenter, currently occupied.
    "propertyName": "Urban Office Space",
    "propertyID": "OS303",
    "propertyAddress": "303 Business Blvd, Citycenter",
    "propertyType": "Commercial",
    "propertyStatus": "Occupied",
    "depositAmount": "3000",
    "rentAmount": "6000",
    "size": "3500",
    "numberOfRooms": "0",
    "comments": "Good, well-suited for corporate offices."
  },
  {
    // Countryside Cottage is a residential property in Countryside, currently unoccupied.
    "propertyName": "Countryside Cottage",
    "propertyID": "CC404",
    "propertyAddress": "404 Rural Rd, Countryside",
    "propertyType": "Residential",
    "propertyStatus": "Unoccupied",
    "depositAmount": "1200",
    "rentAmount": "2500",
    "size": "1800",
    "numberOfRooms": "3",
    "comments": "Charming and rustic, ideal for a quiet retreat."
  },
  {
    // Lakeview Lodge is a residential property located in Lakeside, currently occupied.
    "propertyName": "Lakeview Lodge",
    "propertyID": "LL505",
    "propertyAddress": "505 Lake Shore Dr, Lakeside",
    "propertyType": "Residential",
    "propertyStatus": "Occupied",
    "depositAmount": "2200",
    "rentAmount": "3700",
    "size": "2700",
    "numberOfRooms": "5",
    "comments": "Beautiful lake views, popular with nature lovers."
  },
  {
    // Suburban Townhouse is a residential property in Suburbia, currently unoccupied.
    "propertyName": "Suburban Townhouse",
    "propertyID": "ST606",
    "propertyAddress": "606 Maple St, Suburbia",
    "propertyType": "Residential",
    "propertyStatus": "Unoccupied",
    "depositAmount": "1400",
    "rentAmount": "2800",
    "size": "2000",
    "numberOfRooms": "4",
    "comments": "Family-friendly area, well-connected."
  },
  {
    // Highrise Apartment is a residential property located in Big City, currently occupied.
    "propertyName": "Highrise Apartment",
    "propertyID": "HA707",
    "propertyAddress": "707 Tower Lane, Big City",
    "propertyType": "Residential",
    "propertyStatus": "Occupied",
    "depositAmount": "2500",
    "rentAmount": "5000",
    "size": "2200",
    "numberOfRooms": "4",
    "comments": "Modern and luxurious, great city views."
  },
  {
    // Mountain Retreat is a residential property located in Mountainview, currently unoccupied.
    "propertyName": "Mountain Retreat",
    "propertyID": "MR808",
    "propertyAddress": "808 Peak Dr, Mountainview",
    "propertyType": "Residential",
    "propertyStatus": "Unoccupied",
    "depositAmount": "1700",
    "rentAmount": "3200",
    "size": "2600",
    "numberOfRooms": "5",
    "comments": "Serene and peaceful, ideal for nature enthusiasts."
  },
  {
    // Historic Brownstone is a residential property located in Oldtown, currently occupied.
    "propertyName": "Historic Brownstone",
    "propertyID": "HB909",
    "propertyAddress": "909 Heritage St, Oldtown",
    "propertyType": "Residential",
    "propertyStatus": "Occupied",
    "depositAmount": "2000",
    "rentAmount": "3600",
    "size": "2400",
    "numberOfRooms": "4",
    "comments": "Character-rich property with historical charm."
  }
];



export const PropertiesStore = create<Store>(
  (set) => ({
    Properties: initialProperties,
    addProperty: (property) => set((state) => (console.log(property,"store"),{
      Properties: [property,...state.Properties],
    })),
    deleteProperty: (propertyID) => set((state) => (
      {
      Properties: state.Properties.filter(property => property.propertyID !== propertyID),
    })),
    editProperty: (propertyID, updatedProperty) => set((state) => (console.log(updatedProperty,"from store"),{

      
      Properties: state.Properties.map(property => 
        property.propertyID === propertyID
          ? { ...property, ...updatedProperty }
          : property
      ),
    })),
  })
);
