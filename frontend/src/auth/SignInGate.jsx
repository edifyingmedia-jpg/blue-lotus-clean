import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function SignInGate({ children }) {
  const { user, loading } = useAuth();

  // Wait until auth state is resolved
  if (loading) {
    return null; // or a loading spinner if you prefer
  }

  // Not signed in → go to sign-in page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Signed in → allow access
  return children;
}
