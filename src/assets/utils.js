function makeCounter() {
  if (!isExistsCount()) {
    localStorage.setItem("count", 0);
    return getCount;
  }

  let newCount = getCount() + 1;

  saveCount(newCount);

  return getCount;
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
  console.log(`Сохраняем count в localStorage`);
  //   console.log(`saveCount [count]`, count);

  if (count) {
    localStorage.setItem("count", count);
  }
  return false;
}

export let counter = makeCounter();
