let exerciseType = document.querySelector("#type");
let cardiForm = document.querySelector(".cardio-form");
let resistance = document.querySelector(".resistance-form");
let cardioInput = document.querySelector("#cardio-name");
let nameInput = document.querySelector("#name");
let weightInput = document.querySelector("#weight");
let setsInput = document.querySelector("#sets");
let repsInput = document.querySelector("#reps");
let durationInput = document.querySelector("#duration");
let resistanceInput = document.querySelector("#resistance-duration");
let distanceInput = document.querySelector("#distance");
let completeButton = document.querySelector("button.complete");
let addButton = document.querySelector("button.add-another");
let toast = document.querySelector("#toast");
let newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

init();

async function init() {
  if (location.pathname.includes("/exercise") && location.search.split("=")[1] === undefined) {
    console.log("excersise")
    let newWorkout = await API.createWorkout();
    let workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    }
    else {
      newWorkout.classList.add("")
    }
    return console.log(newWorkout);
  }
  if (location.search.split("=")[1] === undefined) {
    let workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    }
    else {
      newWorkout.classList.add("")
    }
  }
}

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardiForm.classList.remove("d-none");
    resistance.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistance.classList.remove("d-none");
    cardiForm.classList.add("d-none");
  } else {
    cardiForm.classList.add("d-none");
    resistance.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }



  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}


async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceInput.value.trim());
  }

  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}

function toastAnimation() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceInput.value = "";
  weightInput.value = "";
}

if(exerciseType) {
  exerciseType.addEventListener("change", handleWorkoutTypeChange);
}
if(completeButton) {
  completeButton.addEventListener("click", function(event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if(addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", toastAnimation);

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
