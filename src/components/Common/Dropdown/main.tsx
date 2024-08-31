import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../../utils/constants/cn";
import { MdArrowDropDown } from "react-icons/md";

interface DropdownProps {
  options: string[];
  label?: string;
  onSelect: (option: string) => void;
  activeOption: string;
  width?: number;
  className?:string
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  width,
  label,
  className,
  onSelect,
  activeOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    activeOption
  );
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (dropdownRect.bottom > viewportHeight && dropdownRect.top > dropdownRect.height) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      // style={{ width: width }}
      className={cn("relative w-7 z-50 top-0 inline-block text-left",className)}
    >
      <div>
        <button
          type="button"
          className="inline-flex truncate justify-between w-full rounded-md border items-center border-gray-200 shadow-sm px-4 py-[9px] bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={toggleDropdown}
        >
          {selectedOption || "Select an option"}
          <MdArrowDropDown
            className="ml-2 -mr-1 h-5 w-5 transform transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
          />
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ${
            dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="p-2 flex flex-col gap-2" role="none">
            {options.map((option) => (
              <button
                key={option}
                className={`${
                  selectedOption === option
                    ? "border border-primary text-primary"
                    : "text-gray-700 hover:bg-hoverLight hover:text-primary"
                } block w-full rounded-lg text-left px-4 py-2 text-sm`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
