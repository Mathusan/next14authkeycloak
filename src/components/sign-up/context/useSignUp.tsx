import { useContext } from 'react';
import SignUpContext from './SignUpProvider';

const useSignUp = () => useContext(SignUpContext);

export default useSignUp;
