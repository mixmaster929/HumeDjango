import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaceIcon from '@mui/icons-material/Face';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import * as React from 'react';

export default function JobSummary(summaryDetails) {

    return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant='h6'>Job Summary</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
            <Stack spacing={3} alignItems="center" direction={'row'}>
                <Chip icon={<FaceIcon />} label={`Faces Detected: ${summaryDetails.details.faces}`} />
                <Chip icon={<FaceIcon />} label={`Job Id: ${summaryDetails.details.jobId}`} />
            </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
