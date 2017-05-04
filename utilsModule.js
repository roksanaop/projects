var utilsModule = (function() {
  return {
    buildConfig: buildConfig
  };
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
  };
})();