import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';
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
  isFetchingSignIn,
  onSignIn,
}) {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.buttons}>
          <Button
            isLoading={isFetchingSignIn}
            onClick={() =>
              onSignIn()
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
