import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { List, ListItemAvatar,ListItem,ListItemText } from '@material-ui/core';
import { deepOrange,orange,amber, green,deepPurple,indigo } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  orangetext:{
    color:green[500]
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
});

function Performance(props) {
  const { classes } = props;
  const TopFive=()=>props.homeDetails.topFive.map((user,index) => {
    return (
        <ListItem>
        <ListItemAvatar>
        <Avatar src={user.profile} className={classes.greenAvatar}>
         </Avatar>
        </ListItemAvatar>
       < ListItemText primary={<Typography component="h5" variant="h6">{user.name}</Typography>}  />
       <ListItemAvatar>
        <Avatar className={classes.orangeAvatar}>
            {user.tasks}
        </Avatar>
       </ListItemAvatar>
       </ListItem>
  )})
  console.log(props.homeDetails.topFive)
  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Our top performers 
      </Typography>
      <List>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <TopFive/>
       </Grid>
      </Grid>
      </List>
     <Grid container justify="center">
        <Grid item xs={12} md={4} sm={4}>
            <div className={classes.item}>
            <img
                src="/img/employee.svg"
                alt="graph"
                className={classes.image}
            />
            <Typography variant="h5" align="center">
            {props.homeDetails.numberOfReviewers}
            {' active reviewers'}
            </Typography>
            </div>
         </Grid>
         <Grid item xs={12} md={4} sm={4}>
            <div className={classes.item}>
            <img
                src="/img/approval.svg"
                alt="graph"
                className={classes.image}
            />
            <Typography variant="h5" align="center">
            {props.homeDetails.numberOfTasksCompleted}
            {' tasks are completed'}
            </Typography>
            </div>
         </Grid>
       <Grid item xs={12} md={4} sm={4}>
            <div className={classes.item}>
            <img
                src="/img/pay.svg"
                alt="graph"
                className={classes.image}
            />
            <Typography variant="h5" align="center">
            {props.homeDetails.numberOfPointsDistributed}
            {' points are distributed'}
            </Typography>
            </div>
        </Grid>
     </Grid>

    </Container>
  );
}

Performance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Performance);
