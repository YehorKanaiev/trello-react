import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Loader } from './shared/loader/Loader';

function App(): React.ReactElement {
  return (
    <>
      <RouterProvider router={router} />
      <Loader />
    </>
  );
}

export default App;
