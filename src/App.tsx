import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/category/:slug" element={<CategoryPage />} />
          <Route path="/community/topic/:id" element={<TopicPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:threadId" element={<MessageThread />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/oefeningen" element={<Exercises />} />
          <Route path="/oefeningen/:slug" element={<ExerciseDetail />} />
          <Route path="/cursus" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/u/:username" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/richtlijnen" element={<Guidelines />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
