import { Document, Page, View, Image, Text, StyleSheet } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';

const PDFflejeComponent = ({ name, documentsData }) => {
    const getAddress = (data) => {
        let address = 'N/A';

        if (data.clientStreet != '') {
            address = `${data.clientStreet} ${data.clientStreetNumber}`;
            address =
                address +
                `${data.clientFloor ? ' ' + data.clientFloor + '°' : ''}${
                    data.clientApartment ? ' ' + data.clientApartment : ''
                }${data.clientLocation ? ', ' + data.clientLocation : ''}${
                    data.clientProvince ? ', ' + data.clientProvince : ''
                }`;
        }

        return address;
    };

    const splitData = (data) => {
        const chunks = Math.ceil(data.length / 2);
        let newArray = [];

        for (let i = 0; i < chunks; i++) {
            const dataChunk = data.slice(i * 2, (i + 1) * 2);
            newArray.push(dataChunk);
        }
        return newArray;
    };

    return (
        <Document title={name}>
            {documentsData.map((data) => (
                <Page key={uuidv4()} size="A4" style={styles.page}>
                    <View>
                        <View key={data.id} style={styles.strip}>
                            <View style={{ width: '75%' }}>
                                <View style={styles.header}>
                                    <Image src="/img/logo_final.png" style={styles.logo} />
                                    <Text style={styles.brand}>DEALSHOP</Text>
                                </View>
                                <Text style={styles.title}>
                                    Orden #<Text>{data.id}</Text>
                                </Text>
                                <Text>Vendedor: {`${data.sellerFirstName} ${data.sellerLastName}`}</Text>
                                <Text>Cliente: {`${data.clientName}`}</Text>
                                <Text>Teléfono: {`${data.clientPhone}`}</Text>
                                <Text>Tipo de entrega: {`${data.deliveryType}`}</Text>
                                <Text>Fecha de entrega: {`${data.estimatedDeliveryDate.substr(0, 10)}`}</Text>
                                <Text>Dirección de entrega: {` ${getAddress(data)}`}</Text>
                                <View style={styles.products}>
                                    {data.products.map((p) => (
                                        <Text key={uuidv4()}>
                                            {p.qty} {p.name}
                                        </Text>
                                    ))}
                                </View>
                                <Text>Info adicional: {` ${data.additionalInfo}`}</Text>
                                <View style={styles.amounts}>
                                    <Text>Costo del envío: ${`${data.shippingCost}`}</Text>
                                    <Text>Total de la venta: ${`${data.clientSellingTotalPrice}`}</Text>
                                </View>
                            </View>
                            <Image src="/img/qr-ds.png" style={styles.qr} />
                        </View>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 7.5,
    },
    section: {
        padding: 10,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 35,
        width: 35,
        marginBottom: 10,
        marginRight: 5,
    },
    qr: {
        height: 120,
        width: 120,
        marginRight: 5,
    },
    strip: {
        marginBottom: 7.5,
        padding: 20,
        border: 1,
        borderColor: 'grey',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    amounts: {
        marginTop: 20,
    },
    products: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default PDFflejeComponent;
