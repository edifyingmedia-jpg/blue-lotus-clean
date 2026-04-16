// frontend/src/App.jsx (Refined Architecture)

// ELITE UPGRADE: Global CSS Variables for seamless transitions
const applyTheme = (isDark) => {
  const root = document.documentElement;
  if (isDark) {
    root.style.setProperty('--bg-main', '#0F0F14');
    root.style.setProperty('--accent-glow', 'rgba(255, 140, 207, 0.45)');
  } else {
    root.style.setProperty('--bg-main', '#F8F9FF');
    root.style.setProperty('--accent-glow', 'rgba(199, 164, 255, 0.3)');
  }
};

// ... inside the App component
const handleBuild = async () => {
  setTwinThinking(true);
  try {
    const response = await fetch("/api/twin", {
      method: "POST",
      body: JSON.stringify({ action: "build", prompt: twinInput, context: "v2-architect" })
    });
    const data = await response.json();
    
    // Add a smooth transition effect before updating HTML
    setPreviewHTML(data.html);
  } catch (err) {
    setTwinText("I encountered a structural error while building.");
  }
  setTwinThinking(false);
};
