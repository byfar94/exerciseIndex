//get request
async function getExerciseData(category) {
  const response = await fetch(`/exercise/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise data');
  }
  const dbData = await response.json();
  console.log(dbData);
  return dbData;
}

export { getExerciseData };

// delete request
async function handleDelete(id) {
  try {
    const response = await fetch(`/exercise/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('network response not ok');
    }

    const data = response.json();
    console.log(data);
    console.log('data deleted');
  } catch (err) {
    console.error(err);
  }
}

export { handleDelete };

//patch request

async function handlePatchText(e, id, toggleFormStatusFunc) {
  e.preventDefault();
  const fd = new FormData(e.target);
  console.log(fd);
  try {
    const response = await fetch(`/exercise/${id}`, {
      method: 'PATCH',
      body: fd,
    });

    if (!response.ok) {
      console.error('network response not ok');
    }

    const data = await response.json();
    console.log(data);
    console.log('data patched');
    toggleFormStatusFunc();
  } catch (err) {
    console.error(err);
  }
}

export { handlePatchText };

//handlePatch Img file

async function handlePatchImgFile(e, id, extitle, toggleFormStatusFunc) {
  e.preventDefault();
  const fd = new FormData(e.target);
  fd.append('extitle', extitle);
  console.log(fd);
  try {
    const response = await fetch(`/exercise/image/${id}`, {
      method: 'PATCH',
      body: fd,
    });

    if (!response.ok) {
      console.error('network response not ok');
    }

    const data = await response.json();
    console.log(data);
    console.log('data patched');
    toggleFormStatusFunc();
  } catch (err) {
    console.error(err);
  }
}

export { handlePatchImgFile };
