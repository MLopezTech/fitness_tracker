let API = {
  async lastSession() {
    
    let res = await fetch("/api/workouts");
    let json = await res.json();

    return json[json.length - 1];
  },



  async addExercise(data) {
    let id = location.search.split("=")[1];

    let res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });


    let json = await res.json();

    return json;


  },
  async createWorkout() {
    let res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" }



    });

    let json = await res.json();

    return json;


  },

  async getWorkoutsInRange() {
    let res = await fetch(`/api/workouts/range`);
    let json = await res.json();
    
    return json;
    
  },
};
