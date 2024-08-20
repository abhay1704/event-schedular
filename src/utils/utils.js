export function transformEventsToTasks(events) {
  const tasks = {};

  events.forEach((event) => {
    // Convert the start_time to ISO date string and extract the date part
    const date = new Date(event.start_time).toISOString().split("T")[0];

    // Ensure the date key exists in the tasks object
    if (!tasks[date]) {
      tasks[date] = [];
    }

    // Add the event to the corresponding date array in tasks
    tasks[date].push({
      name: event.name,
      tag: event.tag,
      start_time: new Date(event.start_time).toISOString(),
      end_time: new Date(event.end_time).toISOString(),
      description: event.description,
    });
  });

  return tasks;
}

export const getTime = (string_date) => {
  const time = new Date(string_date);
  const time_string = time.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return time_string;
};

export const firstletters = (string_) => {
  return string_
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};
