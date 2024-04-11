import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react';
const Signup= React.lazy(()=>import("./pages/Signup"));
const Signin= React.lazy(()=>import("./pages/Signin"));
const Blog= React.lazy(()=>import("./pages/Blog"));
const Blogs= React.lazy(()=>import("./pages/Blogs"));
import reactLogo from './assets/react.svg'




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Suspense fallback={<img src={reactLogo} alt='loading...'/>}><Signup /></Suspense>} />
          <Route path="/signin" element={<Suspense fallback={<img src={reactLogo} alt='loading...'/>}><Signin /></Suspense>} />
          <Route path="/blog/:id" element={<Suspense fallback={<img src={reactLogo} alt='loading...'/>}><Blog /></Suspense>} />
          <Route path="/blogs" element={<Suspense fallback={<img src={reactLogo} alt='loading...'/>}><Blogs /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App