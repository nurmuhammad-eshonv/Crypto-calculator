import React, { useState, useEffect } from "react";

function Card({ countries }) {
  // First component states
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [inputV, setInputV] = useState("")

  const [result, setResult] = useState(0)
  const [key, setkey] = useState("€")

  
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected2, setSelected2] = useState({});
  const [searchTerm2, setSearchTerm2] = useState("");
  
  function handleSelect(country) {
    setSelected(country);
    setIsOpen(false);
    setSearchTerm("");
  }

  function handleSelect2(country) {
    setSelected2(country);
    setIsOpen2(false);
    setSearchTerm2("");
  }
  function handleBringValue() {

  }

  // Filter the countries based on the search term for the first component
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter the countries based on the search term for the second component
  const filteredCountries2 = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );


  useEffect(() => {
    const currencyKey = selected.currencies ? Object.keys(selected.currencies)[0] : null;
    const rateToUSD = currencyKey ? selected.currencies[currencyKey].rateToUSD : null;
     setkey(currencyKey ? selected.currencies[currencyKey].symbol : null)

    if (rateToUSD && inputV) {
      setResult(rateToUSD * inputV);
    } else {
      setResult(null); 
    }
  }, [inputV, selected]);
  console.log(selected);
  
  return (
    <>
      <div className="flex justify-center flex-wrap gap-7 m-40 ml-[150px] p-10 w-[1300px] border-black border-2">
        {/* <img src="" alt="" /> */}
        <p className="absolute -ml-[1100px] mt-3">{key}</p>
        <input
        onChange={(e) => {setInputV(e.target.value)}} 
          type="number"
          placeholder="enter a number...."
          className="p-3 border-2 w-[370px] rounded h-12 pl-10"
        />
        <div className="">
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
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

        {/* Second Component */}
        <div disabled className="">
          {!isOpen2 && (
            <div
              onClick={() => setIsOpen2(true)}
              className="flex gap-3 border-2 w-[370px] p-3 rounded items-center justify-between cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <img
                  className="rounded h-5 w-7"
                  src={"https://flagcdn.com/w320/us.png"}
                  alt=""
                />
                <h2>
                  USD - 
                  <span className="text-gray-500">
                     United States Dollar
                  </span>
                </h2>
              </div>

              <i className="fa-solid fa-arrow-down"></i>
            </div>
          )}

          {isOpen2 && (
            <div>
              <div className="border-2 rounded w-[370px] p-3 flex items-center justify-between">
                <input
                  className="outline-none w-80"
                  placeholder="Type to search"
                  type="text"
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                />
                <i
                  onClick={() => {
                    setIsOpen2(false);
                    setSearchTerm2("");
                  }}
                  className="fa-solid fa-x cursor-pointer"
                ></i>
              </div>

              <ul className="h-80 overflow-scroll w-[370px]">
                {filteredCountries2.map((country, index) => (
                  <div
                    onClick={() => handleSelect2(country)}
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
        <p className="text-4xl text-gray-600">{result} US Dollars</p>
      </div>
    </>
  );
}

export default Card;
