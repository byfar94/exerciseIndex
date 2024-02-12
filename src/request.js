async function getExerciseData() {
  const response = await fetch('/exercise');
  if (!response.ok) {
    throw new Error('Failed to fetch exercise data');
  }
  const dbData = await response.json();
  console.log(dbData);
  return dbData;
}

export { getExerciseData };
