import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhone,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaBriefcase,
  FaPlusCircle,
  FaCommentDots,
} from "react-icons/fa"; // Import icons
import Dropdown from "../Common/Dropdown/main";

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
  comments: string;
};

interface TenantFormProps {
  initialData: Tenant;
  onSubmit: (formData: Tenant) => void;
  onCancel?: () => void;
  isOpen: boolean;
  id?: string;
}

const TenantForm: React.FC<TenantFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isOpen,
  id,
}) => {
  const [formData, setFormData] = useState<Tenant>(initialData);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.documents.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    const newDocuments = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments],
    });
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const fields = [
      "tenantName",
      "phoneNumber",
      "propertyName",
      "occupation",
      "dueDate",
      "dateOccupied",
      "depositAmount",
      "rent",
      "rentStatus",
    ];

    fields.forEach((field) => {
      if (!formData[field as keyof Tenant]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (isNaN(Number(formData.phoneNumber))) {
      newErrors.phoneNumber = "Phone number must be a valid number.";
    }

    if (isNaN(Number(formData.depositAmount))) {
      newErrors.depositAmount = "Deposit amount must be a valid number.";
    }

    if (isNaN(Number(formData.rent))) {
      newErrors.rent = "Rent must be a valid number.";
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const updatedDocuments = [
      ...formData.documents,
      ...files.map((file) => ({
        type: file.type,
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    ];
    setFormData({ ...formData, documents: updatedDocuments.slice(0, 5) });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-3xl mx-auto p-2 sm:p-3 lg:p-5">
      <h1 className="text-lg font-bold mb-4 flex justify-between items-center">
        Tenant Information{" "}
        <span className="text-md italic pr-4">{id ? id : ""}</span>
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <label
              htmlFor="tenantName"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaUser className="mr-2 text-blue-500 h-4 w-4" /> Tenant Name
            </label>
            <input
              type="text"
              id="tenantName"
              value={formData?.tenantName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.tenantName && (
              <p className="text-red-500 text-xs italic">
                {errors?.tenantName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaPhone className="mr-2 text-green-500 h-4 w-4" /> Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={formData?.phoneNumber || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.phoneNumber && (
              <p className="text-red-500 text-xs italic">
                {errors?.phoneNumber}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="propertyName"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaHome className="mr-2 text-yellow-500 h-4 w-4" /> Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              value={formData?.propertyName || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.propertyName && (
              <p className="text-red-500 text-xs italic">
                {errors?.propertyName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaBriefcase className="mr-2 text-purple-500 h-4 w-4" />{" "}
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              value={formData?.occupation || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.occupation && (
              <p className="text-red-500 text-xs italic">
                {errors?.occupation}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-orange-500 h-4 w-4" /> Due
              Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={formData?.dueDate || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.dueDate && (
              <p className="text-red-500 text-xs italic">{errors?.dueDate}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="dateOccupied"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-orange-500 h-4 w-4" /> Date
              Occupied
            </label>
            <input
              type="date"
              id="dateOccupied"
              value={formData?.dateOccupied || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors?.dateOccupied && (
              <p className="text-red-500 text-xs italic">
                {errors?.dateOccupied}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="depositAmount"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaMoneyBillWave className="mr-2 text-green-500 h-4 w-4" />{" "}
              Deposit Amount
            </label>
            <input
              type="number"
              id="depositAmount"
              value={formData?.depositAmount || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.depositAmount && (
              <p className="text-red-500 text-xs italic">
                {errors?.depositAmount}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="rent"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaMoneyBillWave className="mr-2 text-green-500 h-4 w-4" /> Rent
            </label>
            <input
              type="number"
              id="rent"
              value={formData?.rent || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
            />
            {errors?.rent && (
              <p className="text-red-500 text-xs italic">{errors?.rent}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="rentStatus"
              className="text-sm text-gray-700 font-bold flex items-center"
            >
              <FaFileAlt className="mr-2 text-blue-500 h-4 w-4" /> Rent Status
            </label>
            <Dropdown
              options={["Paid", "Unpaid"]}
              onSelect={(e: any) => setFormData({ ...formData, rentStatus: e })}
              activeOption={formData?.rentStatus}
              width={305}
            />
            {errors?.rentStatus && (
              <p className="text-red-500 text-xs italic">
                {errors?.rentStatus}
              </p>
            )}
          </div>
        </div>

        {/* <div className="mt-4"> */}
          <label className="text-sm text-gray-700 font-bold flex items-center">
            <FaPlusCircle className="mr-2 text-red-500 h-4 w-4" /> Upload
            Documents
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="shadow border-dashed border-2 border-gray-300 rounded-lg p-4 text-gray-500 flex justify-center items-center"
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-blue-500"
            >
              Drag and drop files here or click to upload
            </label>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {formData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="relative group border bg-hoverLight/80 border-gray-200 rounded-md shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    className="absolute -top-1 right-0 text-red-500 hover:text-red-700 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveDocument(index)}
                  >
                    &times;
                  </button>
                  <div className="p-1">
                    <p className="text-[12px] font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-[10px]"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
          {/* {formData.documents.length > 0 && (
            <ul className="flex gap-1 ">
              {formData.documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mt-2"
                >
                  <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(index)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        <div className="mt-4">
          <label
            htmlFor="comments"
            className="text-sm text-gray-700 font-bold flex items-center"
          >
              <FaCommentDots className="text-indigo-500 h-5 w-5 mr-2" /> Comments
              </label>
          <textarea
            id="comments"
            value={formData.comments || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none p-2 focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenantForm;
