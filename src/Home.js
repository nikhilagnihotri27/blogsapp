
import React, {useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import themeImage from './theme1.jpg';
import Bloglist from './Bloglist';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${themeImage})`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  spinner: {
    display: 'flex',
    justifyContent: "center",
    position: "relative",
  }
}));

const Home = (props) => {

  const classes = useStyles();
  const [blogData, setBlogData] = useState([]);
  const [filteredBlogData, setFilteredBlogData] = useState([]);
  const [articlesFound, setArticlesFound] = useState(true);

  useEffect(() => {
    setBlogData(props.state);
    setFilteredBlogData(props.state)
  }, [props.state])

  const handleSearchBar = (e) => {
      const filteredList = blogData.filter(blog => {
         return blog.title.toLowerCase().includes(e.target.value.toLowerCase())
      })
      filteredList.length === 0 ? setArticlesFound(false) : setArticlesFound(true);
      setFilteredBlogData(filteredList);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Blogs
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange = {handleSearchBar}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>My Blog</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          {articlesFound ? "Articles" : "No Articles found"}
        </Typography>
        <Grid container spacing={3}>
            {filteredBlogData.length===0 && articlesFound === true? 
                (<div className={classes.spinner}>
                    <CircularProgress />
                </div>) :
                <Bloglist blogData={filteredBlogData} />
            }
        </Grid>
      </Container>
    </>
  );
}

export default Home;
