import Modal from "react-modal";
import "./EventAdder.css";

const EventAdder = ({
  modalIsOpen,
  setModalIsOpen,
  newEvent,
  setNewEvent,
  handleAddEvent,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{ zIndex: 2000 }}
    >
      <h2>Add New Event</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
        </label>
        <label>
          Tag:
          <input
            type="text"
            value={newEvent.tag}
            onChange={(e) => setNewEvent({ ...newEvent, tag: e.target.value })}
          />
        </label>
        <label>
          Description:
          <textarea
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
        </label>
        <button type="button" onClick={handleAddEvent}>
          Add Event
        </button>
      </form>
    </Modal>
  );
};

export default EventAdder;
