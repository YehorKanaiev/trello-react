import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage(): React.ReactElement {
  const error = useRouteError();
  let status: string;
  let statusText: string;
  let message: string;

  if (isRouteErrorResponse(error)) {
    status = error.status.toString();
    statusText = error.statusText;
    message = error.data?.message ?? 'Unknown Error.';
  } else if (error instanceof Error) {
    status = 'Unexpected Error.';
    statusText = 'Something went wrong.';
    message = error.message;
  } else {
    status = 'Unexpected Error.';
    statusText = 'Something went wrong.';
    message = 'Unknown Error.';
  }

  return (
    <div id="error-page">
      <h1>Oops! {status}</h1>
      <p>{statusText}</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
