export function transformEventsToTasks(events) {
  const tasks = {};

  events.forEach((event) => {
    // Convert the start_time to ISO date string and extract the date part
    const date = new Date(event.start_time).toLocaleDateString("en-IN");

    // Ensure the date key exists in the tasks object
    if (!tasks[date]) {
      tasks[date] = [];
    }

    // Add the event to the corresponding date array in tasks
    tasks[date].push({
      ref: event.ref,
      title: event.title,
      tag: event.tag,
      start_time: new Date(event.start_time).toISOString(),
      end_time: new Date(event.end_time).toISOString(),
      description: event.description,
      recurrence: event.recurrence,
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

export const capitalize = (string_) => {
  return string_.charAt(0).toUpperCase() + string_.slice(1);
};

export const transformRawEvents = (rawEvents) => {
  return rawEvents.map((event) => ({
    title: event.title,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    description: event.description,
    uid: event.uid,
    tag: event.tag,
    ref: event.ref,
    // Add any other properties you need
  }));
};

const generateICS = (event) => {
  const start = new Date(event.start_time)
    .toISOString()
    .replace(/-|:|\.\d+/g, "");
  const end = new Date(event.end_time).toISOString().replace(/-|:|\.\d+/g, "");
  const description = event.description || "";
  const location = event.location || "";

  return `BEGIN:VCALENDAR
          VERSION:2.0
          PRODID:-//Your Organization//Your Product//EN
          BEGIN:VEVENT
          UID:${event.id}
          DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}
          DTSTART:${start}
          DTEND:${end}
          SUMMARY:${event.title}
          DESCRIPTION:${description}
          LOCATION:${location}
          END:VEVENT
          END:VCALENDAR`;
};

export const downloadICS = (event) => {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const shareEvent = (event) => {
  if (navigator.share) {
    navigator
      .share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
      .then(() => console.log("Event shared successfully"))
      .catch((error) => console.error("Error sharing event:", error));
  } else {
    console.error("Web Share API is not supported in this browser.");
  }
};

export const getStats = (tasks) => {
  const stats = {
    total: tasks.length,
  };

  


};
