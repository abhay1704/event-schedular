import "./Header.css";
import AuthContext from "../../context/loginStatus";
import { useContext } from "react";

const Header = ({
  isTaskOutlineOpen,
  toggleTaskOutline,
  handleToggleView,
  showCustomDayView,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="rbc-view--change">
      {window.innerWidth < 768 && (
        <button
          id="open-task-outline-btn"
          className={isTaskOutlineOpen ? "task-view--open" : ""}
          onClick={toggleTaskOutline}
        >
          <span className="ham" aria-hidden></span>
        </button>
      )}
      {!user.success && (
        <button>
          <a
            href="/signIn"
            style={{
              color: "var(--md-sys-color-on-primary)",
              height: "fit-content",
              marginTop: "0",
            }}
          >
            Sign In
          </a>
        </button>
      )}
      <button
        onClick={handleToggleView}
        style={{
          display: "inline-block",
          marginLeft: "auto",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "var(--md-sys-color-secondary)",
          color: "var(--md-sys-color-on-secondary)",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          textAlign: "right",
        }}
      >
        {showCustomDayView ? "Back to Calendar" : "Today's Agenda"}
      </button>
    </div>
  );
};

export default Header;
