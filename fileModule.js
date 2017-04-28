var fileModule = (function() {
  return {
    loadFile: loadFile,
    checkAllowedFile: checkAllowedFile
  };
  function loadFile(file, config, callback, image) {
    var reader = new FileReader(); //create new FileReader(), which lets read the content of files
    reader.onload = function(event) {
      callback(config, file.name, event.target.result);
    };
    reader.readAsDataURL(file);
  };
  function checkAllowedFile(file, allowedFileTypes) {
    var regex = ".(" + allowedFileTypes.join("|") + ")$"; //regular expression made from configuration parameters
    var regExp = new RegExp(regex, "i"); //make new RegExp with ignoring letter case
    return regExp.test(file.name);
  };
})();
