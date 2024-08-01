import React, {MutableRefObject, useCallback, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DismissKeyboardView from '@/components/layout/dismiss-keyboard-view';
import {useSignUpUser} from '@/api/auth';
import {RouteNames} from '@/navigation/route-names';
import {signUpValidation, saveRefreshToken} from '@/utils';
import {useForm} from '@/hooks';
import type {SignUpScreenProps} from '@/navigation/types';
import type {ISignUpReq} from '@/api/auth/types';
import {setUser} from '@/slices/user';

const SignUp = ({navigation}: SignUpScreenProps) => {
  const initialState = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  const emailRef: MutableRefObject<TextInput | null> = useRef(null);
  const passwordRef: MutableRefObject<TextInput | null> = useRef(null);

  const {mutate: signUpUser, isPending} = useSignUpUser({
    onSuccess: async data => {
      const {refreshToken, ...rest} = data;
      saveRefreshToken(refreshToken);
      setUser(rest);
    },
    onError: signUpError => {
      console.error('SignUp Error: ', signUpError);
    },
  });

  const handleSubmit = useCallback(
    (values: ISignUpReq) => {
      signUpUser(values);
    },
    [signUpUser],
  );

  const {values, errors, onChange, onSubmit} = useForm({
    initialValues: initialState,
    handleSubmit,
    validation: signUpValidation,
  });

  const toSignIn: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.signIn);
  }, [navigation]);

  const canGoNext: boolean = Object.values(values).every(value => value !== '');

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: string) => onChange('email', text)}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={values.email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.errorText}>{errors.email || ''}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={(text: string) => onChange('password', text)}
          value={values.password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
        <Text style={styles.errorText}>{errors.password || ''}</Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext} // !canGoNext || loading
          onPress={onSubmit}>
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>회원가입</Text>
          )}
        </Pressable>
        <Pressable onPress={toSignIn}>
          <Text>로그인하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
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
    marginBottom: 10,
    width: 100,
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
