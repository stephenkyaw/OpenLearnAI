import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardHome } from '@/pages/DashboardHome';

import { CreateCoursePage } from '@/pages/CreateCoursePage';
import { CoursePage } from '@/pages/CoursePage';

import { CourseProvider } from "@/context/CourseContext";
import { SettingsPage } from "@/pages/SettingsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { LibraryPage } from "@/pages/LibraryPage";
import { MyCoursesPage } from "@/pages/MyCoursesPage";

function App() {
  return (
    <CourseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/upload" element={<CreateCoursePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/library" element={<LibraryPage />} />
          <Route path="/dashboard/courses" element={<MyCoursesPage />} />
          <Route path="/course/english" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/dashboard/*" element={<DashboardHome />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
}

export default App;
