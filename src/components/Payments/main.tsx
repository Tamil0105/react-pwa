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
import PaymentForm from "../Popups/payments";
import { PaymentsStore } from "../../Store/PagesStore/payments";
import { BsPlus } from "react-icons/bs";

interface PaymentInfo {
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

const PaymentCard: React.FC = () => {
  const { sidebarAction, sidebartrigger } = TriggerStore((state) => state);
  const { addPayment, deletePayment, editPayment, payments } =
    PaymentsStore((state) => state);

  const [openPopup, setOpenPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [addPropertyStatus, setAddProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PaymentInfo | null>(null);

  const columns = [
    { key: "propertyName", title: "Property Name", type: "text" },
    { key: "tenantName", title: "Tenant Name", type: "text" },
    { key: "paymentStatus", title: "Payment Status", type: "text" },
    { key: "paymentCollectedOn", title: "Payment Collected On", type: "date" },
    { key: "paymentCollectedBy", title: "Payment Collected By", type: "text" },
    { key: "rentOfMonth", title: "Rent of (Month)", type: "text" },
    { key: "balanceAmount", title: "Balance Amount", type: "number"},
    { key: "paymentMode", title: "Payment Mode", type: "text" },
    { key: "comments", title: "Comments", type: "text" },
    { key: "actions", title: "Actions", type: "component" }
  ];

  const handleEdit = (payments: PaymentInfo) => {
    setSelectedProperty(payments);
    setOpenPopup(true);
  };

  const handleDelete = (propertyID: string) => {
    deletePayment(propertyID);
  };

  const handleSubmit = (formData: PaymentInfo) => {
    console.log("FormData received in handleSubmit:", formData);
    setSelectedProperty(formData);
    if (addPropertyStatus) {
      addPayment({ ...formData, paymentId: Math.random().toString() });
    } else {
      editPayment(formData.paymentId, formData);
    }
    setOpenPopup(false);
    setAddProperty(false);
  };

  const handleCancel = () => {
    setOpenPopup(false);
  };

  const filteredProperties = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = payment.tenantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const paymentDate = new Date(payment.paymentCollectedOn);
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);

      const withinDateRange =
        (isNaN(startDate.getTime()) || paymentDate >= startDate) &&
        (isNaN(endDate.getTime()) || paymentDate <= endDate);

      return matchesSearch && withinDateRange;
    });
  }, [payments, searchQuery, dateFilter]);

  return (
    <div className="container flex flex-col justify-center gap-4 h-full overflow-y-hidden">
      <div className="bg-gray-50 md:p-0 p-1 sticky top-0 z-0">
        <h1 className="text-2xl md:py-0 py-1 font-bold">Payments Table</h1>
        <div className="flex flex-col sm:flex-row items-center md:flex sm:grid justify-between md:gap-0 gap-2">
  <div className="flex space-x-2">
    <input
      type="date"
      value={dateFilter.startDate}
      onChange={(e) => setDateFilter((prev) => ({ ...prev, startDate: e.target.value }))}
      className="p-2 border rounded w-40 h-10 focus:outline-none focus:ring-1 focus:ring-primary" 
    />
    <p className=" flex text-center items-center">To</p>
    <input
      type="date"
      value={dateFilter.endDate}
      onChange={(e) => setDateFilter((prev) => ({ ...prev, endDate: e.target.value }))}
      className="p-2 focus:outline-none focus:ring-1 focus:ring-primary border rounded w-40 h-10" 
    />
  </div>
  <SearchBar width={sidebarAction?"w-full md:w-[50%]":"w-full"} onSearch={(query) => setSearchQuery(query)} />
  <button
            className="bg-primary text-white hover:bg-secondary rounded-lg px-4 py-2 text-sm"
            onClick={() => {
      setAddProperty(true);
      setOpenPopup(true);
      setSelectedProperty({
        paymentId: "",
        propertyName: "",
        tenantName: "",
        paymentStatus: "",
        paymentCollectedOn: "",
        paymentCollectedBy: "",
        rentOfMonth: "",
        balanceAmount: 0,
        paymentMode: "",
        comments: ""
      });
    }}
  >
    {"Add New Payment"}
    
  </button>
</div>

      </div>

      <div className="overflow-auto w-full rounded-md h-96 scrollbar scroll-smooth">
        <Table
          columns={columns as any}
          data={filteredProperties.map((item) => ({
            ...item,
            actions: (
              <EditAndDeleteButton
                onDelete={() => handleDelete(item.paymentId)}
                onEdit={() => handleEdit(item)}
              />
            ),
          }))}
        />
      </div>

      <div
        className={`fixed bottom-0 ${
          sidebarAction || sidebartrigger
            ? "md:left-[242px] left-0"
            : "md:left-[69px] left-0"
        } right-0 bg-white duration-500 transition-all`}
      >
        <Pagination ExportFunction={true} data={payments}/>
      </div>
      {openPopup && (
        <Popup
          closeButton={true}
          children={
            <PaymentForm
              initialData={selectedProperty as any}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isOpen={openPopup}
              id={selectedProperty?.paymentId}
            />
          }
          onClose={() => setOpenPopup(false)}
        />
      )}
    </div>
  );
};

export default PaymentCard;
