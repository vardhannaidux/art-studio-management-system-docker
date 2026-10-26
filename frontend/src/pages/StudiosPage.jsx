import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import artStudioApi from '../api/artStudioApi';
import StudioTable from '../components/StudioTable';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export const StudiosPage = () => {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStudios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await artStudioApi.getAllStudios();
      setStudios(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch studio records from the backend');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudios();
  }, [fetchStudios]);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await artStudioApi.deleteStudio(id);
      toast.success(`Art studio #${id} was deleted successfully.`);
      // Refresh list
      await fetchStudios();
    } catch (err) {
      if (err.status === 404) {
        toast.error(`Studio #${id} was not found on the server.`);
      } else {
        toast.error(err.message || 'Failed to delete studio record.');
      }
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading Art Studio directory..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load studios"
        message={error}
        onRetry={fetchStudios}
      />
    );
  }

  if (studios.length === 0) {
    return (
      <EmptyState
        title="No studios in your registry"
        description="You have not added any art studios yet. Register your first studio workspace to start managing rent and tenancy."
        actionLabel="Add Studio"
        actionTo="/studios/new"
      />
    );
  }

  return (
    <div>
      <StudioTable
        studios={studios}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        onRefresh={fetchStudios}
      />
    </div>
  );
};

export default StudiosPage;
