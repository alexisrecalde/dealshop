import { useRef, useState, useEffect } from 'react';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

import CategoryThumbComponent from '../categoryThumb/categoryThumb.component';
import { CategoriesContainer } from './categoryList.styles';

const CategoryListComponent = ({ categories }) => {
  const gliderRef = useRef();

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, [window.innerWidth]);

  return (
    <CategoriesContainer>
      <Glider
        ref={gliderRef}
        slidesToShow={mobileView ? 2 : 5}
        slidesToScroll={mobileView ? 1 : 2}
        draggable={true}
        rewind={true}
        hasArrows={true}
        dragVelocity={1}
      >
        {categories.map((category) => (
          <CategoryThumbComponent key={category.id} details={category} />
        ))}
      </Glider>
    </CategoriesContainer>
  );
};

export default CategoryListComponent;
