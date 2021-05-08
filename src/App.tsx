import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import Router from './infrastructure/routing/Router';
import Index from "./pages";
import { msalConfig } from "./dataAccess/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import Authentication from "./components/Authentification";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <Authentication>
                <Router>
                    <Index/>
                </Router>
            </Authentication>
        </MsalProvider>
    );
}

export default App;
