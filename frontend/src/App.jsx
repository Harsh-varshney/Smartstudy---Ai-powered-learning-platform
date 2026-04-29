import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext"
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Video from "./Pages/video/Video";
import Todo from "./Pages/Todo";

import Home from "./Pages/Home";
// import Notes from "./Pages/Notes";
import CreateNote from "./Pages/CreateNote";
import ViewNotes from "./Pages/ViewNotes";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

import Syllabus from "./Pages/syllabus/Syllabus";
import PYQSemesters from "./Pages/pyq/PYQSemesters";
import PYQSubjects from "./Pages/pyq/PYQSubjects";
import PYQPapers from "./Pages/pyq/PYQPapers";
import PaperUpload from "./Pages/Admin/upload/PaperUpload";
import ViewPapers from "./Pages/ViewPapers";
import AIAssistant from "./Pages/aiAssistant/AIAssistant";
import AINotes from "./Pages/aiNotes/AINotes";
import AIQuiz from "./Pages/Quiz/AIQuiz";
import PaperAnalysis from "./Pages/paperAnalysis/PaperAnalysis";
import AITools from "./Pages/AiTools";

function App() {
  const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
  });

  
  return (
    <ToastProvider>
      <BrowserRouter>
        {/* Navbar */}
        <Navbar  user={user} setUser={setUser} />

        {/* Main Content */}
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* <Route path="/notes" element={ <ProtectedRoute> <Notes /> </ProtectedRoute> } /> */}

            <Route path="/create" element={ <ProtectedRoute><CreateNote /></ProtectedRoute>  }/>

            <Route path="/notes" element={<ProtectedRoute> <ViewNotes /> </ProtectedRoute>  }/>

            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser}/>} />
            <Route path="/video" element={<Video />} />


            <Route path="/syllabus" element={<Syllabus />} />

            {/* PYQ Routes */}
            <Route path="/pyq" element={<PYQSemesters />} />
            <Route path="/pyq/sem/:sem" element={<PYQSubjects />} />
            <Route path="/pyq/sem/:sem/subject/:subject" element={<PYQPapers />}/>
            <Route path="/admin/upload" element={ <ProtectedRoute role="admin"> <PaperUpload /> </ProtectedRoute>}/>
            <Route 
              path="/papers" 
              element={
                <ProtectedRoute>
                  <ViewPapers />
                </ProtectedRoute>
              } 
            />

            <Route path="/todo" element={<Todo />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/ai-notes" element={<AINotes />} />
            <Route path="/ai-quiz" element={<AIQuiz />} />
            <Route path="/paper-analysis" element={<PaperAnalysis />} />
            <Route path="/ai-tools" element={<AiTools />} />
          </Routes>
        </div>

        <Footer/>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
