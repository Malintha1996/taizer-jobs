
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange,amber, green,deepPurple,grey} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
     dialogcontainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor:green[500],
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
      },
     dialog: {
        width: '500px',
        backgroundColor: "",
        display: 'flex',
        alignItems: 'center'
      },
      dialogForm: {
        width: '100%',
        marginBottom: 0,
        padding: '20px'
      },
    
      usernameLabel:{
        textAlign: 'left',
        fontSize: '16px'
      },
      usernameInput: {
        width: '100%'
      },
      submitBtn: {
        width: '100%'
      }
  }));
const Dialog = props => {
    const { username, handleInput, launchChat } = props;
    const  classes=makeStyles()

    return (
    <div className={classes.dialogcontainer}>
        <div className={classes.dialog}>
        <form className={classes.dialogForm} onSubmit={launchChat}>
            <label className={classes.usernameLabel} htmlFor="username">
            What is your name?
            </label>
            <input
            id="username"
            className="username-input"
            autoFocus
            type="text"
            name="userId"
            value={username}
            onChange={handleInput}
            />
            <button type="submit" className={classes.submitBtn}>
            Submit
            </button>
        </form>
        </div>
    </div>
    );
};

export default Dialog;