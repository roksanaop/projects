/**
 * This function creates drag&drop multiple input field,
 * makes each of "drops" <a> tags in <img> tags,
 * and then creates a simple gallery out of the loaded images.
 */

var galleryModule = {
  makeGallery: function(imageName, imageSrc) {
    var gallery = document.getElementById("gallery");
    var image = galleryModule.createImage(imageName, imageSrc); //image = return loadedImage from function createImage()
    var link = galleryModule.createLink(imageSrc); //link = return loadedLink from function createLink()
    link.appendChild(image); //append image as the last child of an <a> tag
    gallery.appendChild(link); //append <a> tag as the last child of the gallery
  },
  createImage: function(imageName, imageSrc) {
    var loadedImage = document.createElement("img"); //create new image object
    loadedImage.setAttribute("height", imageProcessor.parameters.thumbHeight); //add attributes to the image: size, title, source
    loadedImage.setAttribute("width", imageProcessor.parameters.thumbWidth);
    loadedImage.setAttribute("title", imageName);
    loadedImage.setAttribute("src", imageSrc);
    return loadedImage;
  },
  createLink: function(imageSrc) {
    var loadedLink = document.createElement("a"); //create <a> tag for hyperlink
    loadedLink.setAttribute("target", "_blank"); //image will open in new window
    loadedLink.setAttribute("href", imageSrc); //URL of the page
    return loadedLink;
  }
}

var eventHandlerModule = {
  attachEvent: function(target, event, callback) {
    target.addEventListener(event, callback, false);
  },
  detachEvent: function(target, event, callback) {
    target.removeEventListener(event, callback, false);
  }
}

var fileModule = {
  handleFiles: function(querySel) {
    var files = document.querySelector(querySel).files; //variable, which shows how many files is loading
    if (files) { 
      [].forEach.call(files, fileModule.reading); //for each file, which you load is made loadImage function (multiple files)
    }
  },
  reading: function(image) {
    var reader = new FileReader(); //create new FileReader(), which lets read the content of files
    var regex = ".(" + imageProcessor.parameters.allowedFiles.join("|") + ")$"; //regular expression made from configuration parameters
    var regExp = new RegExp(regex, "i"); //make new RegExp with ignoring letter case
    if (regExp.test(image.name)) { //condition for images format
      eventHandlerModule.attachEvent(reader, "load", function() {
        galleryModule.makeGallery(image.name, this.result);
      });
      reader.readAsDataURL(image);
    }
  }
}

var imageProcessor = {
  parameters: {
    thumbWidth: 150,
    thumbHeight: 150,
    dropArea: '#dropArea',
    input: '#fieldInput',
    allowedFiles: ['jpg', 'png']
  },

  init: function(arg) {
    if (arg !== undefined) { //update when new parameters are gave to function
      function updateConfig() {
        for (var prop in arg) {
          for (var propert in imageProcessor.parameters) {
            if (prop === propert) {
              imageProcessor.parameters[propert] = arg[prop];
            }
          }
        }
      }
      updateConfig();
      //imageProcessor.parameters = arg; //we can use this line rather than updateConfig() if configuration can be updated only with all properties
    }
    function createHTML() {
      var dropArea = document.createElement("div"); 
      dropArea.setAttribute("id", imageProcessor.parameters.dropArea.slice(1)); //create div id=dropArea
      var textArea = document.createElement("p");
      var textNode = document.createTextNode("Click here or drag here your images");
      textArea.appendChild(textNode); //add text to paragraph
      dropArea.appendChild(textArea); //add paragraph to div (id=dropArea)
      var input = document.createElement("input");
      input.setAttribute("id", imageProcessor.parameters.input.slice(1));
      input.setAttribute("type", "file");
      input.setAttribute("multiple", ""); //create input type=file, id=fieldInput, multiple
      dropArea.appendChild(input); //add input to div (id=dropArea)
      document.body.appendChild(dropArea); //add div (id=dropArea) to 
      var galleryArea = document.createElement("div");
      galleryArea.setAttribute("id", "gallery"); //create div id=gallery
      document.body.appendChild(galleryArea);
      var inputId = imageProcessor.parameters.input;
      eventHandlerModule.attachEvent(dropArea, "change", function() {
        fileModule.handleFiles(inputId);
      });
    }
    createHTML();
  }
}
/*
canvasGallery: function(image) {
    var drawing = document.getElementById("drawing");
    var context = drawing.getContext("2d"); //
    var loadedImage = document.createElement("img");
    loadedImage.setAttribute("src", this.result);
    var imgURL = this.result;
    context.drawImage(loadedImage, 0, 0, imageProcessor.parameters.thumbHeight, imageProcessor.parameters.thumbWidth);
    drawing.addEventListener("click", function() {
      window.open(imgURL);
    });
  }
  */