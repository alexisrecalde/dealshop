import { Document, Page, View, Image, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from 'react-table-pdf';

const PDFfacturaComponent = ({ name, documentsData }) => {
  return (
    <Document title={name}>
      {documentsData.map((data) => {
        const shippingCost = data.shippingCost != null ? data.shippingCost.price : 0;

        return (
          <Page key={data.id} size="A4" style={styles.strip}>
            <View style={styles.section}>
              <View style={styles.header}>
                <View style={styles.headerBrand}>
                  <Image src="/img/logo_final.png" style={styles.logo} />
                  <Text style={styles.brand}>DEALSHOP</Text>
                </View>
                <View style={styles.headerDetails}>
                  <Text>
                    Orden de compra #<Text>{data.id}</Text>
                  </Text>
                  <Text>
                    Fecha de compra: <Text>{data.orderDate.substr(0, 10)}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.body}>
                <View style={styles.details}>
                  <View style={styles.detailSection}>
                    <Text>Vendedor:</Text>
                    <Text> </Text>
                    <Text>
                      {data.seller ? `${data.seller.firstName} ${data.seller.lastName}` : '(Vendedor sin asignar)'}
                    </Text>
                    <Text>Email: {data.seller ? data.seller.email : '-'}</Text>
                    <Text>Teléfono: {data.seller ? data.seller.phone : '-'}</Text>
                    <Text> </Text>
                  </View>
                  <View style={styles.detailSection}>
                    <Text>Cliente:</Text>
                    <Text> </Text>
                    <Text>{data.clientName}</Text>
                    <Text>
                      Dirección:{' '}
                      {data.clientAddress ? `${data.clientAddress.street} ${data.clientAddress.streetNumber}` : '-'}
                    </Text>
                    <Text>
                      Departamento:{' '}
                      {data.clientAddress ? `${data.clientAddress.floor} ${data.clientAddress.apartment}` : '-'}
                    </Text>
                    <Text>Documento: {data.clientDocument}</Text>
                  </View>
                </View>
                <Table data={data.products}>
                  <TableHeader textAlign={'center'}>
                    <TableCell weighting={0.3}>id</TableCell>
                    <TableCell weighting={1}>Producto</TableCell>
                    <TableCell weighting={0.6}>Precio</TableCell>
                    <TableCell weighting={0.4}>Cantidad</TableCell>
                    <TableCell weighting={0.6}>Total</TableCell>
                  </TableHeader>
                  <TableBody textAlign={'center'}>
                    <DataTableCell weighting={0.3} getContent={(product) => product.id} />
                    <DataTableCell weighting={1} getContent={(product) => product.product.name} />
                    <DataTableCell weighting={0.6} getContent={(product) => product.clientSellingPrice} />
                    <DataTableCell weighting={0.4} getContent={(product) => product.quantity} />
                    <DataTableCell
                      weighting={0.6}
                      getContent={(product) => product.clientSellingPrice * product.quantity}
                    />
                  </TableBody>
                </Table>
                <View style={styles.amounts}>
                  <View>
                    <Text>Subtotal ${data.clientSellingTotalPrice}</Text>
                    <Text>Envío ${shippingCost}</Text>
                    <Text>Total ${data.clientSellingTotalPrice + shippingCost}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    border: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderBottom: 1,
    borderColor: 'grey',
  },
  headerBrand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 35,
    width: 35,
    marginBottom: 10,
    marginRight: 5,
  },
  body: {
    padding: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: 1,
    borderColor: 'grey',
  },
  detailSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  productsTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  amounts: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: 40,
  },
});

export default PDFfacturaComponent;
