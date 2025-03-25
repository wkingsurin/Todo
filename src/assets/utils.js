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
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  return `${day}.${month}.${date.getFullYear()}`;
}

export const months = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
};
