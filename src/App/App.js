import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import { AppProvider } from "../context/context";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const About = lazy(() => import("../pages/About/About"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Contact/Contact"));

const App = () => {
  return (
    <AppProvider>
      <div>
        <Header />
        <Routes>
          <Route
            path='/about'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path='/settings'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </Suspense>
            }
          />

       <Route
            path='/contact/:id'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path='/'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                	<DndProvider backend={HTML5Backend}>
                <Home />
                </DndProvider>
              </Suspense>
            }
          />
        </Routes>
        
      </div>
    </AppProvider>
  );
};

export default App;
