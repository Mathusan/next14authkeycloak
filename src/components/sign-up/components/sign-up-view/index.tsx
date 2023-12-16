import Loader from 'modules/common/components/loader';
import SignUpFormView from 'modules/sign-up/components/sign-up-form';
import withAuth from 'modules/common/auth/withAuth';


import useSignUp from 'modules/sign-up/context/useSignUp';



const SignUpView = () => {

  const { loading } = useSignUp();


  return (
    <Loader loading={loading}>
      <SignUpFormView />
    </Loader>
  );
};
//

export default withAuth(SignUpView);
