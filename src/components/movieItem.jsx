import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, editMovie } from '../redux/slices/categoriesSlice';

export default function MovieItem({ movie, catId, inEditMode }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(movie.name);
  const [newDescription, setNewDescription] = useState(movie.description);
  const categories = useSelector((state) => state.categories);

  
  const applyDeleteMovie = (movieId) => {
    dispatch(
      deleteMovie({
        categoryId: catId,
        movieId,
      })
    );
  };

  const applyEditMovie = (movieId) => {
    dispatch(
        editMovie({
          categoryId: catId,
          movieId,
          newName,
          newDescription,
          rate: movie.rate
        })
      );
      setEditMode(false);
  };

  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="card-body">
        {!editMode ? (
          <h5 className="card-title">{movie.name}</h5>
        ) : (
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="English Name*"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
          />
        )}
        {!editMode ? (
          <p className="card-text">{movie.description}</p>
        ) : (
          <textarea
            type="text"
            className="form-control mt-2 mb-3"
            id=""
            placeholder="English Name*"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            required
          />
        )}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {editMode ? (
            <button
              type="button"
              className="btn btn-success text-white"
              onClick={() => applyEditMovie(movie.id)}
            >
              Apply
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}

          {editMode ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => applyDeleteMovie(movie.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
