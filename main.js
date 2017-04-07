(function() {
  var dropArea = document.getElementById("dragAndDrop-area");
  dropArea.addEventListener("change", addImage, false); //add an event to dropArea and use specified function addImage, event handler is executed in the bubbling phase - by default

  function addImage() { 
    var gallery = document.getElementById("gallery"); //gallery variable
    var files = document.querySelector("input").files; //variable, which shows how many files is loading

    function loadImage(image) {
      var reader = new FileReader(); //create new FileReader(), which lets read the content of files
      reader.addEventListener("load", function() { //add an event to load file
        var loadedImage = new Image(); //create new image object
        loadedImage.height = 150; //add attributes to the image: size, title, source
        loadedImage.width = 150;
        loadedImage.title = image.name;
        loadedImage.src = this.result;
        var link = document.createElement("a"); //create <a> tag for hyperlink
        link.target = "_blank"; //image will open in new window
        link.href = this.result; //URL of the page
        link.appendChild(loadedImage); //append image as the last child of an <a> tag
        gallery.appendChild(link); //append <a> tag as the last child of the gallery
      }, false); //default - execute in the bubbling phase
      reader.readAsDataURL(image);
    }

    if (files) { 
      [].forEach.call(files, loadImage); //for each file, which you load is made loadImage function (multiple files)
    }
  }
})();