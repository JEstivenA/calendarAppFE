import { addHours } from "date-fns";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";

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

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Estiven",
    notes: "Alvarez",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onDateChange = (event, changing) => {
    console.log(event, changing);

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

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2 ">
          <div>
            <label>Fecha y hora inicio</label>
          </div>
          <DatePicker
            className="form-control"
            selected={formValues.start}
            onChange={(event) => onDateChange(event, "start")}
            dateFormat={"Pp"}
          />
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
        </div>

        <div className="form-group mb-2">
          <div>
            <label>Fecha y hora fin</label>
          </div>
          <div className="w-full">
            <DatePicker
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(event) => onDateChange(event, "end")}
              dateFormat={"Pp"}
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
