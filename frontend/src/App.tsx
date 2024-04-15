import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react';
const Signup= React.lazy(()=>import("./pages/Signup"));
const Signin= React.lazy(()=>import("./pages/Signin"));
const Blog= React.lazy(()=>import("./pages/Blog"));
const Blogs= React.lazy(()=>import("./pages/All_Blogs"));
const Publish= React.lazy(()=>import("./pages/Publish"));
const EditBlog= React.lazy(()=>import("./pages/EditBlog"));
const Delete= React.lazy(()=>import("./pages/DeleteBlog"));
import BlogSkeleton from './components/BlogSkeleton';




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Signup /></Suspense>} />
          <Route path="/signin" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Signin /></Suspense>} />
          <Route path="/blog/:id" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Blog /></Suspense>} />
          <Route path="/blogs" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Blogs /></Suspense>} />
          <Route path="/publish" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Publish /></Suspense>} />
          <Route path="/edit/:id" element={<Suspense fallback={<div><BlogSkeleton/></div>}><EditBlog /></Suspense>} />
          <Route path="/delete/:id" element={<Suspense fallback={<div><BlogSkeleton/></div>}><Delete /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App