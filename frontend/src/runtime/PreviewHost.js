// frontend/src/runtime/PreviewHost.js
import React from "react";
import RuntimeApp from "./RuntimeApp";
import RuntimeContext from "./RuntimeContext";
import RuntimeEngine from "./RuntimeEngine";

export default class PreviewHost {
  constructor() {
    this.runtime = null;
    this.onEvent = null;
  }

  /**
   * Initializes the engine. If one exists, it resets it to prevent memory leaks.
   */
  init({ appDefinition, onEvent }) {
    if (this.runtime) {
      this.destroy();
    }
    
    this.onEvent = onEvent;
    this.runtime = new RuntimeEngine();
    
    // Initialize with a callback that ensures the host is still active
    this.runtime.init(appDefinition, (event) => {
      if (this.onEvent) {
        this.onEvent(event);
      }
    });
  }

  /**
   * Cleanup method to stop listeners and free up memory.
   */
  destroy() {
    if (this.runtime && this.runtime.dispose) {
      this.runtime.dispose();
    }
    this.runtime = null;
  }

  render() {
    if (!this.runtime) return null;

    return (
      <RuntimeContext.Provider value={this.runtime}>
        <RuntimeApp />
      </RuntimeContext.Provider>
    );
  }
}
