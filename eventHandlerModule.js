var eventHandlerModule = (function() {
  return {
    attachEvent: attachEvent,
    detachEvent: detachEvent
  };
  function attachEvent(target, event, callback) {
    target.addEventListener(event, callback, false);
  };
  function detachEvent(target, event, callback) {
    target.removeEventListener(event, callback, false);
  };
})();
