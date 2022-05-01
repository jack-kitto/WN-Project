import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard(props) {
  return (
    <Card sx={{ width: 275  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.title}
        </Typography>
        <Typography sx={{ fontSize: 50 }} variant="h5" component="div">
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
