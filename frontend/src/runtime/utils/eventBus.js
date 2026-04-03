// frontend/src/runtime/utils/eventBus.js

/**
 * Simple event bus for runtime communication.
 */

class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback
    );
  }

  emit(event, payload) {
    if (!this.listeners[event]) return;

    for (const callback of this.listeners[event]) {
      callback(payload);
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
