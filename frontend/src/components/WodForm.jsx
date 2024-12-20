import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import {
  WOD_TYPES,
  WOD_FORMATS,
  EXERCISES,
  EXERCISE_STYLES,
  TOOLS,
} from "./constants";
import { addWod, updateWod } from "../redux/wodSlice";

const WodForm = () => {
  const [typeWod, setTypeWod] = useState(WOD_TYPES[0].value);
  const [workoutDate, setWorkoutDate] = useState("");
  const [timeLimit, setTimeLimit] = useState(1);
  const [rounds, setRounds] = useState(1);
  const [blocks, setBlocks] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const wods = useSelector((state) => state.wods.wods);
  const [showStylesDropdown, setShowStylesDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [showToolsDropdown, setShowToolsDropdown] = useState(null);
  const toolsDropdownRef = useRef(null);

  useEffect(() => {
    if (id) {
      const wod = wods.find((w) => w.wodId == id);
      if (wod) {
        setTypeWod(wod.typeWod);
        setTimeLimit(wod.timeLimit);
        setRounds(wod.rounds);
        setWorkoutDate(wod.date);
        const sortedBlocksWithExercises = wod.blocks.map((block) => {
          // Trier les exercices de chaque block par 'order'
          const sortedExercises = [...block.exercises].sort(
            (a, b) => a.order - b.order
          );
          // Initialiser styles si non défini
          // const exercisesWithStyles = sortedExercises.map((exercise) => ({
          //   ...exercise,
          //   styles: exercise.styles || [],
          // }));

          // Retourner un nouveau bloc avec les exercices triés
          return {
            ...block,
            exercises: sortedExercises,
          };
        });
        const sortedBlocks = [...sortedBlocksWithExercises].sort(
          (a, b) => a.order - b.order
        );
        setBlocks(sortedBlocks);
      }
    }
  }, [id, wods]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStylesDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleStyleDropdown = (blockIndex, exerciseIndex) => {
    setShowStylesDropdown(
      showStylesDropdown === `${blockIndex}-${exerciseIndex}`
        ? null
        : `${blockIndex}-${exerciseIndex}`
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target)
      ) {
        setShowToolsDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleToolsDropdown = (blockIndex, exerciseIndex) => {
    setShowToolsDropdown(
      showToolsDropdown === `${blockIndex}-${exerciseIndex}`
        ? null
        : `${blockIndex}-${exerciseIndex}`
    );
  };

  const handleAddBlock = () => {
    setBlocks(
      updateOrder([
        ...blocks,
        {
          format: WOD_FORMATS[0].label,
          timeLimit: 1,
          rounds: 1,
          exercises: [],
        },
      ])
    );
  };

  const handleBlockChange = (blockIndex, field, value) => {
    const updatedBlocks = blocks.map((block, index) =>
      index === blockIndex
        ? {
            ...block,
            [field]: value,
          }
        : block
    );

    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (blockIndex) => {
    const updatedBlocks = blocks.filter((_, i) => i !== blockIndex);
    setBlocks(updateOrder(updatedBlocks));
  };

  const handleAddExercise = (blockIndex) => {
    const updatedBlocks = blocks.map((block, index) =>
      index == blockIndex
        ? {
            ...block,
            exercises: updateOrder([
              ...block.exercises,
              {
                amount: 1,
                unit: "Reps",
                skill: EXERCISES[0].skill,
                styles: [],
                tools: [],
                weight: 0,
              },
            ]),
          }
        : block
    );
    setBlocks(updateOrder(updatedBlocks));
  };

  const handleAddSpliceExercise = (index) => {
    const newExercises = [...exercises];
    const newExercise = {
      amount: 1,
      unit: "Reps",
      skill: EXERCISES[0].skill,
      weight: 0,
    };
    newExercises.splice(index + 1, 0, newExercise);
    setExercises(updateOrder(newExercises));
  };

  const handleDeleteExercise = (blockIndex, exerciseIndex) => {
    const updatedBlocks = blocks.map((block, index) =>
      index === blockIndex
        ? {
            ...block,
            exercises: updateOrder(
              block.exercises.filter((_, i) => i !== exerciseIndex)
            ),
          }
        : block
    );
    setBlocks(updatedBlocks);
  };

  const handleExerciseChange = (blockIndex, exerciseIndex, field, value) => {
    const updatedBlocks = blocks.map((block, index) =>
      index === blockIndex
        ? {
            ...block,
            exercises: block.exercises.map((exercise, i) =>
              i === exerciseIndex
                ? {
                    ...exercise,
                    [field]: value,
                    ...(field === "skill" && { styles: [] }), // Réinitialiser les styles si le champ modifié est 'skill'
                    ...(field === "skill" && { tools: [] }), // Réinitialiser les styles si le champ modifié est 'skill'
                  }
                : exercise
            ),
          }
        : block
    );
    setBlocks(updatedBlocks);
  };

  const updateOrder = (itemsList) => {
    return itemsList.map((item, index) => ({
      ...item,
      order: index + 1, // Met à jour l'ordre en fonction de l'index
    }));
  };

  const handleDateChange = (event) => {
    setWorkoutDate(event.target.value);
  };

  const handleStyleChange = (blockIndex, exerciseIndex, style) => {
    const updatedBlocks = blocks.map((block, index) =>
      index === blockIndex
        ? {
            ...block,
            exercises: block.exercises.map((exercise, i) =>
              i === exerciseIndex
                ? {
                    ...exercise,
                    styles: exercise.styles
                      ? exercise.styles.includes(style)
                        ? exercise.styles.filter((s) => s !== style) // Supprime si déjà sélectionné
                        : [...exercise.styles, style] // Ajoute sinon
                      : [style],
                  }
                : exercise
            ),
          }
        : block
    );
    setBlocks(updatedBlocks);
  };

  const handleToolChange = (blockIndex, exerciseIndex, tool) => {
    const updatedBlocks = blocks.map((block, index) =>
      index === blockIndex
        ? {
            ...block,
            exercises: block.exercises.map((exercise, i) =>
              i === exerciseIndex
                ? {
                    ...exercise,
                    tools: exercise.tools
                      ? exercise.tools.includes(tool)
                        ? exercise.tools.filter((s) => s !== tool) // Supprime si déjà sélectionné
                        : [...exercise.tools, tool] // Ajoute sinon
                      : [tool],
                  }
                : exercise
            ),
          }
        : block
    );
    setBlocks(updatedBlocks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const wod = {
      typeWod,
      timeLimit,
      rounds,
      workoutDate,
      blocks: blocks.map((block) => ({
        order: block.order,
        format: block.format,
        timeLimit: block.timeLimit,
        rounds: block.rounds,
        exercises: block.exercises.map((ex) => ({
          order: ex.order,
          amount: ex.amount,
          unit: ex.unit,
          skill: ex.skill,
          styles: ex.styles,
          tools: ex.tools,
          weight: ex.weight,
        })),
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
                onClick={handleAddBlock}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                + Block
              </button>
            </li>
          </ul>

          {blocks.map((block, blockIndex) => (
            <div key={block.order} className="mt-6 p-4 border-2 border-dashed">
              <div className="mb-4 flex gap-4 items-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  Block {blockIndex + 1}
                </h2>

                <div>
                  <label>Format: </label>
                  <select
                    value={block.format}
                    onChange={(e) =>
                      handleBlockChange(blockIndex, "format", e.target.value)
                    }
                    className="ml-2 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {WOD_FORMATS.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Time Cap (min): </label>
                  <input
                    type="number"
                    min="1"
                    value={block.timeLimit}
                    onChange={(e) =>
                      handleBlockChange(blockIndex, "timeLimit", e.target.value)
                    }
                    className="ml-2 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
                  />
                </div>
                <div>
                  <label>Rounds: </label>
                  <input
                    type="number"
                    min="1"
                    value={block.rounds}
                    onChange={(e) =>
                      handleBlockChange(blockIndex, "rounds", e.target.value)
                    }
                    className="ml-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-16"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAddExercise(blockIndex)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded"
                >
                  + Step
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBlock(blockIndex)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded"
                >
                  Delete
                </button>
              </div>
              <div className="pl-4 border-l-4">
                <ul>
                  {block.exercises.map((exercise, exerciseIndex) => (
                    <li key={exerciseIndex} className="flex items-center mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteExercise(blockIndex, exerciseIndex)
                        }
                        className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <label>Step {exercise.order}: </label>
                      <input
                        type="number"
                        min="1"
                        value={exercise.amount}
                        onChange={(e) =>
                          handleExerciseChange(
                            blockIndex,
                            exerciseIndex,
                            "amount",
                            e.target.value
                          )
                        }
                        className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-14"
                      />
                      <select
                        value={exercise.unit}
                        onChange={(e) =>
                          handleExerciseChange(
                            blockIndex,
                            exerciseIndex,
                            "unit",
                            e.target.value
                          )
                        }
                        className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="Reps">Reps</option>
                        <option value="Meters">Meters</option>
                        <option value="Cal">Cal</option>
                      </select>
                      <label>of: </label>
                      <select
                        value={exercise.skill}
                        onChange={(e) =>
                          handleExerciseChange(
                            blockIndex,
                            exerciseIndex,
                            "skill",
                            e.target.value
                          )
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
                      {/* Liste à choix multiple pour les styles */}
                      {EXERCISE_STYLES[
                        EXERCISES.find((ex) => ex.skill === exercise.skill)
                          ?.type
                      ]?.length > 0 && (
                        <>
                          <div className="relative inline-block">
                            <button
                              type="button"
                              onClick={() =>
                                toggleStyleDropdown(blockIndex, exerciseIndex)
                              }
                              className="ml-2 mr-4 py-2 px-4 bg-gray-100 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-60"
                            >
                              {exercise.styles != null &&
                              exercise.styles.length > 0
                                ? exercise.styles.join(", ")
                                : "Select styles"}
                            </button>

                            {showStylesDropdown ===
                              `${blockIndex}-${exerciseIndex}` && (
                              <div
                                ref={dropdownRef}
                                className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg p-4 w-56"
                              >
                                {EXERCISE_STYLES[
                                  EXERCISES.find(
                                    (ex) => ex.skill === exercise.skill
                                  )?.type
                                ].map((style) => (
                                  <label
                                    key={style}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        exercise.styles
                                          ? exercise.styles.includes(style)
                                          : false
                                      }
                                      onChange={() =>
                                        handleStyleChange(
                                          blockIndex,
                                          exerciseIndex,
                                          style
                                        )
                                      }
                                      className="bg-gray-100 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {style}
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {/* Liste à choix multiple pour les styles */}
                      {TOOLS[
                        EXERCISES.find((ex) => ex.skill === exercise.skill)
                          ?.type
                      ]?.length > 0 && (
                        <>
                          <div className="relative inline-block">
                            <button
                              type="button"
                              onClick={() =>
                                toggleToolsDropdown(blockIndex, exerciseIndex)
                              }
                              className="ml-2 mr-4 py-2 px-4 bg-gray-100 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-60"
                            >
                              {exercise.tools != null &&
                              exercise.tools.length > 0
                                ? exercise.tools.join(", ")
                                : "Select Tool"}
                            </button>

                            {showToolsDropdown ===
                              `${blockIndex}-${exerciseIndex}` && (
                              <div
                                ref={toolsDropdownRef}
                                className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg p-4 w-56"
                              >
                                {TOOLS[
                                  EXERCISES.find(
                                    (ex) => ex.skill === exercise.skill
                                  )?.type
                                ].map((tool) => (
                                  <label
                                    key={tool}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        exercise.tools
                                          ? exercise.tools.includes(tool)
                                          : false
                                      }
                                      onChange={() =>
                                        handleToolChange(
                                          blockIndex,
                                          exerciseIndex,
                                          tool
                                        )
                                      }
                                      className="bg-gray-100 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {tool}
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {EXERCISES.find((ex) => ex.skill === exercise.skill)
                        ?.requiresWeight && (
                        <>
                          <label>Weight (kg):</label>
                          <input
                            type="number"
                            min="0"
                            max="999"
                            step=".05"
                            value={exercise.weight}
                            onChange={(e) =>
                              handleExerciseChange(
                                blockIndex,
                                exerciseIndex,
                                "weight",
                                e.target.value
                              )
                            }
                            className="ml-2 mr-4 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black w-22"
                          />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

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
