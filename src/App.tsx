import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { OverlayComponents } from './shared/OverlayComponents';

function App(): React.ReactElement {
  return (
    <>
      <RouterProvider router={router} />
      <OverlayComponents />
    </>
  );
}

export default App;
