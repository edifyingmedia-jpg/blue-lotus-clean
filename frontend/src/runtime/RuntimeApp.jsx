// frontend/src/runtime/RuntimeApp.jsx
import React, { Suspense } from "react";
import { useRuntime } from "./RuntimeContext";
import PageRenderer from "./PageRenderer";

/**
 * The Root Container for the rendered application.
 */
export default function RuntimeApp() {
  const { navigation, stateEngine } = useRuntime();
  const [current, setCurrent] = React.useState(navigation.current);

  // Sync React state with the Navigation Engine
  React.useEffect(() => {
    return navigation.subscribe((nav) => setCurrent({ ...nav }));
  }, [navigation]);

  const appDefinition = stateEngine.get();
  const activePage = appDefinition?.pages?.find(p => p.id === current.screen) 
    || appDefinition?.pages?.[0];

  return (
    <div className="runtime-app-root w-full h-full bg-white text-gray-900">
      <Suspense fallback={<div className="p-10 animate-pulse">Loading UI...</div>}>
        <PageRenderer page={activePage} />
      </Suspense>
    </div>
  );
}
