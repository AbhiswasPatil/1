if (images.length === 0) {
  throw new Error("Array is empty!!");
}

// function to change the preview content based on current active class
function changePreview(item) {
  var url = item.getElementsByTagName("img")[0].src;
  var title = item.getElementsByClassName("info")[0].textContent;
  var preview = document.getElementById("preview");
  preview.getElementsByTagName("img")[0].src = url;
  document.getElementById("preview-footer").innerHTML = title;
}

// function to go to next active class
function nextActiveClass() {
  var items = document.getElementsByClassName("item");
  var activeClass = document.getElementsByClassName("active")[0];
  var nextElement = activeClass.nextElementSibling;
  if (!nextElement) {
    nextElement = items[0];
  }
  activeClass.className = activeClass.className.replace(" active", "");
  nextElement.className += " active";
  changePreview(nextElement);
}

// function to go to previous active class
function prevActiveClass() {
  var items = document.getElementsByClassName("item");
  var activeClass = document.getElementsByClassName("active")[0];
  var prevElement = activeClass.previousElementSibling;
  if (!prevElement) {
    prevElement = items[items.length - 1];
  }
  activeClass.className = activeClass.className.replace(" active", "");
  prevElement.className += " active";
  changePreview(prevElement);
}

// listens for keys movement UP and DOWN for changing active class
document.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowUp":
      prevActiveClass();
      break;
    case "ArrowDown":
      nextActiveClass();
      break;
  }
};

// function to return an Item-Element
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

function createPreview() {
  var preview = document.createElement("div");
  preview.setAttribute("id", "preview");

  var imageForPreview = document.createElement("img"); //holds the preview image
  imageForPreview.src = images[0]["previewImage"];
  preview.appendChild(imageForPreview);

  var preview_footer = document.createElement("p"); //holds the image title
  preview_footer.setAttribute("id", "preview-footer");
  preview_footer.appendChild(document.createTextNode(images[0]["title"]));
  preview.appendChild(preview_footer);
  return preview;
}

function createItems() {
  var items = document.createElement("div"); // holds all the items
  items.className = "items";

  for (let indexInImages = 0; indexInImages < images.length; indexInImages++) {
    var item = createItemElement(images[indexInImages]); // item is element with className item
    //console.log(images[indexInImages]);
    item.className = "item";
    if (indexInImages === 0) {
      item.className += " active";
    }
    //console.log(item)
    item.addEventListener("click", function () {
      var activeClass = document.getElementsByClassName("active");
      activeClass[0].className = activeClass[0].className.replace(
        " active",
        ""
      );
      this.className += " active";
      changePreview(this);
    });
    items.appendChild(item);
  }
  return items;
}

function fillEverythingInMainContent(items, preview) {
  // appended 2 divs to mainContent
  var mainContent = document.getElementsByClassName("mainContent")[0];
  mainContent.appendChild(items);
  mainContent.appendChild(preview);
}

/// DOM building starts here
function buildPage() {
  //created preview part
  var previewElement = createPreview();
  //created items part
  var itemsElement = createItems();

  fillEverythingInMainContent(itemsElement, previewElement);
}

buildPage();
