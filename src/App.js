import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from "react";
import Chatbot from "./Chatbot";
import Imagebot from "./Imagebot";

const App = () => {

  
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Imagebot />} />
        <Route path='/chat-bot' element={<Chatbot />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
