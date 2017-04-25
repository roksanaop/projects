var galleryModule = (function() {
  function makeGallery(config, imageName, imageSrc) {
    var gallery = document.getElementById(config.gallery.slice(1));
    var image = createImage(config, imageName, imageSrc); //image = return loadedImage from function createImage()
    var link = createLink(imageSrc); //link = return loadedLink from function createLink()
    link.appendChild(image); //append image as the last child of an <a> tag
    gallery.appendChild(link); //append <a> tag as the last child of the gallery
  }
  function createImage(config, imageName, imageSrc) {
    var loadedImage = document.createElement("img"); //create new image object
    loadedImage.setAttribute("height", config.thumbHeight); //add attributes to the image: size, title, source
    loadedImage.setAttribute("width", config.thumbWidth);
    loadedImage.setAttribute("title", imageName);
    loadedImage.setAttribute("src", imageSrc);
    return loadedImage;
  }
  function createLink(imageSrc) {
    var loadedLink = document.createElement("a"); //create <a> tag for hyperlink
    loadedLink.setAttribute("target", "_blank"); //image will open in the new window
    loadedLink.setAttribute("href", imageSrc); //URL of the page
    return loadedLink;
  }
  return {
    makeGallery: makeGallery
  }
})();