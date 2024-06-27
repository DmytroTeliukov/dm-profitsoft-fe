import { useIntl } from 'react-intl';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Avatar, Box, Container, Grid, Paper, Typography} from "@mui/material";

function Secret({onFetchProfile}) {
  // Redux state
  const { email, name } = useSelector(state => state.user);
  const { formatMessage } = useIntl();


  useEffect(() => {
      onFetchProfile();
  }, [])

  return (
      <Container>
          <Typography variant="h4" component="h1" gutterBottom>
              {formatMessage({ id: 'header.title.profile' })}
          </Typography>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                  <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} md={4}>
                          <Avatar sx={{ width: 100, height: 100, mx: 'auto' }}>
                              {name.charAt(0)}
                          </Avatar>
                      </Grid>
                      <Grid item xs={12} md={8}>
                          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                              {formatMessage({ id: 'label.name' })}: <span>{name}</span>
                          </Typography>
                          <Typography variant="h6" component="div">
                              {formatMessage({ id: 'label.email' })}: <span>{email}</span>
                          </Typography>
                      </Grid>
                  </Grid>
              </Paper>
          </Box>
      </Container>
  );
}

export default Secret;
