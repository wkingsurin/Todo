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

export function correctDate(date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  return `${day}.${month}.${date.getFullYear()}`;
}
