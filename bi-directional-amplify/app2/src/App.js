import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import LocalButton from "./Button";
import React, { useEffect, useState } from "react";
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// const RemoteButton = React.lazy(() => import("app1/Button"));

const App = () => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const currentUser = async () => {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
      debugger
      setUser(JSON.stringify(user.attributes))
    }

    currentUser()
  }, [])

  return (
    <div>
      <h1>Bi-Directional</h1>
      <h2>App 2</h2>
      <LocalButton />
      <p>{user}</p>
    </div>
  )
}

export default withAuthenticator(App);
// export default App;
