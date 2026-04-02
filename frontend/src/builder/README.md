# Blue Lotus Builder

The Builder subsystem provides the interface for creating and editing apps inside Blue Lotus.  
It is fully isolated from the runtime but uses the same global project state.

## Files

- `Builder.jsx` — Entry point for Builder mode
- `BuilderApp.jsx` — Main Builder UI container
- `Workspace.jsx` — Full builder layout (TwinPanel + ComponentPanel + CanvasRenderer)
- `ComponentPanel.jsx` — Component list sourced from RegistryV2
- `CanvasRenderer.jsx` — Renders the live app canvas
- `NodeRenderer.jsx` — Renders individual nodes
- `ComponentRenderer.jsx` — Renders components from RegistryV2
- `registry.js` — Exposes RegistryV2 to the builder
- `generate.js` — Converts JSON specs into renderable node trees
- `templateRegistry.js` — Template loader and registry
- `templates.js` — App‑builder template generator

## Notes

- The Builder uses **RegistryV2** as the single source of truth for components.
- All nodes follow the unified shape: `{ id, type, props, children }`.
- The Builder and Runtime share the same rendering pipeline.
- TWIN can generate specs that the Builder can immediately preview.
