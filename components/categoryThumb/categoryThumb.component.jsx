import { useRouter } from 'next/router';

import { CategoryContainer, CategoryImage, CategoryTitle } from './categoryThumb.styles.jsx';

const CategoryThumbComponent = ({ details }) => {
  const router = useRouter();

  const { id, image, categoryName } = details;
  return (
    <CategoryContainer
      key={id}
      onClick={() => router.push({ pathname: '/productos', query: { category: id } }).then(() => window.scrollTo(0, 0))}
    >
      <CategoryImage src={image} style={{ cursor: 'pointer' }} />
      <CategoryTitle style={{ cursor: 'pointer' }}>{categoryName}</CategoryTitle>
    </CategoryContainer>
  );
};

export default CategoryThumbComponent;
