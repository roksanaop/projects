var eventHandlerModule = {
  attachEvent: function(target, event, callback) {
    target.addEventListener(event, callback, false);
  },
  detachEvent: function(target, event, callback) {
    target.removeEventListener(event, callback, false);
  }
}