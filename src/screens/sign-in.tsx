import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import {DismissKeyboardView} from '@/components/layout';
import {RouteNames} from '@/navigation/route-names';
import {signInValidation, saveRefreshToken, isEmptyObj} from '@/utils';
import {useForm} from '@/hooks';
import {Button} from '@/components/elements';
import {setUser} from '@/slices/user';
import {useDispatch} from 'react-redux';
import {useSignInMutation} from '@/slices/api/auth';
import type {SignInScreenProps} from '@/navigation/types';
import type {ISignInReq} from '@/slices/api/auth/types';

const SignInScreen = ({navigation}: SignInScreenProps) => {
  const dispatch = useDispatch();
  const initialState = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );
  const emailRef: MutableRefObject<TextInput | null> = useRef(null);
  const passwordRef: MutableRefObject<TextInput | null> = useRef(null);

  const [signIn, {isLoading, isError}] = useSignInMutation();

  const handleSignIn = async (signInData: ISignInReq) => {
    try {
      const data = await signIn(signInData).unwrap();
      const {refreshToken, ...rest} = data;
      saveRefreshToken(refreshToken);
      dispatch(setUser(rest));
    } catch (signInError) {
      console.error('SignIn Error: ', signInError);
    }
  };

  const {values, errors, onChange, onSubmit} = useForm({
    initialValues: initialState,
    handleSubmit: handleSignIn,
    validation: signInValidation,
  });

  const toSignUp: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.signUp);
  }, [navigation]);

  const canGoNext: boolean = Object.values(values).every(value => value !== '');

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={values.email}
          onChangeText={value => onChange('email', value)}
          style={styles.textInput}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          onChangeText={value => onChange('password', value)}
          autoComplete="password"
          secureTextEntry
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
        <Text>{errors.password || ''}</Text>
        {(!isEmptyObj(errors) || isError) && (
          <Text style={styles.errorText}>
            이메일 또는 비밀번호를 잘못 입력했습니다.
          </Text>
        )}
      </View>
      <View style={styles.buttonZone}>
        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={!canGoNext}
          width={90}>
          로그인
        </Button>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: 90,
    height: 40,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: '#ff003e',
  },
});
