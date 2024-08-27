import React, { useState } from "react";

function Card({ countries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); 

  function handleSelect(country) {
    setSelected(country);
    setIsOpen(false);
    setSearchTerm("");
  }

  // Filter the countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="m-20">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="flex gap-3 border-2 w-[370px] p-3 rounded items-center justify-between cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <img
                className="rounded h-5 w-7"
                src={selected.flag || "https://picsum.photos/30/20"}
                alt=""
              />
              <h2>
                {selected.currencies
                  ? `${Object.keys(selected.currencies)[0]} - `
                  : "Currency - "}
                <span className="text-gray-500">
                  {selected.currencies
                    ? Object.values(selected.currencies)[0].name
                    : "Name of currency"}
                </span>
              </h2>
            </div>

            <i className="fa-solid fa-arrow-down"></i>
          </div>
        )}

        {isOpen && (
          <div>
            <div className="border-2 rounded w-[370px] p-3 flex items-center justify-between">
              <input
                className="outline-none w-80"
                placeholder="Type to search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              />
              <i
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm(""); // Clear search term when closing
                }}
                className="fa-solid fa-x cursor-pointer"
              ></i>
            </div>

            <ul className="h-80 overflow-scroll w-[370px]">
              {filteredCountries.map((country, index) => (
                <div
                  onClick={() => handleSelect(country)}
                  key={index}
                  className="w-[370px] p-3 flex gap-3 items-center hover:bg-slate-200 transition-1 cursor-pointer"
                >
                  <img className="h-5" src={country.flag} alt="flag" />
                  {country.currencies && (
                    <h2>
                      {Object.keys(country.currencies)[0]} -{" "}
                      <span className="text-gray-500">
                        {Object.values(country.currencies)[0].name}
                      </span>
                    </h2>
                  )}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default Card;
