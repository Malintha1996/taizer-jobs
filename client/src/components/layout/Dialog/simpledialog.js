import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DropzoneArea} from 'material-ui-dropzone'

export default function FormDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please attach the proof of your work as Screenshots 
          </DialogContentText>
          <DropzoneArea 
           onChange={props.handleChange.bind(this)}
           onSave={props.handleSave.bind(this)}
           acceptedFiles={['image/*']}
           showPreviews
           filesLimit={3}
           maxFileSize={5000000}
           showAlerts={false}
           showFileNamesInPreview
           showPreviewsInDropzone={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={props.handleSave} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}