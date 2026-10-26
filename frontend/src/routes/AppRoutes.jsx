import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import StudiosPage from '../pages/StudiosPage';
import AddStudioPage from '../pages/AddStudioPage';
import EditStudioPage from '../pages/EditStudioPage';
import NotFoundPage from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="studios" element={<StudiosPage />} />
        <Route path="studios/new" element={<AddStudioPage />} />
        <Route path="studios/:id/edit" element={<EditStudioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
