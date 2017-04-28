var imageProcessor = (function() {
  var parameters = { //default config
    thumbWidth: 150,
    thumbHeight: 150,
    dropArea: "#dropArea",
    input: "#fieldInput",
    gallery: "#gallery",
    allowedFiles: ["jpg", "png"]
  };
  return {
    init: init,
    getParameters: parameters
  };
  function init (arg) {
    var config = utilsModule.buildConfig(this.getParameters, arg); //update config
    var dropArea = document.getElementById(config.dropArea.slice(1)); 
    eventHandlerModule.attachEvent(dropArea, "change", function() {
      handleFiles(config, galleryModule.makeThumbnail);
    });
    function handleFiles(config, callback) {
      var files = document.querySelector(config.input).files; //variable, which shows how many files is loading
      var file, allowed;
      if (!files) { 
        return;
      }
      for (var i = 0; i < files.length ; i++) {
        file = files[i];
        allowed = fileModule.checkAllowedFile(file, config.allowedFiles); //check  if the file is allowed
        if (allowed) {
          fileModule.loadFile(file, config, callback);
        }
      }
    }
  };
})();
