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
import { UserStore } from "../../Store/PagesStore/users";
import UserForm from "../Popups/users";
import DeletePopup from "../Popups/deletePopup";

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

const UsersCard: React.FC = () => {
  const { sidebarAction, sidebartrigger } = TriggerStore((state) => state);
  const { addUser,deleteUser,editUser,users } =
  UserStore((state) => state);

  const [openPopup, setOpenPopup] = useState(false);
  const [DeletPopup, setDeletPopup] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [addPropertyStatus, setAddProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenants, setSelectedTenants] = useState<UserInfo | null>(
    null
  );

  const columns = [
    { key: "userName", title: "User Name", type: "text" },
    { key: "userID", title: "User ID", type: "text" },
    { key: "contactNumber", title: "Contact Number", type: "text" },
    { key: "emailID", title: "Email ID", type: "email" },
    { key: "role", title: "Role", type: "text" },
    { key: "address", title: "Address", type: "text" },
    { key: "createdBy", title: "Created By", type: "text" },
    { key: "password", title: "Password", type: "password" },
    { key: "actions", title: "Actions", type: "component" }

]

  const handleEdit = (property: UserInfo) => {
    setSelectedTenants(property);
    setOpenPopup(true);
  };

  const handleDelete = () => {
    deleteUser(activeId);
    setDeletPopup(false);
  };

  const handleSubmit = (formData: UserInfo) => {
    console.log("FormData received in handleSubmit:", formData);
    setSelectedTenants(formData);
    if (addPropertyStatus) {
      addUser({ ...formData, userID: Math.random().toString() });
    } else {
      editUser(formData.userID, formData);
    }
    setOpenPopup(false);
    setAddProperty(false);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const filteredProperties = useMemo(() => {
    return users.filter((user) => {
      const matchesStatus =
        isActive === true || user.active === isActive;
      const matchesSearch = user.userName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [users, isActive, searchQuery]);

  return (
    <div className="container flex flex-col justify-center gap-4 h-full overflow-y-hidden">
      <div className="bg-gray-50 md:p-0 p-1 sticky top-0 z-0">
        <h1 className="text-2xl md:py-0 py-1 font-bold">Users Table</h1>
        <div className="flex flex-col sm:flex-row items-center md:flex sm:grid justify-between md:gap-0 gap-2">
          <Dropdown
            options={[ "Active", "InActive"]}
            width={200}
            onSelect={(e) => setIsActive(e=="Active"?true:false)}
            activeOption={isActive?"Active":"InActive"}
          />
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <button
            className="bg-primary text-white hover:bg-secondary rounded-lg px-4 py-2 text-sm"
            onClick={() => {
              setAddProperty(true);
              setOpenPopup(true);
              setSelectedTenants({
             userName: "",
                active: false,
                userID: "",
                contactNumber: "",
                emailID: "",
                role: "",
                address: "",
                createdBy: "",
                password: ""
            },);
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
                onDelete={() => {setActiveId(item.userID);setDeletPopup(true)}}
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
          closeButton={true}
          children={
            <UserForm
              initialData={selectedTenants as any}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isOpen={openPopup}
              id={selectedTenants?.userID}
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

export default UsersCard;
