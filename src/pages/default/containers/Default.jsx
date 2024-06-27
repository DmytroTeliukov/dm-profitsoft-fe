import { useIntl } from 'react-intl';
import Typography from 'components/Typography';

function Default() {
  const { formatMessage } = useIntl();
  return (
    <Typography>
      {formatMessage({ id: 'title' })}
    </Typography>
  );
}

export default Default;
