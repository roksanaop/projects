var galleryModule = (function() {
  return {
    createCanvasImage: createCanvasImage,
    makeThumbnail: makeThumbnail
  };
  function makeThumbnail(config, imageName, imageSrc) {
    var gallery = document.getElementById(config.gallery.slice(1));
    var image = createCanvasImage(config, imageName, imageSrc); //image = return canvas from function createCanvasImage()
    gallery.appendChild(image); //append canvas as the last child of the gallery
  };
  function createCanvasImage(config, imageName, imageSrc) {
    var canvas = document.createElement("canvas"); //create canvas
    canvas.setAttribute("width", config.thumbWidth); //add dimensions to the canvas
    canvas.setAttribute("height", config.thumbHeight);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d"); //
      var loadedImage = document.createElement("img"); //create new image object
      //loadedImage.setAttribute("height", config.thumbHeight); //add attributes to the image: size, title, source
      //loadedImage.setAttribute("width", config.thumbWidth); //but not necessary in canvas
      loadedImage.setAttribute("title", imageName);
      loadedImage.setAttribute("src", imageSrc);
      ctx.drawImage(loadedImage, 0, 0, config.thumbWidth, config.thumbHeight); //draw image with proper dimensions
      canvas.addEventListener("click", function() { //open image in the new window after click on it
        window.open(imageSrc);
      });
    }
    return canvas;
  }
})();
