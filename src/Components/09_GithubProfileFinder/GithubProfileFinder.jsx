import { useEffect, useState } from 'react'
import './style.css'
import UserCard from './userCard';


const GithubProfileFinder = () => {

    const [username, setUsername] = useState("sachin-maker");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchGithubUserData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();

            if (data) {
                setUserData(data)
                setLoading(false)
                setUsername('')

            }

            console.log(data);


        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }

    useEffect(() => {
        fetchGithubUserData();
    }, [])


    const handleSubmit = () => {
        fetchGithubUserData();
    }

    if (loading) {
        return <div>Data is loading please wait.....</div>
    }


    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input
                    name="search-by-username"
                    type="text"
                    placeholder="Search Github Username..."
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {userData !== null ? <UserCard user={userData} /> : null}
        </div>
    );
}

export default GithubProfileFinder;