import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  value: string;
};

interface DropdownProps {
  className?: string;
  classNameBtn?: string;
  label?: string;
  data: MenuItem[];
  onChange: (value: string) => void;
}

const Dropdown = forwardRef(function Dropdown({ className, classNameBtn, label, data, onChange }: DropdownProps, ref) {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);

  // handle click out side dropdown
  useEffect(() => {
    const handleCloseDropdown = () => {
      setShow(false);
    };

    window.addEventListener("click", handleCloseDropdown);

    return () => {
      window.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setActive(data.findIndex((item) => item.value === value));
    },
  }));

  return (
    <div className={className}>
      <button
        id={"dropdownDefaultButton" + Math.random()}
        data-dropdown-toggle="dropdown"
        className={`text-violet-950 bg-gray-100 border border-violet-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 h-12 overflow-hidden transition-all duration-300 ease-linear ${classNameBtn}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {data.length > 0 ? (
          <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer flex-1">
            <span>{data[active].label}</span>
            <span>{data[active].icon}</span>
          </div>
        ) : (
          label
        )}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-60 max-w-72 dark:bg-gray-700 absolute transition-all duration-300 ease-in-out ${
          show ? "block" : "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-80 overflow-y-auto w-full"
          aria-labelledby="dropdownDefaultButton"
        >
          {data.map((item, index) => (
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => {
                onChange(item.value);
                setActive(index);
              }}
              key={index}
            >
              <span>{item.label}</span>
              <span>{item.icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
export default Dropdown;
