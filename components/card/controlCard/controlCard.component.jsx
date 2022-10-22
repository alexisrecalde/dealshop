import { useRouter } from 'next/router';
import { Card, CardTitle } from './controlCard.styles';

const ControlCardComponent = ({ action }) => {
  const { title, image, path, params } = action;
  const router = useRouter();

  const onGoToRoute = (targetRoute, targetParams) => {
    targetParams = targetParams ? targetParams : {};
    router.push({ pathname: targetRoute, query: { ...targetParams } }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Card onClick={() => onGoToRoute(path, params)}>
      {image}
      <CardTitle>{title}</CardTitle>
    </Card>
  );
};

export default ControlCardComponent;
