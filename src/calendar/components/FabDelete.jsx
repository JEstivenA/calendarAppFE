import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      style={{
        display: hasEventSelected && !isDateModalOpen ? "block" : "none",
      }}
      onClick={handleDelete}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
