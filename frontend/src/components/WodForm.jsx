import React, { useState } from "react";
import Menu from "./Menu";
import { WOD_TYPES, WOD_FORMATS, EXERCISES } from "./constants";

const WodForm = () => {
  const [typeWod, setTypeWod] = useState(WOD_TYPES[0]);
  const [formatWod, setFormatWod] = useState(WOD_FORMATS[0]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        skill: EXERCISES[0].skill,
        weight: "",
      },
    ]);
  };

  const handleAddSpliceExercise = (index) => {
    const newExercises = [...exercises];
    const newExercise = {
      skill: EXERCISES[0].skill,
      weight: "",
    };
    newExercises.splice(index + 1, 0, newExercise);
    setExercises(newExercises);
  };

  const handleDeleteExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const wod = {
    //   typeWod,
    //   exercises: exercises.map((ex) => ({
    //     skill: ex.skill,
    //     order: ex.order,
    //     weight: ex.weight,
    //   })),
    //   timeLimit,
    // };

    // axios
    //   .post("http://localhost:8080/api/wods", wod)
    //   .then((response) => {
    //     console.log("WOD créé avec succès", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Erreur lors de la création du WOD", error);
    //   });
  };

  return (
    <div className="flex flex-no-wrap">
      <Menu />
      {/* Contenu principal */}
      <div className="w-full h-full p-6 overflow-auto">
        <div className="text-2xl font-semibold text-gray-800 mb-6">
          Add a WOD
        </div>

        {/* Wod Form  */}
        <form
          className="bg-white p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <ul className="flex gap-8">
            <li>
              <label>Type: </label>
              <select
                value={typeWod}
                onChange={(e) => setTypeWod(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {WOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label>Format: </label>
              <select
                value={formatWod}
                onChange={(e) => setFormatWod(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {WOD_FORMATS.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label>Time Cap (min): </label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
              />
            </li>
            <li>
              <label>Rounds: </label>
              <input
                type="number"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
              />
            </li>
            <li>
              {" "}
              <button
                type="button"
                onClick={handleAddExercise}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                + Step
              </button>
            </li>
          </ul>
          {/* Steps */}
          {exercises.length > 0 && (
            <h2 className=" mt-6 text-2xl font-semibold text-gray-700 mb-4">
              Steps
            </h2>
          )}
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className="mb-4">
                <button
                  type="button"
                  onClick={() => handleDeleteExercise(index)}
                  className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddSpliceExercise(index)}
                  className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
                <label>Step {index + 1} - </label>
                <label>Reps: </label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", e.target.value)
                  }
                  className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-14"
                />
                <label>Skill: </label>
                <select
                  value={exercise.skill}
                  onChange={(e) =>
                    handleExerciseChange(index, "skill", e.target.value)
                  }
                  className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-60"
                >
                  <optgroup label="Weightlifting">
                    {EXERCISES.filter((ex) => ex.type == "Weight").map((ex) => (
                      <option key={ex.skill} value={ex.skill}>
                        {ex.skill}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Gymnastic">
                    {EXERCISES.filter((ex) => ex.type == "Gym").map((ex) => (
                      <option key={ex.skill} value={ex.skill}>
                        {ex.skill}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cardio">
                    {EXERCISES.filter((ex) => ex.type == "Cardio").map((ex) => (
                      <option key={ex.skill} value={ex.skill}>
                        {ex.skill}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {/* Charges si exercice d'haltérophilie */}
                {EXERCISES.find((ex) => ex.skill === exercise.skill)
                  ?.requiresWeight && (
                  <>
                    <label>Weight (kg):</label>
                    <input
                      type="text"
                      value={exercise.weight}
                      onChange={(e) =>
                        handleExerciseChange(index, "weight", e.target.value)
                      }
                      className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-12"
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Boutons */}
          <button
            type="submit"
            className="bg-blue-500 mt-6 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create WOD
          </button>
        </form>
      </div>
    </div>
  );
};

export default WodForm;
