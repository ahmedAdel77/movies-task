import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, addMovie } from '../redux/slices/categoriesSlice';

export default function AddCategoryForm({ formType, categoryId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (formType === 'category') {
      if (name) {
        dispatch(
          addCategory({
            name,
            description,
          })
        );
      }
    } else {
      if (name) {
        dispatch(
          addMovie({
            categoryId,
            name,
            description,
          })
        );
      }
    }
    setName('');
    setDescription('');
  };

  return (
    <div style={{ padding: formType === 'movie' ? '20px' : '0' }}>
      <h6 className="mb-3">
        {formType === 'category' ? 'Create Category' : 'Add Movie'}
      </h6>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-auto">
          <label
            htmlFor={
              formType === 'category'
                ? 'category-name'
                : `movie-name-${categoryId}`
            }
            className="visually-hidden"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id={
              formType === 'category'
                ? 'category-name'
                : `movie-name-${categoryId}`
            }
            placeholder="English Name*"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <label
            htmlFor={
              formType === 'category'
                ? 'category-description'
                : `movie-description-${categoryId}`
            }
            className="visually-hidden"
          >
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id={
              formType === 'category'
                ? 'category-description'
                : `movie-description-${categoryId}`
            }
            placeholder="English Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            {formType === 'category' ? 'Create Category' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}
