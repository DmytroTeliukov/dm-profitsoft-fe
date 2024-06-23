import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';

const getClasses = createUseStyles((theme) => ({
  buttons: {
    display: 'flex',
    gap: `${theme.spacing(1)}px`,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
    width: '300px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));

function Login({
  isAutoSignInAfterSignUp = true,
  isFailedSignUp,
  isFetchingSignIn,
  isFetchingSignUp,
  onSignIn,
}) {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const [state, setState] = useState({
    emailOrLogin: '',
    externalErrors: [],
    password: '',
    isShowPassword: false,
    isSignUpDialogOpened: false,
    signInValidationErrors: [],
    signUpEmail: '',
    signUpFirstName: '',
    signUpLastName: '',
    signUpLogin: '',
    signUpPassword: '',
    signUpPasswordConfirm: '',
    signUpValidationErrors: [],
  });

  const onCancelSignUp = () => setState({
    ...state,
    externalErrors: [],
    signUpEmail: '',
    signUpFirstName: '',
    signUpLastName: '',
    signUpLogin: '',
    signUpPassword: '',
    signUpPasswordConfirm: '',
    signUpValidationErrors: [],
    isSignUpDialogOpened: false,
  });


  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.buttons}>
          <Button
            isLoading={isFetchingSignIn}
            onClick={() =>
              window.location.href = `http://localhost:2035/oauth/authenticate`
            }
            variant="primary"
          >
            <Typography color="inherit">
              <strong>
                {formatMessage({ id: 'signInWithGoogle' })}
              </strong>
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
