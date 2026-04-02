import RuntimeApp from "./RuntimeApp";
import RuntimeContext from "./RuntimeContext";
import RuntimeEngine from "./RuntimeEngine";

export default class PreviewHost {
  constructor() {
    this.runtime = null;
    this.onEvent = null;
  }

  init({ appDefinition, onEvent }) {
    this.onEvent = onEvent;

    this.runtime = new RuntimeEngine();
    this.runtime.init(appDefinition, (event) => {
      if (this.onEvent) this.onEvent(event);
    });
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
