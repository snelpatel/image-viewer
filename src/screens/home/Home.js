import React, {Component} from 'react';
import Header from "../../common/header/Header";
import './Home.css'
import {Redirect} from 'react-router-dom';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Divider,
    FormControl,
    Grid,
    TextField, Typography
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {red} from '@material-ui/core/colors';
class Home extends Component {

    constructor() {
        super();
        this.state = {
            profile_picture: 'http://manage.utsavcare.com/profile.png',
            recent_media: null,
            filtered_media: null,
            individual_media: '',
            likes: [],
            comments: [],
            searchText: ''
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
           // this.fetchOwnerInfo();
            this.fetchMostRecentMedia();
        }
    }

    render() {
        if (this.props.location.state === undefined) {
            return <Redirect to='/'/>
        }
        if (this.props.location.state.loginSuccess === true) {
            return <div>
                <div><Header {...this.props} isLoggedIn={true} showSearchBox={true}
                             profilePictureUrl={this.state.profile_picture}
                             onSearch={this.onSearch} showMyAccount={true}/></div>
                <Container className='posts-card-container'>
                    <Grid container spacing={2} alignContent='center' justify='flex-start' direction='row'>
                        {
                            (this.state.filtered_media || []).map((details, index) => (
                                <Grid item xs={6} key={details.id}>
                                    <Card key={details.id + '_card'}>
                                        <CardHeader
                                            avatar={<Avatar variant="circle" src="http://manage.utsavcare.com/profile.png" className='avatar'/>}
                                            title={details.id}
                                            subheader={new Date(details.timestamp).toLocaleString()}/>
                                            <div style={{display: "none"}}>{this.fetchMediaURL(details.id)}</div>
                                        <CardMedia style={{height: 0, paddingTop: '56.25%', marginBottom: 5}}
                                                   image={this.state.individual_media}/>
                                                   
                                        <Divider variant="middle" className='divider'/>
                                        <CardContent>
                                            <div
                                                className='post-caption'>{details.username}</div>

                                            <div className='post-tags'>
                                                snelpatel
                                            </div>
                                            <br/>
                                            <div className='likes'>
                                                {
                                                    this.state.likes[index] ?
                                                        <FavoriteIcon fontSize='default' style={{color: red[500]}}
                                                                      onClick={() => this.onFavIconClick(index)}/>
                                                        :
                                                        <FavoriteBorderIcon fontSize='default'
                                                                            onClick={() => this.onFavIconClick(index)}/>
                                                }

                                                <pre> </pre>
                                                <Typography>
                                                    <span>{this.state.likes[index] ? 1 + 1 + ' likes' : 2 + ' likes'}</span>
                                                </Typography>
                                            </div>

                                            <div id='all-comments'>
                                                {
                                                    this.state.comments[index] ?
                                                        (this.state.comments)[index].map((comment, index) => (
                                                            <p key={index}>
                                                                <b>{details.user.username}</b> : {comment}
                                                            </p>
                                                        ))
                                                        :
                                                        <p></p>
                                                }
                                            </div>

                                            <div className='post-comment'>
                                                <FormControl className='post-comment-form-control'>
                                                    <TextField id={'textfield-' + index} label="Add a comment"/>
                                                </FormControl>
                                                <div className='add-button'>
                                                    <FormControl>
                                                        <Button variant='contained' color='primary'
                                                                onClick={() => this.onAddComment(index)}>ADD</Button>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </div>
        }
    }

    fetchMostRecentMedia = () => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    recent_media: JSON.parse(this.responseText).data,
                    filtered_media: JSON.parse(this.responseText).data
                });
            }
        });

        let url = "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        xhr.open("GET", url);
        xhr.send(data);
    }

    onFavIconClick = (index) => {
        let currentLikes = this.state.likes;
        currentLikes[index] = !currentLikes[index];
        this.setState({'likes': currentLikes})
    }

    

    onAddComment = (index) => {
        var textfield = document.getElementById("textfield-" + index);
        if (textfield.value == null || textfield.value.trim() === "") {
            return;
        }
        let currentComment = this.state.comments;
        if (currentComment[index] === undefined) {
            currentComment[index] = [textfield.value];
        } else {
            currentComment[index] = currentComment[index].concat([textfield.value]);
        }

        textfield.value = '';

        this.setState({'comments': currentComment})
    }

    fetchMediaURL = (mid) => {
        var url = "https://graph.instagram.com/"+mid+"?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //console.log(xhr.status);
            //console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            console.log(data["media_url"]);
            //return data["media_url"];
            this.setState({'individual_media': data["media_url"]})
        }};

        xhr.send();

    }

    onSearch = (e) => {
        this.setState({'searchText': e.target.value})
        if (this.state.searchText == null || this.state.searchText.trim() === "") {
            this.setState({filtered_media: this.state.recent_media});
        } else {
            let filteredRecentMedia = this.state.recent_media.filter((element) => {
                return element.caption.text.toUpperCase().split("\n")[0].indexOf(e.target.value.toUpperCase()) > -1
            });
            this.setState({filtered_media: filteredRecentMedia});
        }
    }

}

export default Home;