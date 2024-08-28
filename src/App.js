import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Home = lazy(() => import('./pages/Home'));
const Builder = lazy(() => import('./pages/Builder'));

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </Suspense>
    </DndProvider>
  );
}

export default App;
