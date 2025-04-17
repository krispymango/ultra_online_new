import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({title,description,render,img,img_url,onClick}) {
  return (
    <div onClick={onClick}>
    <Card sx={{ maxWidth: 545 }}>
      <CardActionArea>
      { img ?<CardMedia
          component="img"
          height="140"
          image={img_url}
        /> : null}
        {render}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
