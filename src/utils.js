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
