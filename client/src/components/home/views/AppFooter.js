import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import { deepOrange,orange,amber,cyan, blue,grey,green,deepPurple,indigo } from '@material-ui/core/colors';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: blue[200],
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  whitetext:{
    color:grey[50]
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: deepOrange[500],
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: deepOrange[100],
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
  image: {
    height: 60,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];
const Copyright=()=>{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        TaizerJobs
      {new Date().getFullYear()}
    </Typography>
  )
};
export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container justify="center">
         <Grid item  xs={12} sm={12} md={12}>
            <div  align="center">
              <Typography variant="h6" className={classes.whitetext}> Join with us to experience the digitally driven careers</Typography>
            </div>
           </Grid>
          <Grid item  xs={12} sm={12} md={12}>
            <div  align="center">
           <img
            src="/img/logo/job1.png"
            alt="graph"
            className={classes.image}
            /> 
            <Copyright/>
            </div>
           </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
