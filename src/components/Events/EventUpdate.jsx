import Modal from "react-modal";
import "./EventAdder.css";

Modal.setAppElement("#root");

const EventAdder = ({
  modalIsOpen,
  setModalIsOpen,
  newEvent,
  setNewEvent,
  handleUpdateEvent,
  handleCancelUpdate,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{ zIndex: 2000 }}
    >
      <h2>Update Event</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
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
        <label htmlFor="start_time">
          Start Time:
          <input
            type="datetime-local"
            id="start_time"
            value={newEvent.start_time}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start_time: e.target.value })
            }
          />
        </label>

        <label htmlFor="end_time">
          End Time:
          <input
            type="datetime-local"
            id="end_time"
            value={newEvent.end_time}
            onChange={(e) =>
              setNewEvent({ ...newEvent, end_time: e.target.value })
            }
          />
        </label>

        <label htmlFor="reccurence">
          Recurrence:
          <select
            value={newEvent.recurrence}
            onChange={(e) =>
              setNewEvent({ ...newEvent, recurrence: e.target.value })
            }
          >
            <option value="never">Never</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        <div className="btn-group">
          <button type="button" className="cancel" onClick={handleCancelUpdate}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdateEvent}>
            Update Event
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventAdder;
