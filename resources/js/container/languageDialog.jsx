import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const LangDialog = (props) => {
    const {langDialogOpen, handleLangClose} = props;

    return (
        <Dialog open={langDialogOpen} onClose={() => handleLangClose()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Language Setting</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="position" name="position">
                            <FormControlLabel
                            value="hk"
                            control={<Radio color="primary" />}
                            label="Traditional Chinese (Hong Kong)"
                            labelPlacement="end"
                            />

                            <FormControlLabel
                            value="eng"
                            control={<Radio color="primary" />}
                            label="English"
                            labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleLangClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLangClose} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LangDialog;