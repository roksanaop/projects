var imageProcessor = {
  parameters: { //default config
    thumbWidth: 150,
    thumbHeight: 150,
    dropArea: "#dropArea",
    input: "#fieldInput",
    gallery: "#gallery",
    allowedFiles: ["jpg", "png"]
  },
  init: function(arg) {
    var config = buildConfig(imageProcessor.parameters, arg); //update config
    var dropArea = document.getElementById(config.dropArea.slice(1)); 
    eventHandlerModule.attachEvent(dropArea, "change", function() {
      fileModule.handleFiles(config, galleryModule.makeGallery);
    });
    function buildConfig(defaults, config) {
      var result = {}; //make new object for handling updated configuration
      for (var prop in defaults) {
        result[prop] = (config && typeof config[prop] !== "undefined") ? config[prop] : defaults[prop];
      }
      for (var prop in config) { //if config has new poperties, it will add this to updated configuration
        if (typeof defaults[prop] === "undefined") {
          result[prop] = config[prop];
        }
      }
      return result;
    }
  }
}
