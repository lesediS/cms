import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import './index.css';
import CourseManagement from './components/admin/courseManagement/CourseManagement.tsx';
import AdminPage from './components/admin/siteAdmin/AdminPage.tsx';
import ErrorPage from './components/error/ErrorPage.tsx';
import AddCourse from './components/admin/addForm/AddCourse.tsx';
import CourseContent from './components/admin/content/CourseContent.tsx';
import ModuleContent from './components/admin/content/ModuleContent.tsx';
import Notifications from './components/notifications/Notifications.tsx';
import Unit from './components/admin/addUnit/Unit.tsx';
import UnitDisplay from './components/admin/savedUnit/UnitDisplay.tsx';
import MyUnit from './components/Student/unit/MyUnit.tsx';
import MyModule from './components/Student/module/MyModule.tsx';
import StdNotifications from './components/Student/notifications/StdNotifications.tsx';
import CourseScreen from './components/coursescreen/CourseScreen.tsx';

// provide routing capabilities
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/site-admin',
    element: <AdminPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/abc',
    element: <AddCourse onClose={undefined}/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/site-admin/course-management',
    element: <CourseManagement />,
    errorElement: <ErrorPage />
  },
  {
    path: '/site-admin/module-management',
    element: <CourseManagement />,
    errorElement: <ErrorPage />
  },
  {
    path: '/site-admin/course-management/course-content',
    element: <CourseContent />,
    errorElement: <ErrorPage />
  },
  {
    path: '/site-admin/course-management/module-content',
    element: <ModuleContent />,
    errorElement: <ErrorPage />
  },
  {
    path: '/notifications',
    element: <Notifications />,
    errorElement: <ErrorPage />
  },
  {
    path: '/add-unit',
    element: <Unit />,
    errorElement: <ErrorPage />
  },
  {
    path: '/unit-saved',
    element: <UnitDisplay />,
    errorElement: <ErrorPage />
  },
  {
    path: '/unit', //For the students
    element: <MyUnit />,
    errorElement: <ErrorPage />
  },
  {
    path: '/module', //For the students
    element: <MyModule />,
    errorElement: <ErrorPage />
  },
  {
    path: '/mynotifications', //For the students
    element: <StdNotifications />,
    errorElement: <ErrorPage />
  },
  {
    path: '/mycourses',
    element: <CourseScreen/>,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  //performs additional checks and warnings for potential issues in code.
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)