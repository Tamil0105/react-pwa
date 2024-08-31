import React, { useEffect, useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaMapMarkerAlt, FaUserCog } from "react-icons/fa";
import Dropdown from "../Common/Dropdown/main";

interface UserInfo {
  userName: string;
  active: boolean;
  userID: string;
  contactNumber: string;
  emailID: string;
  role: string;
  address: string;
  createdBy: string;
  password: string;
}

interface UserFormProps {
  initialData: UserInfo;
  onSubmit: (formData: UserInfo) => void;
  onCancel?: () => void;
  isOpen: boolean;
  id?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isOpen,
  id
}) => {
  const [formData, setFormData] = useState<UserInfo>({
    ...initialData,
    createdBy: initialData.createdBy || "admin",
  });

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
    const fields = ["userName", "contactNumber", "emailID", "role", "address", "createdBy", "password"];

    fields.forEach(field => {
      if (!formData[field as keyof UserInfo]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailID && !emailRegex.test(formData.emailID)) {
      newErrors.emailID = "Email ID is not valid.";
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
    <div className="bg-white rounded-lg w-full max-w-3xl mx-auto p-4">
      <h1 className="text-lg font-bold mb-4 flex justify-between items-center">
        User Information <span className="text-md italic pr-4">{id ? id : ""}</span>
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <label htmlFor="userName" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaUser className="mr-2 h-5 text-blue-500 w-5" />
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={formData?.userName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.userName && <p className="text-red-500 text-xs italic">{errors?.userName}</p>}
          </div>
         
          <div>
            <label htmlFor="contactNumber" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaPhone className="mr-2 h-5 text-yellow-500 w-5" />
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              value={formData?.contactNumber || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.contactNumber && <p className="text-red-500 text-xs italic">{errors?.contactNumber}</p>}
          </div>
          <div>
            <label htmlFor="emailID" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaEnvelope className="mr-2 h-5 text-red-500 w-5" />
              Email ID
            </label>
            <input
              type="email"
              id="emailID"
              value={formData?.emailID || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.emailID && <p className="text-red-500 text-xs italic">{errors?.emailID}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaUserCog className="mr-2 h-5 text-purple-500 w-5" />
              Role
            </label>
            <Dropdown
              options={["Admin", "Payment Collector",]}
              onSelect={(e: any) => setFormData({ ...formData, role: e })}
              activeOption={formData?.role}
              width={305}
            />
            {errors?.role && <p className="text-red-500 text-xs italic">{errors?.role}</p>}
          </div>
          <div>
            <label htmlFor="createdBy" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaUser className="mr-2 h-5 text-blue-500 w-5" />
              Created By
            </label>
            <input
              type="text"
              id="createdBy"
              disabled
              value={formData?.createdBy || "Admin"}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.createdBy && <p className="text-red-500 text-xs italic">{errors?.createdBy}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaMapMarkerAlt className="mr-2 h-5 text-teal-500 w-5" />
              Address
            </label>
            <textarea
              id="address"
              value={formData?.address || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.address && <p className="text-red-500 text-xs italic">{errors?.address}</p>}
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold flex items-center">
              <FaLock className="mr-2 h-5 text-gray-500 w-5" />
              Password
            </label>
            <input
              type="text"
              id="password"
              value={formData?.password || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.password && <p className="text-red-500 text-xs italic">{errors?.password}</p>}
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

export default UserForm;
