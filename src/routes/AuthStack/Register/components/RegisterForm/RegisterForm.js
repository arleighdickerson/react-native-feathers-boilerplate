import React from 'react';

// components
import { View } from 'react-native';
import { Field } from 'redux-form/immutable';
import TextInput from '../../../../../components/TextInput';

const RegisterForm = function () {
  return (
    <View>
      <Field component={ TextInput }
        name='name'
        placeholder='Name'
        required />

      <Field component={ TextInput }
        name='email'
        placeholder='Email'
        autoCapitalize='none'
        required />

      <Field component={ TextInput }
        name='password'
        placeholder='Password'
        autoCapitalize='none'
        secureTextEntry
        required />
    </View>
  );
};

export default RegisterForm;
