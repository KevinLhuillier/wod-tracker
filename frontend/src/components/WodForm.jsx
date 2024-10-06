import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import { WOD_TYPES, WOD_FORMATS, EXERCISES } from "./constants";
import { addWod, updateWod } from "../redux/wodSlice";

const WodForm = () => {
  const [typeWod, setTypeWod] = useState(WOD_TYPES[0].value);
  const [formatWod, setFormatWod] = useState(WOD_FORMATS[0].value);
  const [workoutDate, setWorkoutDate] = useState("");
  const [timeLimit, setTimeLimit] = useState(1);
  const [rounds, setRounds] = useState(1);
  const [exercises, setExercises] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const wods = useSelector((state) => state.wods.wods);

  useEffect(() => {
    if (id) {
      const wod = wods.find((w) => w.wodId == id);
      if (wod) {
        setTypeWod(wod.typeWod);
        setFormatWod(wod.formatWod);
        setTimeLimit(wod.timeLimit);
        setRounds(wod.rounds);
        setWorkoutDate(wod.date);
        const sorted = [...wod.exercises].sort((a, b) => a.order - b.order);
        setExercises(sorted);
      }
    }
  }, [id, wods]);

  const handleAddExercise = () => {
    setExercises(
      updateOrder([
        ...exercises,
        {
          reps: 1,
          skill: EXERCISES[0].skill,
          weight: 0,
        },
      ])
    );
  };

  const handleAddSpliceExercise = (index) => {
    const newExercises = [...exercises];
    const newExercise = {
      reps: 1,
      skill: EXERCISES[0].skill,
      weight: 0,
    };
    newExercises.splice(index + 1, 0, newExercise);
    setExercises(updateOrder(newExercises));
  };

  const handleDeleteExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(updateOrder(newExercises));
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };

  const updateOrder = (exercisesList) => {
    return exercisesList.map((exercise, index) => ({
      ...exercise,
      order: index + 1, // Met à jour l'ordre en fonction de l'index
    }));
  };

  const handleDateChange = (event) => {
    setWorkoutDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderedExercises = updateOrder(exercises);
    setExercises(orderedExercises);

    const wod = {
      typeWod,
      formatWod,
      timeLimit,
      rounds,
      workoutDate,
      exercises: exercises.map((ex) => ({
        order: ex.order,
        reps: ex.reps,
        skill: ex.skill,
        weight: ex.weight,
      })),
    };

    console.log("WOD :", wod);

    if (id) {
      dispatch(updateWod({ id, wod })).then(() => navigateTo("/"));
    } else {
      dispatch(addWod(wod)).then(() => navigateTo("/"));
    }
  };

  return (
    <div className="flex flex-no-wrap">
      <Menu />
      {/* Contenu principal */}
      <div className="w-full h-full p-6 overflow-auto">
        <div className="text-2xl font-semibold text-gray-800 mb-6">
          {id ? "Update" : "Add"} a WOD
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
                  <option key={type.value} value={type.value}>
                    {type.label}
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
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label>Time Cap (min): </label>
              <input
                type="number"
                min="1"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
              />
            </li>
            <li>
              <label>Rounds: </label>
              <input
                type="number"
                min="1"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
              />
            </li>
            <li>
              <label>Workout Date: </label>
              <input
                type="date"
                value={workoutDate}
                onChange={handleDateChange}
                required
                className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-36"
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
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddSpliceExercise(index)}
                  className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <label>Step {exercise.order} - </label>
                <label>Reps: </label>
                <input
                  type="number"
                  min="1"
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
                    {EXERCISES.filter((ex) => ex.type == "Weightlifting")
                      .sort((a, b) => a.skill.localeCompare(b.skill))
                      .map((ex) => (
                        <option key={ex.skill} value={ex.skill}>
                          {ex.skill}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Bodyweight">
                    {EXERCISES.filter((ex) => ex.type == "Bodyweight")
                      .sort((a, b) => a.skill.localeCompare(b.skill))
                      .map((ex) => (
                        <option key={ex.skill} value={ex.skill}>
                          {ex.skill}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Cardio">
                    {EXERCISES.filter((ex) => ex.type == "Cardio")
                      .sort((a, b) => a.skill.localeCompare(b.skill))
                      .map((ex) => (
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
                      type="number"
                      min="0"
                      value={exercise.weight}
                      onChange={(e) =>
                        handleExerciseChange(index, "weight", e.target.value)
                      }
                      className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
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
            {id ? "Update" : "Create"} WOD
          </button>
        </form>
      </div>
    </div>
  );
};

export default WodForm;
