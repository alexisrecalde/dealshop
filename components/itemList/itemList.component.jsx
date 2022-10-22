import CardMain from "../card/cardMain";
import { ItemList } from "./itemList.styles";

const ItemListComponent = ({ products }) => {
  return (
    <main className="main-container-card-destacados">
      {/* <ItemList>
        {products.map((product) => (
          <ItemCardComponent key={product.id} product={product} />
        ))}
      </ItemList> */}
    
      <ItemList>
        {products.map((product, index) => (
          <CardMain key={product.id} product={product} />
        ))}
      </ItemList>
    </main>
  );
};

export default ItemListComponent;
