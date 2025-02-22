import { useEffect, useState } from "react";
import "./style.css";

const CustomScroll = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [scrollPercentage, setScrollPercentage] = useState(0);

    // Function to fetch data from API
    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();
            if (data?.products?.length > 0) {
                setData(data.products);
            }
        } catch (e) {
            setErrorMessage(e.message);
        } finally {
            setLoading(false);
        }
    }

    // Function to calculate scroll percentage
    const handleScrollPercentage = () => {
        const scrolled = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollPercentage((scrolled / height) * 100);
    };

    // Fetch data when the URL changes
    useEffect(() => {
        fetchData(url);
    }, [url]);

    // Attach and remove scroll event listener correctly
    useEffect(() => {
        window.addEventListener("scroll", handleScrollPercentage);
        return () => {
            window.removeEventListener("scroll", handleScrollPercentage);
        };
    }, []); // ✅ Runs only once on mount

    // Display error message if API call fails
    if (errorMessage) {
        return <div>Error! {errorMessage}</div>;
    }

    // Show loading message while fetching data
    if (loading) {
        return <div>Loading data! Please wait...</div>;
    }

    return (
        <div>
            {/* Scroll Indicator */}
            <div className="top-container">
                <h1>Custom Scroll Indicator</h1>
                <div className="scroll-progress-tracking-container">
                    <div
                        className="current-progress-bar"
                        style={{ width: `${scrollPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Render API Data */}
            <div className="data-container">
                {data.length > 0
                    ? data.map((item) => <p key={item.id}>{item.title}</p>) // ✅ Added a unique key
                    : null}
            </div>
        </div>
    );
};

export default CustomScroll;
