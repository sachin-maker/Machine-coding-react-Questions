import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Pill from "./Pill";

const MultiSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setActiveSuggestion(0);
        })
        .catch((err) => console.error(err));
    }, 400); // debounce delay: 400ms
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.users.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectUser(suggestions.users[activeSuggestion]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUsers.map((user) => (
          <Pill
            key={user.email}
            image={user.image}
            text={`${user.firstName} ${user.lastName}`}
            onClick={() => handleRemoveUser(user)}
          />
        ))}

        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search For a User..."
            onKeyDown={handleKeyDown}
          />
          <ul className="suggestions-list">
            {suggestions?.users?.map((user, index) =>
              !selectedUserSet.has(user.email) ? (
                <li
                  className={index === activeSuggestion ? "active" : ""}
                  key={user.email}
                  onClick={() => handleSelectUser(user)}
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiSearchInput;
