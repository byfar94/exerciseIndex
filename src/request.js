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

async function handleDelete(id) {
  try {
    const response = await fetch(`./exercise/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('network response not ok');
    }

    const data = response.json();
    console.log(data);
    console.log('data deleted');
    close();
  } catch (err) {
    console.error(err);
  }
}

export { handleDelete };
