/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEvent,
  NavBar,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";

import { localizer, getMesagesES } from "../../helpers";

import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPages = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const { events, activeEvent, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  const onSelectSlot = (event) => {
    console.log("select slot");
  };

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        messages={getMesagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onSelectSlot={onSelectSlot}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
