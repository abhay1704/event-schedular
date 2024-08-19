import TaskList from "./TaskList";
import "./TaskOverview.css";

const tasks = {
  "2024-08-18": [
    {
      name: "Project Kickoff",
      tag: "Work",
      start_time: "2024-08-18T08:30:00Z",
      end_time: "2024-08-18T09:00:00Z",
      description: "Initial meeting to kickoff the new project.",
    },
    {
      name: "Assignment Submission",
      tag: "Personal",
      start_time: "2024-08-18T09:30:00Z",
      end_time: "2024-08-18T10:00:00Z",
      description: "Submit the college assignment on data structures.",
    },
  ],
  "2024-08-19": [
    {
      name: "React Webinar",
      tag: "Learning",
      start_time: "2024-08-19T10:00:00Z",
      end_time: "2024-08-19T11:00:00Z",
      description: "Attend the webinar on advanced React patterns.",
    },
    {
      name: "Team Meeting",
      tag: "Work",
      start_time: "2024-08-19T11:30:00Z",
      end_time: "2024-08-19T12:00:00Z",
      description: "Weekly team sync-up meeting.",
    },
  ],
  "2024-08-20": [
    {
      name: "Code Review",
      tag: "Work",
      start_time: "2024-08-20T12:00:00Z",
      end_time: "2024-08-20T13:00:00Z",
      description: "Review the code for the new feature implementation.",
    },
  ],
  "2024-08-21": [
    {
      name: "Research Paper Submission",
      tag: "Personal",
      start_time: "2024-08-21T13:00:00Z",
      end_time: "2024-08-21T14:00:00Z",
      description: "Submit the research paper on machine learning.",
    },
    {
      name: "JavaScript Workshop",
      tag: "Learning",
      start_time: "2024-08-21T14:30:00Z",
      end_time: "2024-08-21T15:30:00Z",
      description: "Attend the workshop on modern JavaScript techniques.",
    },
  ],
  "2024-08-22": [
    {
      name: "Client Meeting",
      tag: "Work",
      start_time: "2024-08-22T15:00:00Z",
      end_time: "2024-08-22T16:00:00Z",
      description: "Discuss project requirements with the client.",
    },
  ],
  "2024-08-23": [
    {
      name: "Feature Implementation",
      tag: "Work",
      start_time: "2024-08-23T16:00:00Z",
      end_time: "2024-08-23T17:00:00Z",
      description: "Implement the new feature for the project.",
    },
    {
      name: "Assignment Review",
      tag: "Personal",
      start_time: "2024-08-23T17:30:00Z",
      end_time: "2024-08-23T18:00:00Z",
      description: "Review the completed assignment before submission.",
    },
  ],
  "2024-08-24": [
    {
      name: "AI Webinar",
      tag: "Learning",
      start_time: "2024-08-24T18:00:00Z",
      end_time: "2024-08-24T19:00:00Z",
      description: "Attend the webinar on the future of AI.",
    },
  ],
};

const TaskOverview = () => {
  return (
    <section id="tasks-overview">
      <ul className="task--lists">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          const formattedDate = date.toISOString().split("T")[0];
          const task = tasks[formattedDate];

          return task ? (
            <TaskList key={index} date={date} tasks={task} />
          ) : (
            <li key={index}>No tasks for {formattedDate}</li>
          );
        })}
      </ul>
    </section>
  );
};

export default TaskOverview;
