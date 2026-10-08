import {
  Navigate
} from "react-router-dom";


function ProtectedRoute({
  children
}) {
  const loggedIn =
    localStorage.getItem(
      "nextpathLoggedIn"
    ) === "true";


  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  return children;
}


export default ProtectedRoute;