// frontend/src/runtime/LivePreview.js
import React, { Suspense } from "react";
import AppRenderer from "./AppRenderer";

/**
 * A Sandboxed Live Preview container.
 * Provides isolation and error handling for the active blueprint.
 */
export default function LivePreview({ appDefinition, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900/10">
        <span className="text-sm animate-pulse">Syncing blueprint...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-white shadow-inner">
      <Suspense fallback={<div>Loading Renderer...</div>}>
        <AppRenderer appDefinition={appDefinition} />
      </Suspense>
    </div>
  );
}
