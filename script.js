document.getElementById("submitBtn").addEventListener("click", handleFormSubmit);

function handleFormSubmit() {
  var price = document.getElementById("price").value;
  var dish = document.getElementById("dish").value;
  var table = document.getElementById("table").value;

  // Create data object to send to the API
  var data = {
    price: price,
    dish: dish,
    table: table
  };

  axios
    .post(
      "https://crudcrud.com/api/7ed19572029446348f188e1b08f99029/restaurants", data)
    .then((response) => {
      console.log(response.data);
      displayUserOnScreen(response.data);
    })
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("price").value = "";
  document.getElementById("dish").value = "";
  document.getElementById("table").value = "";
}

function displayUserOnScreen(data) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${data.price} - ${data.dish} - ${data.table}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.getElementById("userList");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(userItem);
    // No need to remove from local storage as it's not used in this code
  });

  editBtn.addEventListener("click", function (event) {
    // Replace userItem text with an edit form
    const editForm = document.createElement("form");

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.value = data.price;
    editForm.appendChild(priceInput);

    const dishInput = document.createElement("input");
    dishInput.type = "text";
    dishInput.value = data.dish;
    editForm.appendChild(dishInput);

    const tableInput = document.createElement("input");
    tableInput.type = "text";
    tableInput.value = data.table;
    editForm.appendChild(tableInput);

    const saveBtn = document.createElement("button");
    saveBtn.appendChild(document.createTextNode("Save"));
    editForm.appendChild(saveBtn);

    // Replace userItem with editForm
    userList.replaceChild(editForm, userItem);

    // Add event listener to handle form submission
    editForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get updated values from the edit form
      const updatedData = {
        price: priceInput.value,
        dish: dishInput.value,
        table: tableInput.value
      };

      // Update the item on the server using a PUT request
      axios.put(
          `https://crudcrud.com/api/7ed19572029446348f188e1b08f99029/restaurants/${data._id}`, updatedData)
        .then(() => {
          // Update the item on the screen
          userItem.textContent = `${updatedData.price} - ${updatedData.dish} - ${updatedData.table}`;

          // Remove the edit form and show the user item again
          userList.replaceChild(userItem, editForm);
          userItem.appendChild(deleteBtn);
          userItem.appendChild(editBtn);
        })
        .catch((error) => console.log(error));
    });
  });
}

