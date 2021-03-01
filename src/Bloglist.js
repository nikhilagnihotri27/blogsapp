import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    blogBody : {
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        height: '4rem'
    }
}));

const GetBlogs = (blogData) => {

    const classes = useStyles();
    const blogs = [];
    blogData.forEach(blog => {
        blogs.push(
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Link to={{ pathname: `/${blog._id}`, }}>      
                    <Card className={classes.card} id={blog._id} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={blog.thumb}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {blog.title}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    color="textSecondary" 
                                    component="p" 
                                    className={classes.blogBody}
                                >
                                    {blog.metadescription}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </Grid>
        )
    })

    return blogs;
}

const Bloglist = (props) => {
    const blogData = props.blogData;
    return(
        <>
            {typeof blogData !== "undefined" && blogData.length!==0 ? GetBlogs(blogData) : ""}
        </>
    )
}

export default Bloglist;