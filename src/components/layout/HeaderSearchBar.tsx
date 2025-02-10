import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const HeaderSearchBar = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
      setIsSearchOpen(false);
      setSearchValue("");
    }
  };

  return (
    <>
      {/* Mobile Search Icon */}
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="flex md:hidden items-center justify-center rounded-full p-2 hover:bg-gray-100"
        aria-label="Open search"
      >
        <Search className="h-5 w-5 text-gray-600" onClick={handleSubmit} />
      </button>

      {/* Desktop Search Bar */}
      <form onSubmit={handleSubmit} className="relative hidden md:block">
        <div
          className={`
            relative flex items-center overflow-hidden rounded-full
            border transition-all duration-300 ease-in-out w-64
            ${isFocused ? "border-orange-500  shadow-sm" : "border-gray-200 dark:border-gray-600"}
          `}
        >
          <Search
            className={`
              ml-3 h-4 w-4 flex-shrink-0 transition-colors duration-300 hover:cursor-pointer
              ${isFocused ? "text-orange-500" : "text-gray-400"}
            `}
            onClick={handleSubmit}
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

      {/* Mobile Search Dialog */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Search Container */}
          <div className="absolute inset-x-0 top-0 bg-white p-4 shadow-lg">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>

                <div className="flex-1">
                  <div className="relative flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                    <Search className="ml-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="query"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-transparent px-3 py-2 text-sm outline-none"
                      autoFocus
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
                </div>
              </div>

              {/* Optional: Recent Searches or Search Suggestions */}
              {searchValue && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-gray-500">
                    Press enter to search
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSearchBar;
