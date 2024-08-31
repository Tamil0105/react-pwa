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
import { TenantsStore } from "../../Store/PagesStore/tenents";
import TenantForm from "../Popups/tenantsPopup";
import { BsEye } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import DocumentPopup from "../Popups/documentPopup";
import DeletePopup from "../Popups/deletePopup";

type Document = {
  type: string;
  name: string;
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

const TenantsCard: React.FC = () => {
  const { sidebarAction, sidebartrigger } = TriggerStore((state) => state);
  const { tenants, addTenant, deleteTenant, editTenant } = TenantsStore(
    (state) => state
  );

  const [openPopup, setOpenPopup] = useState(false);
  const [documentPopup, setDocumentPopup] = useState(false);
  const [DeletPopup, setDeletPopup] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [documents, setDocument] = useState<Document[]>();
  const [isActive, setIsActive] = useState("All");
  const [addPropertyStatus, setAddProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenants, setSelectedTenants] = useState<Tenant | null>(null);

  const columns = [
    { key: "tenantName", title: "Tenant Name", type: "text" },
    { key: "tenantID", title: "Tenant ID", type: "text" },
    { key: "phoneNumber", title: "Phone Number", type: "text" },
    { key: "propertyName", title: "Property Name", type: "text" },
    { key: "occupation", title: "Occupation", type: "text" },
    { key: "dueDate", title: "Due Date", type: "date" },
    { key: "dateOccupied", title: "Date Occupied", type: "date" },
    { key: "depositAmount", title: "Deposit Amount", type: "number" },
    { key: "rent", title: "Rent", type: "number" },
    { key: "rentStatus", title: "Rent Status", type: "text" },
    { key: "documents", title: "Documents", type: "array" },
    { key: "actions", title: "Actions", type: "component" },
  ];

  const handleEdit = (property: Tenant) => {
    setSelectedTenants(property);
    setOpenPopup(true);
  };

  const handleDelete = () => {
    console.log(activeId,"pp")
    deleteTenant(activeId);
    setDeletPopup(false)
  };

  const handleSubmit = (formData: Tenant) => {
    console.log("FormData received in handleSubmit:", formData);
    setSelectedTenants(formData);
    if (addPropertyStatus) {
      addTenant({ ...formData, tenantID: Math.random().toString() });
    } else {
      editTenant(formData.tenantID, formData);
    }
    setOpenPopup(false);
    setAddProperty(false);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const filteredProperties = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesStatus =
        isActive === "All" || tenant.rentStatus === isActive;
      const matchesSearch = tenant.tenantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tenants, isActive, searchQuery]);

  return (
    <div className="container flex flex-col justify-center gap-4 h-full overflow-y-hidden">
      <div className="bg-gray-50 md:p-0 p-1  sticky top-0 z-0">
        <h1 className="text-2xl md:py-0 py-1 font-bold">Tenants Table</h1>
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
              setSelectedTenants({
                tenantName: "",
                tenantID: "",
                phoneNumber: "",
                propertyName: "",
                occupation: "",
                dueDate: "",
                dateOccupied: "",
                depositAmount: 1500,
                rent: 1200,
                rentStatus: "",
                documents: [],
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
            documents: (
              <span className="flex justify-center">
                <BsEye
                  onClick={() => {
                    setDocument(item.documents);
                    setDocumentPopup(true);
                  }}
                  className="h-5 w-5 text-gray-500 hover:text-primary hover:h-7 hover:w-7 active:text-secondary cursor-pointer transition-transform transform-gpu hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
                />
              </span>
            ),
            actions: (
              <EditAndDeleteButton
                onDelete={() => {setDeletPopup(true);setActiveId(item.tenantID)}}
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
        <Pagination ExportFunction={false} />
      </div>
      {openPopup ? (
        
        <Popup
        className="lg:top-20"
          closeButton={true}
          children={
            <TenantForm
              initialData={selectedTenants as any}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isOpen={openPopup}
              id={selectedTenants?.tenantID}
            />
          }
          onClose={() => setOpenPopup(false)}
        />
      ) : null}
    
{documentPopup ? (
        <DocumentPopup documents={documents} setDocumentPopup={setDocumentPopup}/>

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

export default TenantsCard;
