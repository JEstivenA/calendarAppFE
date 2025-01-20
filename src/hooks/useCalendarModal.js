import { useEffect, useMemo, useState } from "react";
import { useUiStore, useCalendarStore } from "./";
import { addHours, differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { onRemoveActiveEvent } from "../store";

export const useCalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const dispatch = useDispatch();

  const { startSavingEvent } = useCalendarStore();

  const [formSubmited, setFormSubmited] = useState(false);

  const { activeEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formSubmited, formValues.title]);

  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onCloseModal = () => {
    dispatch(onRemoveActiveEvent());
    closeDateModal();
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const diference = differenceInSeconds(formValues.end, formValues.start);

    if (diference <= 0 || isNaN(diference)) {
      Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
      return;
    }

    if (formValues.title.trim().length <= 0) {
      Swal.fire("Error", "El título es obligatorio", "error");
      return;
    }

    console.log(formValues);

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  };

  return {
    //* Properties
    isDateModalOpen,
    formSubmited,
    activeEvent,
    formValues,
    titleClass,
    customStyles,

    //* Methods
    closeDateModal,
    setFormSubmited,
    setFormValues,
    onCloseModal,
    onDateChange,
    onInputChange,
    onSubmit,
  };
};
