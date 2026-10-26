import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import artStudioApi from '../api/artStudioApi';
import StudioForm from '../components/StudioForm';

export const AddStudioPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const handleCreate = async (payload) => {
    setIsSubmitting(true);
    setServerErrors({});
    try {
      const created = await artStudioApi.createStudio(payload);
      toast.success(`Art studio "${created.studioName}" created successfully!`);
      // Navigate to the studios list
      navigate('/studios');
      return true;
    } catch (err) {
      if (err.fieldErrors && Object.keys(err.fieldErrors).length > 0) {
        setServerErrors(err.fieldErrors);
        toast.error('Validation failed. Please correct the highlighted fields.');
      } else {
        toast.error(err.message || 'Failed to create art studio record.');
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <StudioForm
        isEdit={false}
        isSubmitting={isSubmitting}
        onSubmit={handleCreate}
        serverErrors={serverErrors}
      />
    </div>
  );
};

export default AddStudioPage;
