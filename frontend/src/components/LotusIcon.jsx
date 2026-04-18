.logo-container {
  display: flex !important; /* Force layout */
  justify-content: center;
  align-items: center;
  min-height: 150px; /* Ensure there is space for it */
  width: 100%;
  position: relative;
  z-index: 999; /* Put it on top of everything */
}

.logo {
  display: block;
  margin: auto;
  will-change: filter, transform;
  /* If the gradient fails, this fallback color ensures you see it */
  background: transparent; 
}
