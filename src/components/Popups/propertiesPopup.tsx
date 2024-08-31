import React, { useEffect, useState } from "react";
import { FaHome, FaDollarSign, FaRegAddressBook, FaCommentDots, FaBuilding, FaBed } from 'react-icons/fa'; // Import icons
import Dropdown from "../Common/Dropdown/main";

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

interface PropertyFormProps {
  initialData: Property;
  onSubmit: (formData: Property) => void;
  onCancel?: () => void;
  isOpen: boolean;
  id?: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isOpen,
  id
}) => {
  const [formData, setFormData] = useState<Property>(initialData);
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
    const fields = ["propertyName", "propertyStatus", "propertyType", "propertyAddress", "rentAmount", "numberOfRooms", "depositAmount", "size"];

    fields.forEach(field => {
      if (!formData[field as keyof Property]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    if (isNaN(Number(formData.rentAmount))) {
      newErrors.rentAmount = "Rent amount must be a number.";
    }

    if (isNaN(Number(formData.depositAmount))) {
      newErrors.depositAmount = "Deposit amount must be a number.";
    }

    if (isNaN(Number(formData.size))) {
      newErrors.size = "Size must be a number.";
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

  const handleSelect = (option: string) => {
    setFormData({ ...formData, propertyStatus: option });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg max-w-4xl mx-auto p-6">
      <h1 className="text-lg font-bold mb-6 flex justify-between items-center">
        Property Information <span className="text-md italic pr-4">{id ? id : ""}</span>
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="md:grid md:grid-cols-2 gap-2 grid-cols-1">
          <div className="flex flex-col gap-3">
            <label htmlFor="propertyName" className="text-sm text-gray-700 font-bold flex items-center">
              <FaHome className="text-blue-500 h-6 w-6 mr-2" /> Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              value={formData?.propertyName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-3 focus:shadow-outline"
            />
            {errors?.propertyName && <p className="text-red-500 text-xs italic">{errors?.propertyName}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="propertyStatus" className="text-sm text-gray-700 font-bold flex items-center">
              <FaBuilding className="text-green-500 h-6 w-6 mr-2" /> Property Status
            </label>
            <Dropdown
              options={["Occupied", "Unoccupied"]}
              onSelect={(e: any) => setFormData({ ...formData, propertyStatus: e })}
              activeOption={formData?.propertyStatus}
            className=" w-[100%]"
            />
            {errors?.propertyStatus && <p className="text-red-500 text-xs italic">{errors?.propertyStatus}</p>}
          </div>
          
          <div className="flex flex-col gap-3">
            <label htmlFor="propertyAddress" className="text-sm text-gray-700 font-bold flex items-center">
              <FaRegAddressBook className="text-purple-500 h-6 w-6 mr-2" /> Property Address
            </label>
            <textarea
              id="propertyAddress"
              value={formData?.propertyAddress || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.propertyAddress && <p className="text-red-500 text-xs italic">{errors?.propertyAddress}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="propertyType" className="text-sm text-gray-700 font-bold flex items-center">
              <FaHome className="text-yellow-500 h-6 w-6 mr-2" /> Property Type
            </label>
            <Dropdown
              options={["Residential", "Commercial"]}
              onSelect={(e: any) => setFormData({ ...formData, propertyType: e })}
              activeOption={formData?.propertyType}
            className=" w-[100%]"
            />
            {errors?.propertyType && <p className="text-red-500 text-xs italic">{errors?.propertyType}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="rentAmount" className="text-sm text-gray-700 font-bold flex items-center">
              <FaDollarSign className="text-red-500 h-6 w-6 mr-2" /> Monthly Rent
            </label>
            <input
              type="text"
              id="rentAmount"
              value={formData?.rentAmount || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.rentAmount && <p className="text-red-500 text-xs italic">{errors?.rentAmount}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="numberOfRooms" className="text-sm text-gray-700 font-bold flex items-center">
              <FaBed className="text-teal-500 h-6 w-6 mr-2" /> Number of Rooms
            </label>
            <input
              type="text"
              id="numberOfRooms"
              value={formData?.numberOfRooms || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.numberOfRooms && <p className="text-red-500 text-xs italic">{errors?.numberOfRooms}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="depositAmount" className="text-sm text-gray-700 font-bold flex items-center">
              <FaDollarSign className="text-red-600 h-6 w-6 mr-2" /> Deposit Amount
            </label>
            <input
              type="text"
              id="depositAmount"
              value={formData?.depositAmount || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.depositAmount && <p className="text-red-500 text-xs italic">{errors?.depositAmount}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="size" className="text-sm text-gray-700 font-bold flex items-center">
              <FaHome className="text-gray-500 h-6 w-6 mr-2" /> Size (in Sq. ft.)
            </label>
            <input
              type="text"
              id="size"
              value={formData?.size || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.size && <p className="text-red-500 text-xs italic">{errors?.size}</p>}
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <label htmlFor="comments" className="text-sm text-gray-700 font-bold flex items-center">
              <FaCommentDots className="text-pink-500 h-6 w-6 mr-2" /> Comments
            </label>
            <textarea
              id="comments"
              value={formData?.comments || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
