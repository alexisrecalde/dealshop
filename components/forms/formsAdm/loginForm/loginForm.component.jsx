import axios from 'axios';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';

import { InputText, InputContainer, InputPasswordField } from '../../../input/input.styles';
import CustomButtonComponent from '../../../customButton/customButton.component';
import { SignFormDiv, Link } from '../signForm.styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';

import { signInUser } from '../../../../redux/user/user.actions';
import { config } from '../../../../queries/commons.queries';

const LoginForm = ({ signInUser, setOpen }) => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getReCaptchaIsValid, setReCaptchaIsValid] = useState(false);

    const url = `${publicRuntimeConfig.backend_url}/public/security/authenticate`;

    const postAuthenticate = async () => {
        try {
            const authenticateRequest = { email: getEmail, password: getPassword };
            delete config.params;
            const res = await axios.post(url, authenticateRequest, config);
            signInUser(res.data);
            setOpen(false);
            router.push('/').then(() => window.scrollTo(0, 0));
        } catch (error) {
            setOpen(false);
            if (error.response.status === 400 || error.response.status === 404) {
                Swal.fire({
                    titleText: 'Error',
                    text: 'El usuario o la contraseña son incorrectos. Ingrese las credenciales correctas para continuar.',
                    icon: 'error',
                    reverseButtons: true,
                    confirmButtonColor: '#00bcd4',
                    confirmButtonText: 'Aceptar',
                });
                setPassword('');
            } else if (error.response.status === 401) {
                router.push('/login/aprobacion').then(() => window.scrollTo(0, 0));
            } else {
                router.push('/error').then(() => window.scrollTo(0, 0));
            }
        }
    };

    function onChange(value) {
        setReCaptchaIsValid(true);
    }

    const onClickLogin = async (event) => {
        event.preventDefault();

        if (getReCaptchaIsValid) {
            setOpen(true);
            await postAuthenticate();
        } else
            Swal.fire({
                titleText: 'Error',
                text: 'Debe clickear el CAPTCHA.',
                icon: 'error',
                reverseButtons: true,
                confirmButtonColor: '#00bcd4',
                confirmButtonText: 'Aceptar',
            });
    };

    return (
        <SignFormDiv>
            <form onSubmit={onClickLogin} style={{ padding: '20px' }}>
                <h2>Ya tengo una cuenta</h2>
                <p>Use su mail y contraseña para ingresar</p>
                <InputText
                    id="emailLogin"
                    name="emailLogin"
                    label="Email"
                    type="email"
                    placeholder={getEmail}
                    onChange={() => setEmail(event.target.value)}
                    required
                    fullWidth
                />
                <InputContainer fullWidth required>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <InputPasswordField
                        id="passwordLogin"
                        name="passwordLogin"
                        label="Contraseña"
                        type="password"
                        onChange={() => setPassword(event.target.value)}
                        required
                        fullWidth
                    />
                </InputContainer>
                <ReCAPTCHA
                    style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                    sitekey={`${publicRuntimeConfig.recaptcha_key}`}
                    onChange={onChange}
                />
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                    <CustomButtonComponent onClick={onClickLogin} style={Styles.buttons}>
                        Ingresar
                    </CustomButtonComponent>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link>
                        <a href="/login/recuperarUsuario">Olvidé mi contraseña</a>
                    </Link>
                </div>
            </form>
        </SignFormDiv>
    );
};

const Styles = {
    buttons: {
        fontSize: '1em',
        padding: '10px 30px 30px',
        margin: '10px',
    },
    link: {
        color: '#fff00f',

        '& :hover': {
            color: '#00ffff',
        },
    },
};

LoginForm.propTypes = {
    signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    signInUser: (userData) => dispatch(signInUser(userData)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
