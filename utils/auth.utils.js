import { useSelector } from 'react-redux';

import Error from '../pages/404';

export const roles = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    VENDEDOR: 3,
    DEPOSITO: 4,
    REPARTIDOR: 5,
};

const withAuth = (Component, roles) => {
    const Auth = (props) => {
        const userType = useSelector(({ user }) => user.userType);

        if (!roles.includes(userType)) {
            return <Error />;
        }

        return <Component {...props} />;
    };

    return Auth;
};

export default withAuth;
