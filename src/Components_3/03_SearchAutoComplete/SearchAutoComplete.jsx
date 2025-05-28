import { useEffect, useState } from "react";
import Suggestions from "./Suggestions";

const SearchAutoComplete = () => {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState("");
    const [dropDown, setDropDown] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([]);


    const handleChange = (event) => {

        const query = event.target.value.toLowerCase();
        setSearchParams(query);
        if (query.length > 1) {
          const filteredData =
            userData && userData.length
              ? userData.filter((item) => item.toLowerCase().indexOf(query) > -1)
              : [];
          setFilteredUsers(filteredData);
          setDropDown(true);
        } else {
          setDropDown(false);
        }

    }

    const fetchUserData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/users`);

            const data = await response.json();

            console.log(data)

            if (data && data.users && data.users.length) {
                setUserData(data.users.map((item) => item.firstName))
                setLoading(false)

            }

        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])
    function handleClick(event){
        setDropDown(false)
        setSearchParams(event.target.innerText)
        setFilteredUsers([])
      }

    console.log(userData)

    return (
        <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading Data ! Please wait</h1>
      ) : (
        <input
          value={searchParams}
          name="search-users"
          placeholder="Search Users here..."
          onChange={handleChange}
        />
      )}

      {dropDown && <Suggestions handleClick={handleClick} data={filteredUsers} />}
    </div>
  );
}
export default SearchAutoComplete;