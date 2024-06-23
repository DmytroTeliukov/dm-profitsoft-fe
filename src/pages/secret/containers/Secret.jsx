import { useIntl } from 'react-intl';
import React, {useEffect} from 'react';
import Typography from 'components/Typography';
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {Box, Container, Grid} from "@mui/material";

function Secret({onFetchProfile}) {
  // Redux state
  const { email, name } = useSelector(state => state.user);
  const { formatMessage } = useIntl();

  const navigator = useNavigate();

  useEffect(() => {
      const sessionId = Cookies.get("SESSION-ID");
      console.log(sessionId);
      if (!sessionId) {
          navigator("/login");
      } else {
          onFetchProfile();
      }

  }, [])

  return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {formatMessage({id: 'header.title.profile'})}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                {formatMessage({id: 'label.name'})}: <span>{name}</span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                {formatMessage({id: 'label.email'})}: <span>{email}</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
}

export default Secret;
