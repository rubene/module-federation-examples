import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import LocalButton from "./Button";
import React from "react";
Amplify.configure(awsconfig);

const RemoteButton = React.lazy(() => import("app2/App"));
console.log("remote: ", RemoteButton)

const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 1 (shell app)</h2>
    <LocalButton />
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    <AmplifySignOut />
  </div>
);

export default withAuthenticator(App);
