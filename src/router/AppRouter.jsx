import { Navigate, Route, Routes } from "react-router";
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";

export const AppRouter = () => {
  const authStatus = "authenticated"; //"not-authenticated";

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPages />} />
      ) : (
        <Route path="/*" element={<CalendarPages />} />
      )}
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
