import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = {
  _id: new Date().getTime(),
  title: "Salida con amigos",
  notes: "comprar ropa",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Estiven",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvents],
    activeEvent: null,
  },
  reducers: {
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onRemoveActiveEvent: (state) => {
      state.activeEvent = null;
    },
    onUpdatedEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }

        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdatedEvent,
  onDeleteEvent,
  onRemoveActiveEvent,
} = calendarSlice.actions;
