async function init() {
  let lastWorkout = await API.lastWorkout();
  console.log(lastWorkout);

  document
    .querySelector("a[href='/exercise?']")
    .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

  let workoutSummary = {
    date: formatDates(lastWorkout.day),
    totalDuration: lastWorkout.totalDuration,
    numExercises: lastWorkout.exercises.length,
    ...workoutTallys(lastWorkout.exercises)
  };

  renderWorkoutSummary(workoutSummary);
}

function workoutTallys(exercises) {
  let tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDates(date) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  let container = document.querySelector(".workout-stats");

  let workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    let p = document.createElement("p");
    let strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    let textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

init();
