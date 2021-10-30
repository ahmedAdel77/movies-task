import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from '../redux/slices/categoriesSlice';
import AddCategoryForm from './addCategoryForm';
import MovieItem from './movieItem';

export default function CategoriesList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <>
      <div className="accordion mb-5 pad2y" id="accordionExample">
        {categories.map((category) => (
          <div
            key={category.id}
            className="accordion-item"
            style={{ backgroundColor: '' }}
          >
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={'#collapse-' + category.id}
                aria-expanded="true"
                aria-controls={'collapse-' + category.id}
              >
                {category.name}
              </button>
            </h2>
            <div
              id={'collapse-' + category.id}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="container">
                <AddCategoryForm formType={'movie'} categoryId={category.id} />

                {category.movies.length ? (
                  category.movies.map((movie) => (
                    <div className="accordion-body" key={movie.id}>
                      <MovieItem
                        movie={movie}
                        catId={category.id}
                        inEditMode={false}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center">
                    no movies!.. no problem, start adding one.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
