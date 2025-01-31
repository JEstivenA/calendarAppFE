import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../apis";
import { clearError, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    console.log({ email, password });
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales Incorrectas"));
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);

      dispatch(onLogout(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogout());
  };

  return {
    // * properties
    status,
    user,
    errorMessage,

    // * methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
