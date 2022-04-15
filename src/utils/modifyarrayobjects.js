//This method is crated for filtering array of objects
export const filterArrayObjects = (userInput, data) => {
  const filteredData = data.filter(
    (val) =>
      val.name.toLowerCase().includes(userInput.toLowerCase()) ||
      //email is case sensitve
      val.email.includes(userInput) ||
      val.role.toLowerCase().includes(userInput.toLowerCase())
  );
  return filteredData;
};

//This method is crated for deleting array of objects
export const deleteArrayObjects = (userInput, data) => {
  console.log("inside delete", data);
  const deletedData = data.filter((val) => val.id !== userInput);
  return deletedData;
};
