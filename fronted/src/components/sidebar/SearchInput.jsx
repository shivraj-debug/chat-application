import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import GroupChat from "../GroupCreate.jsx";

const SearchInput = () => {
  const [search, setSearch] = useState(""); // State to track user input
  const [results, setResults] = useState([]); // State to store API results
  const [loading, setLoading] = useState(false); // Loading indicator

  const { setSelectedConversation } = useConversation();

  // Memoize the handleSearch function
  const handleSearch = useCallback(async () => {
    if (search.trim().length < 2) {
      toast.error("Search term must be at least 3 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/search?name=${search.trim()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
        }
      );

      const data = await response.json();
      setResults(data);
      if (data.length === 0) {
        toast.error("No users found!");
        setResults("no user found with this name");
        return;
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      toast.error(error.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Trigger search on input change with debounce
  useEffect(() => {
    if (search.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 500); // Add debounce to reduce API calls

      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, handleSearch]);

  // Handle user click
  const handleUserClick = (user) => {
    setSelectedConversation(user); // Directly set the user as the conversation
    setSearch(""); // Clear the search field
    setResults([]); // Clear results
  };

  return (
    <div className="w-full" >
      <div className="flex items-center gap-10 p-2">
        <div className="-mt-2 ">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading && <div className="spinner" />}
      </div>
       <GroupChat />
      </div>
      {results.length > 0 && (
        <ul>
          {results.map((user) => (
            <li
              key={user._id}
              className="p-2 cursor-pointer gap-6 hover:bg-blue-600"
              onClick={() => handleUserClick(user)}
            >
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt={`${user.fullName}'s avatar`}
                  className="w-12 h-12 rounded-full ml-2 inline-block"
                />
              )}
              <span className="text-lg ml-20 text-white">{user.fullName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
