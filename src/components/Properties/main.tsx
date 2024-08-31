import React, { useState, useMemo } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { PropertiesStore } from "../../Store/PagesStore/properties";
import Table from "../Common/Table/main";
import PropertyForm from "../Popups/propertiesPopup";
import Dropdown from "../Common/Dropdown/main";
import SearchBar from "../Common/SearchBar/main";
import Pagination from "../Pagination/main";
import { TriggerStore } from "../../Store";
import { Popup } from "../Common/Popup/main";
import DeletePopup from "../Popups/deletePopup";

interface Property {
  propertyName: string;
  propertyID: string;
  propertyStatus: string;
  propertyType: string;
  propertyAddress: string;
  rentAmount: string;
  numberOfRooms: string;
  depositAmount: string;
  size: string;
  comments: string;
}

const EditAndDeleteButton: React.FC<{
  onEdit: () => void;
  onDelete: () => void;
}> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button className="btn btn-secondary" onClick={onEdit}>
        <MdEdit className="h-5 w-5 hover:text-primary" />
      </button>
      <button className="btn btn-danger" onClick={onDelete}>
        <MdDelete className="h-5 w-5 hover:text-red-500" />
      </button>
    </div>
  );
};

const PropertiesCard: React.FC = () => {
  const { sidebarAction, sidebartrigger } = TriggerStore((state) => state);
  const { Properties, deleteProperty, addProperty, editProperty } =
    PropertiesStore((state) => state);

  const [openPopup, setOpenPopup] = useState(false);
  const [DeletPopup, setDeletPopup] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [addPropertyStatus, setAddProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const columns = [
    { key: "propertyName", title: "Property Name", type: "text" },
    { key: "propertyID", title: "Property ID", type: "text" },
    { key: "propertyAddress", title: "Property Address", type: "text" },
    { key: "propertyType", title: "Property Type", type: "text" },
    { key: "propertyStatus", title: "Property Status", type: "text" },
    { key: "depositAmount", title: "Deposit Amount", type: "number" },
    { key: "rentAmount", title: "Rent Amount", type: "number" },
    { key: "size", title: "Size (in Sq. ft.)", type: "number" },
    { key: "numberOfRooms", title: "No. of Rooms", type: "number" },
    { key: "actions", title: "Actions", type: "component" },
  ];

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setOpenPopup(true);
  };

  const handleDelete = () => {
    deleteProperty(activeId);
    setDeletPopup(false)
  };

  const handleSubmit = (formData: Property) => {
    console.log("FormData received in handleSubmit:", formData);
    setSelectedProperty(formData);
    if (addPropertyStatus) {
      addProperty({ ...formData, propertyID: Math.random().toString() });
    } else {
      editProperty(formData.propertyID, formData);
    }
    setOpenPopup(false);
    setAddProperty(false);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const filteredProperties = useMemo(() => {
    return Properties.filter((property) => {
      const matchesStatus =
        isActive === "All" || property.propertyStatus === isActive;
      const matchesSearch = property.propertyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [Properties, isActive, searchQuery]);

  return (
    <div className="container flex flex-col justify-center gap-3 h-full overflow-y-hidden">
      <div className=" md:p-0 p-1 sticky top-0 z-0">
        <h1 className="text-2xl md:py-0 py-1 font-bold">Properties Table</h1>
        <div className="flex flex-col sm:flex-row items-center md:flex sm:grid justify-between md:gap-0 gap-2">
          <Dropdown
            options={["All", "Active", "Inactive"]}
            className="w-52"
            onSelect={(e) => setIsActive(e)}
            activeOption={isActive}
          />
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <button
            className="bg-primary text-white hover:bg-secondary rounded-lg px-4 py-2 text-sm"
            onClick={() => {
              setAddProperty(true);
              setOpenPopup(true);
              setSelectedProperty({
                propertyName: "",
                propertyID: "",
                propertyAddress: "",
                propertyType: "",
                propertyStatus: "",
                depositAmount: "",
                rentAmount: "",
                size: "",
                numberOfRooms: "",
                comments: "",
              });
            }}
          >
            Add New Property
          </button>
        </div>
      </div>

      <div className="overflow-auto  w-full rounded-md h-96 scrollbar scroll-smooth">
        <Table
          columns={columns as any}
          data={filteredProperties.map((item) => ({
            ...item,
            actions: (
              <EditAndDeleteButton
                onDelete={() => {
                  setActiveId(item.propertyID);
                  setDeletPopup(true);
                }}
                onEdit={() => handleEdit(item)}
              />
            ),
          }))}
        />
      </div>

      {/* Pagination fixed at the bottom */}
      <div
        className={`fixed bottom-0 ${
          sidebarAction || sidebartrigger
            ? "md:left-[242px] left-0"
            : "md:left-[69px] left-0"
        } right-0 bg-white   duration-500 transition-all`}
      >
        <Pagination ExportFunction={false}  />
      </div>
      {openPopup ? (
        <Popup
        className="lg:top-5"
          closeButton={true}
          children={
            <PropertyForm
              initialData={selectedProperty as any}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isOpen={openPopup}
              id={selectedProperty?.propertyID}
            />
          }
          onClose={() => setOpenPopup(false)}
        />
      ) : null}
      {DeletPopup ? (
        <Popup
          children={
            <DeletePopup
              isOpen={DeletPopup}
              onClose={() => setDeletPopup(false)}
              onDelete={handleDelete}
            />
          }
          onClose={() => setDeletPopup(false)}
        />
      ) : null}
    </div>
  );
};

export default PropertiesCard;
