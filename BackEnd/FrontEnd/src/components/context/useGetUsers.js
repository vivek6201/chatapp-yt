import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useGetUsers() {
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getUsers = async() => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get("/api/users/", {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllUsers(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("Error status:", error.response.status);
                    console.log("Error data:", error.response.data);
                    console.log("Error headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Error request:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error message:", error.message);
                }
            }
        };
        getUsers();
    }, []); // Empty dependency array to ensure useEffect runs only once

    return [allUsers, loading];
}

export default useGetUsers;