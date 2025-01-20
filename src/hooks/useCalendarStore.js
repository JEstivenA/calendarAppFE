import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdatedEvent,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Save event in the backend and update the store

    if (calendarEvent._id) {
      //Actualizando

      dispatch(onUpdatedEvent({ ...calendarEvent }));
    } else {
      //Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {
    //TODO: Delete event in the backend and update the store
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  };
};
