import React, { useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown/main";
import { FaCalendarAlt, FaMoneyBill, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BsChatDots, BsChatDotsFill } from "react-icons/bs";

interface PaymentInfo {
  propertyName: string;
  paymentId: string;
  tenantName: string;
  paymentStatus: string;
  paymentCollectedOn: string;
  paymentCollectedBy: string;
  rentOfMonth: string;
  balanceAmount: number;
  paymentMode: string;
  comments: string;
}

interface PaymentFormProps {
  initialData: PaymentInfo;
  onSubmit: (formData: PaymentInfo) => void;
  onCancel?: () => void;
  isOpen: boolean;
  id?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isOpen,
  id
}) => {
  const [formData, setFormData] = useState<PaymentInfo>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const fields = ["propertyName", "tenantName", "paymentStatus", "paymentCollectedOn", "paymentCollectedBy", "rentOfMonth", "balanceAmount", "paymentMode"];

    fields.forEach(field => {
      if (!formData[field as keyof PaymentInfo]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    if (isNaN(Number(formData.balanceAmount))) {
      newErrors.balanceAmount = "Balance amount must be a valid number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg w-full max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">
          Payment Information <span className="text-md italic pr-4">{id ? id : ""}</span>
        </h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div className="">
            <label htmlFor="propertyName" className="text-sm text-gray-700 font-bold flex items-center">
              <FaUser className="mr-2 h-4 w-4  text-blue-500" />
              Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              value={formData?.propertyName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.propertyName && <p className="text-red-500 text-xs italic">{errors?.propertyName}</p>}
          </div>
          <div className="">
            <label htmlFor="tenantName" className="text-sm text-gray-700 font-bold flex items-center">
              <FaUser className="mr-2 h-4 w-4  text-blue-500" />
              Tenant Name
            </label>
            <input
              type="text"
              id="tenantName"
              value={formData?.tenantName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.tenantName && <p className="text-red-500 text-xs italic">{errors?.tenantName}</p>}
          </div>
          <div className="">
            <label htmlFor="paymentStatus" className="text-sm text-gray-700 font-bold flex items-center">
              <RiMoneyRupeeCircleFill className="mr-2 h-4 w-4  text-green-500" />
              Payment Status
            </label>
            <Dropdown
              options={["Paid", "Pending"]}
              onSelect={(e: any) => setFormData({ ...formData, paymentStatus: e })}
              activeOption={formData?.paymentStatus}
              width={305}
            />
            {errors?.paymentStatus && <p className="text-red-500 text-xs italic">{errors?.paymentStatus}</p>}
          </div>
          <div className="" >
            <label htmlFor="paymentCollectedOn" className="text-sm text-gray-700 font-bold flex items-center">
              <RiMoneyRupeeCircleFill className="mr-2 h-4 w-4  text-green-500" />
              Payment Collected On
            </label>
            <input
              type="date"
              id="paymentCollectedOn"
              value={formData?.paymentCollectedOn || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.paymentCollectedOn && <p className="text-red-500 text-xs italic">{errors?.paymentCollectedOn}</p>}
          </div>
          <div className="">
            <label htmlFor="paymentCollectedBy" className="text-sm text-gray-700 font-bold flex items-center">
              <FaUser className="mr-2 h-4 w-4  text-blue-500" />
              Payment Collected By
            </label>
            <input
              type="text"
              id="paymentCollectedBy"
              value={formData?.paymentCollectedBy || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.paymentCollectedBy && <p className="text-red-500 text-xs italic">{errors?.paymentCollectedBy}</p>}
          </div>
          <div className="">
            <label htmlFor="rentOfMonth" className="text-sm text-gray-700 font-bold flex items-center">
              <FaMoneyBill className="mr-2 h-4 w-4  text-yellow-500" />
              Rent of Month
            </label>
            <input
              type="text"
              id="rentOfMonth"
              value={formData?.rentOfMonth || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.rentOfMonth && <p className="text-red-500 text-xs italic">{errors?.rentOfMonth}</p>}
          </div>
          <div className="">
            <label htmlFor="balanceAmount" className="text-sm text-gray-700 font-bold flex items-center">
              <FaMoneyBill className="mr-2 h-4 w-4  text-yellow-500" />
              Balance Amount
            </label>
            <input
              type="number"
              id="balanceAmount"
              value={formData?.balanceAmount || 0}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.balanceAmount && <p className="text-red-500 text-xs italic">{errors?.balanceAmount}</p>}
          </div>
          <div className="">
            <label htmlFor="paymentMode" className="text-sm text-gray-700 font-bold flex items-center">
              <RiMoneyRupeeCircleFill className="mr-2 h-4 w-4  text-green-500" />
              Payment Mode
            </label>
            <Dropdown
              options={["Cash", "Credit Card", "Bank Transfer"]}
              onSelect={(e: any) => setFormData({ ...formData, paymentMode: e })}
              activeOption={formData?.paymentMode}
              width={305}
            />
            {errors?.paymentMode && <p className="text-red-500 text-xs italic">{errors?.paymentMode}</p>}
          </div>
        
        </div>
        <div className="">
            <label htmlFor="comments" className="text-sm text-gray-700 font-bold flex items-center">
              <BsChatDotsFill className="mr-2 h-4 w-4  text-green-500" />
              Comments
            </label>
            <textarea
              id="comments"
              value={formData?.comments || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        <div className="flex flex-col sm:flex-row justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
