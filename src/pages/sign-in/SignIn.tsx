import * as React from 'react';
import { Button } from '@mui/material';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TrelloTextField } from 'shared/TrelloTextField';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { login, selectAuth } from 'store/slices/auth-slice';
import UnauthorizedWrapper from 'shared/unauthorized-wrapper/UnauthorizedWrapper';
import c from './sign-in.module.scss';

export function SignIn(): React.ReactElement {
  const { control, handleSubmit } = useForm<SignInForm>({ mode: 'onBlur' });
  const { isValid, errors } = useFormState({ control });
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);
  const location = useLocation();
  const from = location.state?.from ?? '/';
  const navigate = useNavigate();

  const submitHandler: SubmitHandler<SignInForm> = (data): void => {
    dispatch(login({ email: data.login, password: data.password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from);
    }
  }, [isLoggedIn]);

  return (
    <UnauthorizedWrapper>
      <form className={c.sign_in_form} onSubmit={handleSubmit(submitHandler)}>
        <div className={c.fields_wrapper}>
          <Controller
            name="login"
            control={control}
            rules={{
              required: `Обов'язкове поле`,
            }}
            render={({ field }): React.ReactElement => (
              <TrelloTextField
                className={c.text_field}
                {...field}
                label="Логін*"
                helperText={errors.login?.message}
                error={!!errors.login}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: `Обов'язкове поле`,
            }}
            render={({ field }): React.ReactElement => (
              <TrelloTextField
                className={c.text_field}
                {...field}
                label="Пароль*"
                helperText={errors.password?.message}
                error={!!errors.password}
              />
            )}
          />
        </div>
        <div className={c.controls}>
          <Button className={c.login_button} variant="contained" type="submit" disabled={!isValid}>
            Увійти
          </Button>

          <p className={c.control_item}>
            У вас ще немає аккаунта?{' '}
            <Link className={c.link} to="/sign-up">
              Зареєструватись
            </Link>
          </p>
        </div>
      </form>
    </UnauthorizedWrapper>
  );
}

interface SignInForm {
  login: string;
  password: string;
}
