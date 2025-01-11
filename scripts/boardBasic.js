const STATUSES = ["todo", "inprogress", "awaitfeedback", "done"];
let currentDraggedElement;


function toggleOverlay(section) {
  let refOverlay = document.getElementById(section);

  refOverlay.classList.toggle("d-none");

  if (!refOverlay.classList.contains("d-none")) {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      refOverlay.classList.add("active", "visible");
    }, 50);
  } else {
    document.body.style.overflow = "auto";
    refOverlay.classList.remove("active", "visible");
  }
}


async function moveToStatus(taskId, status, moveToDirection) {
  let currentIndex = STATUSES.indexOf(status);
  let newIndex = currentIndex + moveToDirection;
  let newStatus = STATUSES[newIndex];

  currentDraggedElement = taskId;

  await moveTo(newStatus);
}


function startDragging(id) {
  currentDraggedElement = id;
}


function allowDrop(ev) {
  ev.preventDefault();
}


function hightlight(status) {
  document
    .getElementById(`kanban_${status}`)
    .classList.add("kanban-tasks-highlight");
}


function removeHightlight(status) {
  document
    .getElementById(`kanban_${status}`)
    .classList.remove("kanban-tasks-highlight");
}


async function moveTo(status) {
  let tasks = await fetchData("tasks");
  let movedTask = tasks.find((task) => task.id === currentDraggedElement);
  movedTask.status = status;
  await postUpdatedTask(movedTask);
  removeHightlight(status);
  updateTasksOnBoard();
}


async function postUpdatedTask(task) {
  try {
    let updatedTask = await postData(`tasks/${task.id - 1}`, task);
    return updatedTask;
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Tasks:", error);
  }
}


function clearSearchField(field) {
  let searchFiel = document.getElementById(field);
  searchFiel.value = "";
}
