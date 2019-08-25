import React from 'react';
import {getList, Search} from '../api/index';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchComponent from '../components/search'
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import MenuIcons from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from 'react-bootstrap/Pagination'


const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

export class Museum extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            list: null,
            search: 0,
            types: [
                '',
                'otherTerms',
                'schilderij'
            ],
            currentType: '',
            open: false,
            count: null,
            activePage: 1,
            pageSize: 10
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    createPagination(count) {
        const arr = [];
        for(let i =0; i < count; i++) {
            arr.push(i+1)
        }
        return arr;
    }
    componentDidMount() {
        console.log(getList().then(museum => {
            this.setState({
                list: museum.userSet.setItems,
                count: this.createPagination(museum.userSet.count)
            });
            console.log(this.state)

        }));
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [ name ]: value,
        });
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    submitForm(e) {
        e.preventDefault();

        const {search, currentType, currentIndex, pageSize} = this.state;
       console.log(this.state)
        Search(search, currentType, currentIndex, pageSize)
            .then((museum) => {
                debugger
                this.setState({
                    list: museum.userSet.setItems
                })
            })
    }

    paginationChange(e) {
        const currentIndex = Number(e.currentTarget.innerHTML);
        const {search, currentType, pageSize} = this.state;
        this.setState({activePage:  currentIndex});
        Search(search, currentType, currentIndex, pageSize)
            .then((museum) => {
                debugger
                this.setState({
                    list: museum.userSet.setItems
                })
            })
    }


    render() {
        const {classes}=this.props;
        const {list, search, types, currentType, open, count, activePage}=this.state;
        return (
            <React.Fragment>
                    <CssBaseline />
                    <AppBar position="relative">
                        <Toolbar>
                            <CameraIcon className={classes.icon} />
                            <Typography variant="h6" color="inherit" noWrap>
                                Album layout
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>

                        <form className={classes.form} onSubmit={ (e) => this.submitForm(e) }>
                            <Paper className={classes.root}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <Select
                                        open={open}
                                        onClose={this.handleClose}
                                        onOpen={this.handleOpen}
                                        value={currentType}
                                        onChange={ (e) => {
                                            this.handleChange(e)
                                        } }
                                        name="type"
                                        inputProps={{
                                            name: 'currentType',
                                            id: 'demo-controlled-open-select',
                                        }}
                                    >
                                        {types && types.map((item, index) => (
                                            <MenuItem key={index} name="currentType" value={item}>{item}</MenuItem>

                                        ))}
                                    </Select>
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Google Maps"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    value={ search }
                                    name="search"
                                    onChange={ (e) => {
                                        this.handleChange(e)
                                    } }
                                />
                                <IconButton className={classes.iconButton} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider className={classes.divider} orientation="vertical" />
                                <Button color="primary"
                                            type="submit"
                                            className={classes.iconButton}
                                            aria-label="directions">
                                    <DirectionsIcon />
                                </Button>
                            </Paper>
                        </form>


                        {/* Hero unit */}
                        <Container className={classes.cardGrid} maxWidth="md">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {list && list.map((card, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            { card.image && card.image.cdnUrl &&
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={card.image.cdnUrl}
                                                    title={card.relationDescription}
                                                />
                                            }

                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {card.relationDescription}
                                                </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the content.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    View
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Edit
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                        {count &&
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                {count.map((itm, index) =>(
                                    <Pagination.Item key={index +1}
                                     active={index + 1 === activePage}
                                     onClick={ (e) => {
                                         this.paginationChange(e)
                                     } }
                                    >
                                        {index +1}
                                    </Pagination.Item>
                                ))

                                }
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        }

                    </main>
                    {/* Footer */}
                    <footer className={classes.footer}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            Something here to give the footer a purpose!
                        </Typography>
                    </footer>
                    {/* End footer */}
                </React.Fragment>
        );
    }


}
Museum.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default(
    withStyles(styles, {
        name: 'AppFrame',
    })
)(Museum);
