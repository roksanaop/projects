var fileModule = (function() {
  function handleFiles(config, callback) {
    var files = document.querySelector(config.input).files; //variable, which shows how many files is loading
    var file;
    if (files) { 
      for (var i = 0; i < files.length ; i++) {
        file = files[i];
        loadFile(file, config, callback);
      }
    }
  }
  function loadFile(file, config, callback) {
    var reader = new FileReader(); //create new FileReader(), which lets read the content of files
    if (!isFileAllowed(file, config.allowedFiles)) { //condition for images format
      return;
    }
    reader.onload = function(event) {
      callback(config, file.name, event.target.result);
    };
    reader.readAsDataURL(file);
  }
  function isFileAllowed(file, allowedFileTypes) {
    var regex = ".(" + allowedFileTypes.join("|") + ")$"; //regular expression made from configuration parameters
    var regExp = new RegExp(regex, "i"); //make new RegExp with ignoring letter case
    return regExp.test(file.name);
  }
  return {
    handleFiles: handleFiles
  }
})();