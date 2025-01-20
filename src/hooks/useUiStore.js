import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(openModal());
  };

  const closeDateModal = () => {
    dispatch(closeModal());
  };

  return {
    //* ----> Propiedades
    isDateModalOpen,

    //* ----> Métodos
    openDateModal,
    closeDateModal,
  };
};
