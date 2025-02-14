import { BrowserRouter, Routes} from 'react-router';
import React, {useEffect, useState} from 'react';
import {AppShell,Tabs} from '@mantine/core'
import SignupComponent from './components/Signup/SignupComponent'
import LoginComponent from './components/Login/LoginComponent';
import {backendURL, getConfig} from "./FetchConfig";

function App() {
  const accountId =  useState<string | null>(null);
  useEffect(() => {
  }, []);
  return (
      <BrowserRouter>
        <AppShell padding = 'sm' header={{height: 60}} navbar={{width: {sm: 150, md: 225, lg: 300}, breakpoint: 'sm'}}>
          <AppShell.Main>
          <Tabs defaultValue="first" orientation='vertical'>
            <Tabs.List>
              <Tabs.Tab value="first">Login</Tabs.Tab>
              <Tabs.Tab value="second">Signup</Tabs.Tab>
              <Tabs.Tab value="third">Payment</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first"><LoginComponent/></Tabs.Panel>
            <Tabs.Panel value="second"><SignupComponent/></Tabs.Panel>
          </Tabs>
          </AppShell.Main>
            <Routes>
            </Routes>
        </AppShell>
      </BrowserRouter>
  );
}
export default App;