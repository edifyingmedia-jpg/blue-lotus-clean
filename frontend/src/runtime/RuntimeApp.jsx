// frontend/src/runtime/RuntimeApp.jsx
import React, { Suspense, useMemo } from "react";
import { useRuntime } from "./RuntimeContext";
import PageRenderer from "./PageRenderer";

/**
 * RuntimeApp
 * ----------------------------------------------------
 * The hardened root container for the live application.
 */
export default function RuntimeApp() {
  const { navigation, stateEngine } = useRuntime();
  const [current, setCurrent] = React.useState(navigation.current);

  // Sync React state with the Navigation Engine
  React.useEffect(() => {
    return navigation.subscribe((nav) => setCurrent({ ...nav }));
  }, [navigation]);

  // Use useMemo to prevent re-calculating the active page 
  // unless the definition or navigation actually changes.
  const activePage = useMemo(() => {
    const appDefinition = stateEngine.get();
    return appDefinition?.pages?.find(p => p.id === current.screen) 
      || appDefinition?.pages?.[0];
  }, [stateEngine, current.screen]);

  return (
    <div className="runtime-app-root w-full h-full bg-white text-gray-900 overflow-hidden relative">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full animate-pulse text-gray-400">
          Syncing with Twin...
        </div>
      }>
        <PageRenderer page={activePage} />
      </Suspense>
    </div>
  );
}
