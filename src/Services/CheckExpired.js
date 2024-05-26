import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const isExpired = () => {
  // debugger
  const token = localStorage.getItem("jwt") ;
  // console.log("token :", token);
  let res = null;

  if (!token) {
    // Token not found in cookie
    res = true; // Treat as expired or invalid
  }
  try {
    const decodedToken = jwtDecode(token); // Decode JWT token
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    // Check if token expiration time is in the past
    res = decodedToken.exp < currentTime;
  } catch (error) {
    // Failed to decode token (invalid token format)
    res = true; // Treat as expired or invalid
  }
  if (res == true) {
    localStorage.removeItem("user");
  }
  return res;
};

export default isExpired;
