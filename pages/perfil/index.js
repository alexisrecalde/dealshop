import Head from "next/head";
import UserModalComponent from "../../components/table/userTable/userModal";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import { selectUser } from "../../redux/user/user.selector";
import { connect } from "react-redux";
import styled from "styled-components";

const MyProfilePage = ({ user }) => {
  const header = () => {
    return (
      <Head>
        <title>Dealshop - Mi Perfil</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Mi perfil" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };
  return (
    <Container>
      <div>
        {header()}
        <h2 className="title-compras">Mis datos</h2>
        <UserModalComponent
          user={user}
          userProfile={true}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 120px;

  @media screen and (max-width: 900px) {
    padding: 15px 20px;
  }
`;

MyProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});


export default connect(mapStateToProps, null)(MyProfilePage);
