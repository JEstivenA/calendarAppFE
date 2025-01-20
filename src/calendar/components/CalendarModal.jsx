import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";

import "sweetalert2/dist/sweetalert2.min.css";

import "react-datepicker/dist/react-datepicker.css";

import { useCalendarModal } from "../../hooks";

registerLocale("es", es);

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const {
    //* Properties
    formValues,
    isDateModalOpen,
    titleClass,
    customStyles,

    //* Methods
    onInputChange,
    onDateChange,
    onSubmit,
    onCloseModal,
  } = useCalendarModal();

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2 ">
          <div>
            <label>Fecha y hora inicio</label>
          </div>
          <DatePicker
            className="form-control"
            selected={formValues.start}
            onChange={(event) => onDateChange(event, "start")}
            dateFormat={"Pp"}
            showTimeSelect
            locale={"es"}
            timeCaption="Hora"
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
              showTimeSelect
              locale={"es"}
              timeCaption="Hora"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
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
