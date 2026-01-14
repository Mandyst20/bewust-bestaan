import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import CategoryPage from "./pages/CategoryPage";
import TopicPage from "./pages/TopicPage";
import Messages from "./pages/Messages";
import MessageThread from "./pages/MessageThread";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";
import Guidelines from "./pages/Guidelines";
import NewTopic from "./pages/NewTopic";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/richtlijnen" element={<Guidelines />} />
            
            {/* Protected routes */}
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/community/nieuw-topic" element={<ProtectedRoute><NewTopic /></ProtectedRoute>} />
            <Route path="/community/category/:slug" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
            <Route path="/community/topic/:id" element={<ProtectedRoute><TopicPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/messages/:threadId" element={<ProtectedRoute><MessageThread /></ProtectedRoute>} />
            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
            <Route path="/blogs/:slug" element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
            <Route path="/oefeningen" element={<ProtectedRoute><Exercises /></ProtectedRoute>} />
            <Route path="/oefeningen/:slug" element={<ProtectedRoute><ExerciseDetail /></ProtectedRoute>} />
            <Route path="/cursus" element={<ProtectedRoute><Course /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/u/:username" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            
            {/* Admin only route */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
