const toDoListButton = document.querySelector("#toDoListButton");
const toDoList = document.querySelector("#toDoList");
const toDoListInput = document.querySelector("#toDoListInput");

const createToDoItem = (toDo, done = "none") => {
  const toDoItem = document.createElement("p");
  const toDoItemDoneButton = document.createElement("button");
  toDoItemDoneButton.innerHTML = "&#8212";
  toDoItemDoneButton.style.margin = "0 8px 0 0";
  toDoItemDoneButton.addEventListener("click", (e) => {
    e.target.parentElement.style.textDecoration =
      e.target.parentElement.style.textDecoration === "line-through"
        ? (e.target.parentElement.style.textDecoration = "none")
        : (e.target.parentElement.style.textDecoration = "line-through");
    setLocalStorage();
  });
  const toDoItemRemoveButton = document.createElement("button");
  toDoItemRemoveButton.innerText = "X";
  toDoItemRemoveButton.addEventListener("click", () => {
    toDoItemRemoveButton.parentElement.remove();
    setLocalStorage();
  });
  toDoItem.innerText = toDo;
  toDoItem.style.textDecoration = done;
  toDoItem.prepend(toDoItemDoneButton);
  toDoItem.prepend(toDoItemRemoveButton);
  toDoList.append(toDoItem);
};

const getLocalStorage = () => {
  if (localStorage.length > 0) {
    for (e of JSON.parse(localStorage.toDoArray)) {
      createToDoItem(e[0], e[1]);
    }
  }
};

const setLocalStorage = () => {
  localStorage.clear();
  const theToDoItemsArray = [];
  const theToDoItems = document.querySelectorAll("p");
  for (i = 0; i < theToDoItems.length; i++) {
    theToDoItemsArray.push([
      theToDoItems[i].innerText.slice(2),
      theToDoItems[i].style.textDecoration,
    ]);
  }
  localStorage.toDoArray = JSON.stringify(theToDoItemsArray);
};

const handleSubmit = () => {
  createToDoItem(toDoListInput.value.trim());
  setLocalStorage();
};

toDoListButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (toDoListInput.value.trim().length > 0) {
    handleSubmit();
  }
  toDoListInput.value = "";
});

getLocalStorage();
