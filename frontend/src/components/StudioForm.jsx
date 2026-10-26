import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  XCircle,
  AlertCircle,
  Building2,
  User,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';

export const StudioForm = ({
  initialData = null,
  isEdit = false,
  isSubmitting = false,
  onSubmit,
  serverErrors = {},
}) => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    studioName: '',
    ownerName: '',
    monthlyRent: '',
    active: true,
  });

  // Client Validation Errors
  const [clientErrors, setClientErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        studioName: initialData.studioName || '',
        ownerName: initialData.ownerName || '',
        monthlyRent:
          initialData.monthlyRent !== undefined && initialData.monthlyRent !== null
            ? String(initialData.monthlyRent)
            : '',
        active: initialData.active ?? true,
      });
    }
  }, [initialData]);

  // Combined field errors (client + server fieldErrors)
  const errors = { ...clientErrors, ...serverErrors };

  // Validate a single field
  const validateField = (name, value) => {
    let err = '';

    if (name === 'studioName') {
      if (!value || !value.toString().trim()) {
        err = 'Studio name is required and cannot be blank';
      } else if (value.trim().length > 100) {
        err = 'Studio name must not exceed 100 characters';
      }
    }

    if (name === 'ownerName') {
      if (!value || !value.toString().trim()) {
        err = 'Owner name is required and cannot be blank';
      } else if (value.trim().length > 100) {
        err = 'Owner name must not exceed 100 characters';
      }
    }

    if (name === 'monthlyRent') {
      const valStr = String(value).trim();
      if (!valStr) {
        err = 'Monthly rent is required';
      } else {
        const num = parseFloat(valStr);
        if (isNaN(num)) {
          err = 'Monthly rent must be a valid number';
        } else if (num < 0.01) {
          err = 'Monthly rent must be greater than zero (minimum ₹0.01)';
        } else if (!/^\d+(\.\d{1,2})?$/.test(valStr)) {
          err = 'Monthly rent may have at most 2 decimal places';
        } else if (num > 9999999999.99) {
          err = 'Monthly rent exceeds maximum allowed digits';
        }
      }
    }

    return err;
  };

  // Full validation before submit
  const validateAll = () => {
    const newErrors = {};
    const studioNameErr = validateField('studioName', formData.studioName);
    if (studioNameErr) newErrors.studioName = studioNameErr;

    const ownerNameErr = validateField('ownerName', formData.ownerName);
    if (ownerNameErr) newErrors.ownerName = ownerNameErr;

    const monthlyRentErr = validateField('monthlyRent', formData.monthlyRent);
    if (monthlyRentErr) newErrors.monthlyRent = monthlyRentErr;

    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (touched[name]) {
      const err = validateField(name, finalValue);
      setClientErrors((prev) => ({
        ...prev,
        [name]: err,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setClientErrors((prev) => ({
      ...prev,
      [name]: err,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      studioName: true,
      ownerName: true,
      monthlyRent: true,
    });

    if (!validateAll()) {
      return;
    }

    // Submit payload
    const payload = {
      studioName: formData.studioName.trim(),
      ownerName: formData.ownerName.trim(),
      monthlyRent: parseFloat(formData.monthlyRent),
      active: Boolean(formData.active),
    };

    const success = await onSubmit(payload);
    if (success && !isEdit) {
      // Reset form on successful creation
      setFormData({
        studioName: '',
        ownerName: '',
        monthlyRent: '',
        active: true,
      });
      setTouched({});
      setClientErrors({});
    }
  };

  // Live currency preview helper
  const formattedRentPreview = (() => {
    const num = parseFloat(formData.monthlyRent);
    if (!isNaN(num) && num > 0) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }).format(num);
    }
    return null;
  })();

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-header-title">
          {isEdit ? 'Edit Art Studio' : 'Register New Art Studio'}
        </h2>
        <p className="form-header-subtitle">
          {isEdit
            ? 'Modify workspace rental lease details and tenancy status.'
            : 'Fill in the information below to add an art studio workspace to the database.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-body">
          {/* Readonly Primary Key Badge (Edit mode only) */}
          {isEdit && initialData?.id && (
            <div className="id-notice-box" role="note" aria-label="Primary key identifier">
              <div>
                <span className="id-notice-label">System Primary Key</span>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-500)', marginTop: '2px' }}>
                  Database generated immutable record identifier
                </div>
              </div>
              <span className="id-notice-value">ID #{initialData.id}</span>
            </div>
          )}

          {/* Studio Name */}
          <div className="form-field-group">
            <label htmlFor="studioName" className="form-label">
              <Building2 size={15} style={{ color: 'var(--terracotta-500)' }} />
              <span>Studio Name</span>
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <input
              id="studioName"
              name="studioName"
              type="text"
              className={`form-control-artistry ${errors.studioName ? 'is-invalid' : ''}`}
              placeholder="e.g. Creative Canvas Studio, Atelier Lumière"
              maxLength={100}
              value={formData.studioName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.studioName)}
              aria-describedby={errors.studioName ? 'studioName-error' : undefined}
            />
            {errors.studioName ? (
              <span id="studioName-error" className="form-field-error" role="alert">
                <AlertCircle size={13} />
                {errors.studioName}
              </span>
            ) : (
              <span className="form-field-hint">
                Enter the formal title or studio workspace room designation (up to 100 characters).
              </span>
            )}
          </div>

          {/* Owner Name */}
          <div className="form-field-group">
            <label htmlFor="ownerName" className="form-label">
              <User size={15} style={{ color: 'var(--terracotta-500)' }} />
              <span>Owner / Artist Name</span>
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              className={`form-control-artistry ${errors.ownerName ? 'is-invalid' : ''}`}
              placeholder="e.g. Aarav Sharma, Maya Lin"
              maxLength={100}
              value={formData.ownerName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={Boolean(errors.ownerName)}
              aria-describedby={errors.ownerName ? 'ownerName-error' : undefined}
            />
            {errors.ownerName ? (
              <span id="ownerName-error" className="form-field-error" role="alert">
                <AlertCircle size={13} />
                {errors.ownerName}
              </span>
            ) : (
              <span className="form-field-hint">
                Full legal or professional name of the primary studio lessee or owner.
              </span>
            )}
          </div>

          {/* Monthly Rent */}
          <div className="form-field-group">
            <label htmlFor="monthlyRent" className="form-label">
              <IndianRupee size={15} style={{ color: 'var(--terracotta-500)' }} />
              <span>Monthly Rent (INR)</span>
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-prefix">₹</span>
              <input
                id="monthlyRent"
                name="monthlyRent"
                type="number"
                step="0.01"
                min="0.01"
                className={`form-control-artistry has-prefix ${errors.monthlyRent ? 'is-invalid' : ''}`}
                placeholder="15000.00"
                value={formData.monthlyRent}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={Boolean(errors.monthlyRent)}
                aria-describedby={errors.monthlyRent ? 'monthlyRent-error' : undefined}
              />
            </div>
            {errors.monthlyRent ? (
              <span id="monthlyRent-error" className="form-field-error" role="alert">
                <AlertCircle size={13} />
                {errors.monthlyRent}
              </span>
            ) : formattedRentPreview ? (
              <span className="form-field-hint" style={{ color: 'var(--terracotta-600)', fontWeight: 500 }}>
                Formatted preview: <strong>{formattedRentPreview}</strong> / month
              </span>
            ) : (
              <span className="form-field-hint">
                Specified in Indian Rupees (INR). Must be greater than ₹0.00 with up to 2 decimal places.
              </span>
            )}
          </div>

          {/* Active Status */}
          <div className="form-field-group">
            <label className="form-label">
              <span>Tenancy / Active Status</span>
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <div className="status-radio-group" role="radiogroup" aria-label="Studio active status">
              <div
                className={`status-radio-card ${formData.active ? 'selected' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, active: true }))}
                role="radio"
                aria-checked={formData.active}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    setFormData((prev) => ({ ...prev, active: true }));
                  }
                }}
              >
                <div className="status-radio-indicator" />
                <div className="status-radio-text-wrap">
                  <span className="status-radio-title">Active Studio</span>
                  <span className="status-radio-desc">Currently occupied & generating rent</span>
                </div>
              </div>

              <div
                className={`status-radio-card ${!formData.active ? 'selected' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, active: false }))}
                role="radio"
                aria-checked={!formData.active}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    setFormData((prev) => ({ ...prev, active: false }));
                  }
                }}
              >
                <div className="status-radio-indicator" />
                <div className="status-radio-text-wrap">
                  <span className="status-radio-title">Inactive / Vacant</span>
                  <span className="status-radio-desc">Vacant or temporarily decommissioned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-artistry-secondary"
            onClick={() => navigate('/studios')}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-artistry-primary"
            disabled={isSubmitting}
          >
            <Save size={16} />
            <span>
              {isSubmitting
                ? isEdit
                  ? 'Updating Studio...'
                  : 'Creating Studio...'
                : isEdit
                ? 'Save Changes'
                : 'Create Studio'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudioForm;
