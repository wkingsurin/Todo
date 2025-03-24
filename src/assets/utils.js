export function counter(setState) {
  if (!isExistsCount()) {
    localStorage.setItem("count", 0);
    return getCount();
  }

  let newCount = getCount() + 1;

  setState((prev) => ({ ...prev, newTask: { ...prev.newTask, id: newCount } }));
  saveCount(newCount);

  return getCount();
}

function isExistsCount() {
  return !localStorage.getItem("count") ? false : true;
}

function getCount() {
  if (!isExistsCount()) {
    return 0;
  }
  return Number(localStorage.getItem("count"));
}

function saveCount(count) {
  if (count) {
    localStorage.setItem("count", count);
  }
  return false;
}
