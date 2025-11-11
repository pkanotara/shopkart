import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const addressSchema = Yup.object({
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string()
    .required('ZIP code is required')
    .matches(/^[0-9]{6}$/, 'Must be a valid 6-digit PIN code'),
  country: Yup.string().required('Country is required'),
});

const AddressForm = ({ initialValues, onSubmit, onBack }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'India',
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

      {/* Street Address */}
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address *
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-field ${
            formik.touched.street && formik.errors.street ? 'border-red-500' : ''
          }`}
          placeholder="House No, Street Name"
        />
        {formik.touched.street && formik.errors.street && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.street}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City *
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input-field ${
            formik.touched.city && formik.errors.city ? 'border-red-500' : ''
          }`}
          placeholder="City"
        />
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
        )}
      </div>

      {/* State and ZIP */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-field ${
              formik.touched.state && formik.errors.state ? 'border-red-500' : ''
            }`}
            placeholder="State"
          />
          {formik.touched.state && formik.errors.state && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
            PIN Code *
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formik.values.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-field ${
              formik.touched.zip && formik.errors.zip ? 'border-red-500' : ''
            }`}
            placeholder="400001"
            maxLength={6}
          />
          {formik.touched.zip && formik.errors.zip && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.zip}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        {onBack && (
          <button type="button" onClick={onBack} className="btn-secondary flex-1">
            Back to Cart
          </button>
        )}
        <button type="submit" className="btn-primary flex-1">
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default AddressForm;