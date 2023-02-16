import React from 'react';
import Button from '@material-ui/core/Button';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

export default function page() {
    return (
        <div>
            <Button
                startIcon={< AccountBalanceIcon />}
                endIcon={< AssignmentIndIcon />}
                variant="contained"
            >
                My Frist
            </Button>
        </div>
    );
}