import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PDFfacturaComponent from './pdfFactura.component';
import PDFflejeComponent from './pdfFleje.component';
import { Fragment } from 'react';

const PDFGeneratorComponent = ({ component, data }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setReady(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [data.documentsData]);

    const getDocumentName = () => {
        return data.name ? data.name : 'Documento_Dealshop.pdf';
    };

    const getDocumentComponent = () => {
        switch (data.type) {
            case 1:
                return <PDFfacturaComponent name={getDocumentName()} documentsData={data.documentsData} />;
            case 2:
                return <PDFflejeComponent name={getDocumentName()} documentsData={data.documentsData} />;
            default:
                return <PDFfacturaComponent name={getDocumentName()} documentsData={data.documentsData} />;
        }
    };

    return (
        <Fragment>
            {ready && (
                <PDFDownloadLink document={getDocumentComponent()} fileName={getDocumentName()}>
                    {({ url }) => <a href={url} target="_blank">{component}</a>}
                </PDFDownloadLink>
            )}
        </Fragment>
    );
};

export default PDFGeneratorComponent;
