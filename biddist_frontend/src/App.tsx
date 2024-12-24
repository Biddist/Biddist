import react from 'react';
import { BrowserRouter, Route, Routes, Link, Router, NavLink } from 'react-router';
import axios from 'axios'
import React from 'react';
import {AppShell, MantineProvider,Tabs} from '@mantine/core'
import SignupComponent from './components/SignupComponent'
import LoginComponent from './components/LoginComponent';
axios.defaults.withCredentials = true;

function App() {
  return (
      <BrowserRouter>
        <AppShell padding = 'sm' header={{height: 60}} navbar={{width: {sm: 150, md: 225, lg: 300}, breakpoint: 'sm'}}>
          <AppShell.Main>
          <Tabs defaultValue="first" orientation='vertical'>
            <Tabs.List>
              <Tabs.Tab value="first">Login</Tabs.Tab>
              <Tabs.Tab value="second">Signup</Tabs.Tab>
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