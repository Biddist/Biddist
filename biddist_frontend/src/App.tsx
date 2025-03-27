import React, {useEffect, useState} from 'react';
import {AppShell,Tabs} from '@mantine/core'
import SignupComponent from './components/Signup/SignupComponent.js'
import LoginComponent from './components/Login/LoginComponent.js';
import BidComponent from "./components/Bids/BidComponent.js";

function App() {
  const [accountId,setAccountId] =  useState<string | null>(null);
  return (
    <AppShell padding='sm' header={{height: 60}} navbar={{width: {sm: 150, md: 225, lg: 300}, breakpoint: 'sm'}}>
      <AppShell.Main>
        <Tabs defaultValue="first" orientation='vertical'>
          <Tabs.List>
            <Tabs.Tab value="first">{accountId ? "Bids" : "Login"}</Tabs.Tab>
            <Tabs.Tab value="second">{accountId ? "Items" : "Signup"}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first">{!accountId ? <LoginComponent/> : <BidComponent accountId={accountId} setAccountId={setAccountId}/>}</Tabs.Panel>
          <Tabs.Panel value="second">{!accountId ? <SignupComponent/>: null}</Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
);
}
export default App;