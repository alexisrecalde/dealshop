import NumberFormat from 'react-number-format';

export const CurrencyInput = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            onChange={onChange}
            getInputRef={inputRef}
            thousandSeparator={true}
            fixedDecimalScale={true}
            decimalScale={2}
            isNumericString
        />
    );
};

export const CurrencyText = ({ value, ...props }) => {
    return (
        <NumberFormat
            {...props}
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            fixedDecimalScale={true}
            decimalScale={2}
            prefix={'$'}
        />
    );
};
