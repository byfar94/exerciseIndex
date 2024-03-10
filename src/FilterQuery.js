function filterValueOfKeyByQuery(objArray, query, key) {
  if (objArray) {
    let lowerCaseQuery = query.toLowerCase();
    return objArray.filter((element) => {
      const lowerCaseValueAsString = String(element[key]).toLowerCase();
      return lowerCaseValueAsString.includes(lowerCaseQuery);
    });
  } else {
    console.log(
      'Object not found, no ObjArray in filterValuefKeyByQuery function',
    );
  }
}

export { filterValueOfKeyByQuery };
