let images = [{
    "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "title": "cat.jpeg"
}, {
    "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "title": "cooking couple shoot portofilio(1).jpg"
}, {
    "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "title": "bali-kelingking-beach-plastic-removal-drive.key"
}, {
    "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "title": "NextByk Investor Pitch 2021.ppt"
}, {
    "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "title": "interns-performance-report-june-2021.key"
}];

if(images.length===0){
    alert("Array is empty!!")
}

// function to change the preview content based on current active class
function changePreview(item) {
    var url = item.getElementsByTagName("img")[0].src;
    var title = item.getElementsByClassName("info")[0].textContent
    var preview = document.getElementById("preview");
    preview.getElementsByTagName("img")[0].src = url;
    document.getElementById("preview-footer").innerHTML = title;
}

// function to go to next active class 
function nextActiveClass() {
    var items = document.getElementsByClassName("item");
    var activeClass = document.getElementsByClassName("active")[0];
    var nextElement = activeClass.nextElementSibling
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
    var prevElement = activeClass.previousElementSibling
    if (!prevElement) {
        prevElement = items[items.length - 1];
    }
    activeClass.className = activeClass.className.replace(" active", "");
    prevElement.className += " active";
    changePreview(prevElement);
}

// listens for keys movement UP and DOWN for changing active class
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowUp":
            prevActiveClass();
            break;
        case "ArrowDown":
            nextActiveClass();
            break;
    }
};

/// DOM building starts here 

//created preview part
var preview = document.createElement("div"); 
preview.setAttribute("id", "preview");

var imageForPreview = document.createElement("img"); //holds the preview image 
imageForPreview.src=images[0]["previewImage"]
preview.appendChild(imageForPreview)

var preview_footer = document.createElement("p"); //holds the image title 
preview_footer.setAttribute("id","preview-footer")
preview_footer.appendChild(document.createTextNode(images[0]["title"]))
preview.appendChild(preview_footer)

//created items part
// function to return an Item-Element
function createItemClass(item) {
    var itemElement = document.createElement("div");

    var image = document.createElement("img");
    image.src = item["previewImage"];
    itemElement.appendChild(image);

    var infoDiv = document.createElement("div");
    infoDiv.className="info";
    var infoText = document.createTextNode(item["title"])
    infoDiv.appendChild(infoText);
    itemElement.appendChild(infoDiv);

    return itemElement;
}

var items = document.createElement("div"); // holds all the items
items.className = "items";

for (let indexInImages = 0; indexInImages < images.length; indexInImages++) {
    
    var item = createItemClass(images[indexInImages]); // item is element with className item
    //console.log(images[indexInImages]);
    item.className = "item";
    if(indexInImages===0){
        item.className+=" active";   
    }
    //console.log(item)
    item.addEventListener('click',function() {
        var activeClass = document.getElementsByClassName("active");
        activeClass[0].className = activeClass[0].className.replace(" active", "");
        this.className += " active"
        changePreview(this);
    })
    items.appendChild(item);
}


// appended 2 divs to mainContent
var mainContent = document.getElementsByClassName("mainContent")[0];
mainContent.appendChild(items);
mainContent.appendChild(preview);
//console.log(mainContent);