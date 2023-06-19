import React, { useState, useEffect } from "react";

const SearchBar = ({ placeholder, onSearch, onSearchEnd }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsValid(e.target.value.length > 0);
    setIsLoading(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={!isValid}
      />
      <button disabled={isLoading} onClick={onSearch}>
        Search
      </button>
      {isLoading && <span>Loading...</span>}
    </div>
  );
};

export default SearchBar;
