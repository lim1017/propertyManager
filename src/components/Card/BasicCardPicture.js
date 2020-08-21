import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardFooter from "components/Card/CardFooter.js";

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 445,
    minHeight:300
  },
  media: {
    height: 140,
  },
  description:{
    wordWrap: "break-word",
    height: "60px",
    overflow: "hidden"
  },
  bodyContent:{

  }
});

export default function MediaCard({title, img, description, id, data}) {
  const classes = useStyles();

  let picture = img ? img : "https://barrie360.com/wp-content/uploads/2019/02/missing-1-1.jpg"

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={picture}
          title="Contemplative Reptile"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      <CardFooter  >
        <Link
          to={{
            pathname: `/admin/property/${id}`,
            state: { state: { data, propertyID:id } }
          }}
        >
        <Button variant="contained" size="small" color="primary">
          Learn More
        </Button>
        </Link>

        <Link
          to={{
            pathname: `/admin/propertyprofile/${id}`,
            state: { state: { isEditing:true } }
          }}
        >
        <Button variant="contained" size="small" color="primary">
          Edit
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}