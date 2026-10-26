import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import artStudioApi from '../api/artStudioApi';
import StudioForm from '../components/StudioForm';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export const EditStudioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const fetchStudio = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await artStudioApi.getStudioById(id);
      setStudio(data);
    } catch (err) {
      if (err.status === 404) {
        setFetchError(`Art studio with ID #${id} was not found on the backend.`);
      } else {
        setFetchError(err.message || `Failed to fetch art studio record #${id}.`);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);

  const handleUpdate = async (payload) => {
    setIsSubmitting(true);
    setServerErrors({});
    try {
      const updated = await artStudioApi.updateStudio(id, payload);
      toast.success(`Art studio "${updated.studioName}" updated successfully!`);
      navigate('/studios');
      return true;
    } catch (err) {
      if (err.fieldErrors && Object.keys(err.fieldErrors).length > 0) {
        setServerErrors(err.fieldErrors);
        toast.error('Validation failed. Please correct the highlighted fields.');
      } else {
        toast.error(err.message || 'Failed to update art studio record.');
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState message={`Fetching details for studio #${id}...`} />;
  }

  if (fetchError) {
    return (
      <ErrorState
        title="Unable to load studio for editing"
        message={fetchError}
        onRetry={fetchStudio}
      />
    );
  }

  return (
    <div>
      <StudioForm
        initialData={studio}
        isEdit={true}
        isSubmitting={isSubmitting}
        onSubmit={handleUpdate}
        serverErrors={serverErrors}
      />
    </div>
  );
};

export default EditStudioPage;
