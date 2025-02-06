import React, { useState } from "react";
import { Search, X } from "lucide-react";

const HeaderSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <form action="/search" className="relative">
      <div
        className={`
          relative flex items-center overflow-hidden rounded-full
          border transition-all duration-300 ease-in-out
          ${
            isFocused
              ? "border-orange-500 bg-white shadow-sm"
              : "border-gray-200 bg-gray-50"
          }
          ${isFocused ? "w-64" : "w-40"} 
          sm:w-64
        `}
      >
        <Search
          className={`
            ml-3 h-4 w-4 flex-shrink-0 transition-colors duration-300
            ${isFocused ? "text-orange-500" : "text-gray-400"}
          `}
        />

        <input
          type="text"
          name="query"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products..."
          className={`
            w-full bg-transparent px-3 py-2 text-sm outline-none
            placeholder:text-gray-400 transition-all duration-300
            ${isFocused ? "text-gray-900" : "text-gray-600"}
          `}
        />

        {searchValue && (
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="mr-2 rounded-full p-1 hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="h-3 w-3 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default HeaderSearchBar;
