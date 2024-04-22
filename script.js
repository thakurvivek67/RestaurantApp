document.getElementById("submitBtn").addEventListener("click", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var price = document.getElementById("price").value;
  var dish = document.getElementById("dish").value;
  var table = document.getElementById("tableselect").value;

  var data = {
    price: price,
    dish: dish,
    table: table,
  };

  try {
    const response = await saveToCRUD(data);
    console.log(response.data);
    displayUserOnScreen(response.data);
  } catch (error) {
    console.log(error);
  }

  // Clearing the input fields
  document.getElementById("price").value = "";
  document.getElementById("dish").value = "";
  document.getElementById("tableselect").value = "";
}

async function saveToCRUD(data) {
  try {
    return await axios.post("https://crudcrud.com/api/514164f8bc4c45aaa9c30123cefedb6c/restaurants", data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserFromCRUD(id) {
  try {
    const response = await axios.delete(`https://crudcrud.com/api/514164f8bc4c45aaa9c30123cefedb6c/restaurants/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function updateUserInCRUD(id, newData) {
  try {
    const response = await axios.put(`https://crudcrud.com/api/514164f8bc4c45aaa9c30123cefedb6c/restaurants/${id}`, newData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

function displayUserOnScreen(data) {

  const table1 = document.getElementById('table1List');
  const table2 = document.getElementById('table2List');
  const table3 = document.getElementById('table3List');

  const userItem = document.createElement("li");
  const userdata = document.createTextNode(`${data.dish} - ${data.price} - ${data.table}`);
  userItem.appendChild(userdata);

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  if (data.table === 'table1') {
    table1.appendChild(userItem);
  } else if (data.table === 'table2') {
    table2.appendChild(userItem);
  } else if (data.table === 'table3') {
    table3.appendChild(userItem);
  }

  deleteBtn.addEventListener("click", async function () {
    try {
      await deleteUserFromCRUD(data._id);
    } catch (error) {
      console.log(error);
    }

    if (data.table === 'table1') {
      table1.removeChild(userItem);
    } else if (data.table === 'table2') {
      table2.removeChild(userItem);
    } else if (data.table === 'table3') {
      table3.removeChild(userItem);
    }
  });

  editBtn.addEventListener("click", function () {
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

    if (data.table === 'table1') {
      table1.replaceChild(editForm, userItem);
    } else if (data.table === 'table2') {
      table2.replaceChild(editForm, userItem);
    } else if (data.table === 'table3') {
      table3.replaceChild(editForm, userItem);
    }

    saveBtn.addEventListener("click", async function (event) {
      event.preventDefault();

      const updatedData = {
        price: priceInput.value,
        dish: dishInput.value,
        table: tableInput.value,
      };

      try {
        await updateUserInCRUD(data._id, updatedData);
        displayUserOnScreen(updatedData);
      } catch (error) {
        console.log(error);
      }

      if (data.table === 'table1') {
        table1.removeChild(editForm);
      } else if (data.table === 'table2') {
        table2.removeChild(editForm);
      } else if (data.table === 'table3') {
        table3.removeChild(editForm);
      }
    });
  });
}
