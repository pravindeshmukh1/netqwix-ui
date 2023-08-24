import { useEffect, useRef, useState } from "react";
import { Search } from "react-feather";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  placeholder,
  handleChange,
  customClasses,
  selectedOption,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className={`dropdown ${customClasses.dropdown}`}>
      <div className="control">
        <div className="selected-value flex">
          <input
            placeholder={placeholder}
            className={customClasses.searchBar}
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
          <button
            className={`btn btn-primary rounded-0 ${customClasses.searchButton}`}
          >
            {" "}
            <Search />{" "}
          </button>
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`} />
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option) || selectedOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {/* {(option)} */}
              {option.isCategory ? (
                <div className="row m-0 option-item">
                  <div className="col-10 ">{option.name}</div>
                  <div className="col-2 ">
                    {" "}
                    <b> Category </b>{" "}
                  </div>
                </div>
              ) : (
                <div className="row m-0 option-item">
                  <div className="col-10 ">{option.name}</div>
                  <div className="col-2 ">
                    {" "}
                    <b> Trainer </b>{" "}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
