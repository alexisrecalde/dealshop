import TableComponent from '../table.component';

const OutOfStockTableComponent = ({ items }) => {
  const arrayOfColumns = [
    { id: 1, name: 'Producto' },
    { id: 2, name: 'Stock Disponible' },
    { id: 3, name: 'Stock Pedido' },
  ];

  const arrayOfItems = items.map((item) => {
    return {
      name: item.product.name,
      stockAvailable: item.stockAvailable,
      quantityInOrder: item.quantityInOrder,
    };
  });

  return (
    <div>
      <p>Los siguientes productos no cuentan con suficiente stock. Los mismos serán eliminados del carrito.</p>
      <TableComponent columns={arrayOfColumns} rows={arrayOfItems} />
    </div>
  );
};

export default OutOfStockTableComponent;
