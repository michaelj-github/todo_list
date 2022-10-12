const toDoForm = document.querySelector("#toDoForm");
const toDoList = document.querySelector("#toDoList");
const toDoArray = [];
let toDoArrayIndex = 0;

// update todo list in local storage
const updateListInStorage = () => {
  // clear current local storage
  localStorage.clear();
  // get and clear currently displayed todo list
  const toDoDisplay = document.querySelectorAll(".toDo-button");
  for (e of toDoDisplay) {
    e.parentElement.remove();
  }
  // filter out deleted todos
  const newToDoArray = toDoArray.filter((e) => e[2]);
  // clear todo array
  toDoArray.length = 0;
  toDoArrayIndex = 0;
  // rebuild todo array
  for (e in newToDoArray) {
    createNewToDo(newToDoArray[e][0], newToDoArray[e][1]);
  }
};

// create a new button to indicate a todo has been completed
const createNewDoneButton = () => {
  const newDoneButton = document.createElement("button");
  newDoneButton.innerHTML = "&#8212";
  newDoneButton.style.marginRight = "5" + "px";
  newDoneButton.className = "toDo-button";
  // add an event listener
  newDoneButton.addEventListener("click", (e) => {
    const selectedElementParent = e.target.parentElement;
    // toggle completion line-through
    e.target.parentElement.style.textDecoration =
      e.target.parentElement.style.textDecoration === "line-through"
        ? (e.target.parentElement.style.textDecoration = "none")
        : (e.target.parentElement.style.textDecoration = "line-through");
    // update the array element to show completed status
    toDoArray[selectedElementParent.getAttribute("data-index")][1] =
      e.target.parentElement.style.textDecoration;
    updateListInStorage();
  });
  return newDoneButton;
};

// create a new button to remove a todo from the list
const createNewRemoveButton = () => {
  const newRemoveButton = document.createElement("button");
  newRemoveButton.innerText = "X";
  newRemoveButton.className = "toDo-button";
  // add an event listener
  newRemoveButton.addEventListener("click", (e) => {
    const selectedElementParent = e.target.parentElement;
    // update the array element to indicate this todo has been removed
    toDoArray[selectedElementParent.getAttribute("data-index")][2] = false;
    updateListInStorage();
    e.target.parentElement.remove();
  });
  return newRemoveButton;
};

// create a new todo item from form input or local storage
const createNewToDo = (newToDo, done = "none") => {
  const newP = document.createElement("p");
  newP.innerText = newToDo;
  newP.style.margin = "2" + "px";
  newP.setAttribute("data-index", toDoArrayIndex);

  const newDoneButton = createNewDoneButton();
  const newRemoveButton = createNewRemoveButton();
  newP.style.textDecoration = done;
  // add the buttons and then add the todo to the display
  newP.prepend(newDoneButton);
  newP.prepend(newRemoveButton);
  toDoList.append(newP);
  // add the new todo to the todolist array and to local storage
  // [value, done, deleted]
  toDoArray.push([newToDo, done, true]);
  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
  toDoArrayIndex++;
};

// retrieve the todo list from local storage
const getListFromStorage = () => {
  // clear the todo array and rebuild from local storage
  toDoArray.length = 0;
  toDoArrayIndex = 0;
  const newToDoArray = JSON.parse(localStorage.getItem("toDoArray"));
  for (e in newToDoArray) {
    createNewToDo(newToDoArray[e][0], newToDoArray[e][1]);
  }
};

// start by getting the current todo list from local storage
getListFromStorage();

// submit button clicked, add new todo to the list
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToDo = document.querySelector("#toDo");
  if (newToDo.value !== "") {
    createNewToDo(newToDo.value);
    toDoForm.reset();
  }
});
