if (images.length === 0) {
  throw new Error("Array is empty!!");
}

function getItems() {
  var items = document.getElementsByClassName("items")[0];
  var itemsCollection = items.getElementsByClassName("item");
  return itemsCollection;
}

function activateItem(item) {
  item.classList.add("active");
}

function deactivateItem(activeItem) {
  activeItem.classList.toggle("active", false);
}

/**
 * function to change the preview content based on current active class
 * @param {Object} item contains the desired object for preview purpose
 */

function changePreview(item) {
  var url = item.getElementsByTagName("img")[0].src;
  var title = item.getElementsByClassName("info")[0].textContent;

  var preview = document.getElementById("preview");
  preview.getElementsByTagName("img")[0].src = url;
  preview.getElementsByClassName("info")[0].innerHTML = title;
}

/**
 * function to change set from one item to other and also update the preview
 * @param {Element} currentActiveItem Element with class "item" and is currently set "active"
 * @param {Element} toBeActiveItem Element with class "item" and is to be set "active"
 */
function changeActiveState(currentActiveItem, toBeActiveItem) {
  deactivateItem(currentActiveItem);
  activateItem(toBeActiveItem);
  changePreview(toBeActiveItem);
}

/**
 * function to set the next item as active item
 */
function setNextItemActive() {
  var items = getItems();

  var activeItem = document.getElementsByClassName("active")[0];
  var nextElement = activeItem.nextElementSibling;

  if (!nextElement) {
    nextElement = items[0];
  }

  changeActiveState(activeItem, nextElement);
}

/**
 * function to set the previous item as active item
 */
function setPrevItemActive() {
  var items = getItems();

  var activeItem = document.getElementsByClassName("active")[0];
  var prevElement = activeItem.previousElementSibling;

  if (!prevElement) {
    prevElement = items[items.length - 1];
  }

  changeActiveState(activeItem, prevElement);
}

// listens for keys movement UP and DOWN for changing active class
document.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowUp":
      setPrevItemActive();
      break;
    case "ArrowDown":
      setNextItemActive();
      break;
  }
};

/**
 *
 * @param {Object} item object to be converted to item element
 * @returns an individual item-Element
 */
function createItemElement(item) {
  var itemElement = document.createElement("div");

  var image = document.createElement("img");
  image.src = item["previewImage"];
  itemElement.appendChild(image);

  var infoDiv = document.createElement("div");
  infoDiv.className = "info";
  var infoText = document.createTextNode(item["title"]);

  infoDiv.appendChild(infoText);
  itemElement.appendChild(infoDiv);

  return itemElement;
}

//function which creates preview div
function createPreview() {
  var createdNewElement = createItemElement(images[0]);
  createdNewElement.setAttribute("id", "preview");
  return createdNewElement;
}
//function which creates items div
function createItems() {
  var items = document.createElement("div"); // holds all the items
  items.className = "items";

  for (let indexInImages = 0; indexInImages < images.length; indexInImages++) {
    var item = createItemElement(images[indexInImages]); // item is element with className item
    item.className = "item";

    if (indexInImages === 0) {
      activateItem(item);
    }

    item.addEventListener("click", function () {
      var activeItem = document.getElementsByClassName("active")[0];
      changeActiveState(activeItem, this);
    });
    items.appendChild(item);
  }

  return items;
}

// function which initialises evrything
function buildPage() {
  //created preview part
  var previewElement = createPreview();
  //created items part
  var itemsElement = createItems();
  var mainContent = document.getElementsByClassName("mainContent")[0];
  mainContent.appendChild(itemsElement);
  mainContent.appendChild(previewElement);
}

buildPage();
