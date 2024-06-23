import { useIntl } from 'react-intl';
import React, {useEffect} from 'react';
import Typography from 'components/Typography';
import Cookies from "js-cookie";

function Default() {
  const { formatMessage } = useIntl();

  useEffect(() => {
    const sessionId = Cookies.get("SESSION-ID");
    console.log(sessionId);
  }, []);

  return (
    <Typography>
      {formatMessage({ id: 'title' })}
    </Typography>
  );
}

export default Default;
