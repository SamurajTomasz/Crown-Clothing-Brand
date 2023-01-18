import { useState, useContext,  } from 'react';
import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase.utils';

import FormInput from '../../components/form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {SignUpContainer, ButtonsContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetForm();

        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                default:
                    console.log(error);
            }
        }
    }



    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value}); // update all fields from form Field of [name]: value
    };

    return (
        <SignUpContainer>
            <h2>Already have account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email" 
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}/>

                <FormInput 
                    label="Password"
                    type="password" 
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}/>

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;