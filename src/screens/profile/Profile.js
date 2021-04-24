import React, {Component} from 'react'
import Header from '../../common/header/Header';
import {Redirect} from 'react-router-dom';
import './Profile.css'
import {red} from "@material-ui/core/colors";
import {
    Avatar,
    Button,
    Card,
    CardMedia,
    CardActions,
    Container,
    Divider,
    Fab,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputLabel,
    Modal,
    TextField,
    Typography,
    Grid
} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/Edit'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_data: null,
            username: 'sbpateloffice',
            profile_picture: 'http://manage.utsavcare.com/profile.png',
            recent_media: null,
            fullName: 'Snehal Patel',
            newFullName: '',
            fullNameRequired: false,
            openFullNameEditModal: false,
            closeFullNameEditModal: true,
            openImageDetailModal: false,
            closeImageDetailModal: true,
            imageSelectedForDetails: null,
            indexImageSelectedForDetails: null,
            follows: 5,
            followedBy: 3,
            totalPost: 9,
            liked: [],
            comments: [],
            individual_media: ''
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
            //this.fetchOwnerInfo();
            //this.fetchMostRecentMedia();
        }
    }


    render() {
        if (this.props.location.state === undefined) {
            return <Redirect to='/'/>
        } else if (this.props.location.state.loginSuccess === true) {
            return <div>
                <Header {...this.props} isLoggedIn={true} showSearchBox={false}
                        profilePictureUrl={this.state.profile_picture} showMyAccount={false}/>
                <Container>
                    <div style={{height: 32}}></div>
                    <Grid container spacing={3} justify="flex-start">
                        <Grid item xs={2}/>
                        <Grid item xs={2}>
                            {this.state.profile_picture ? (
                                <Avatar
                                    alt='profile_pic'
                                    id="profile-pic"
                                    variant="circular"
                                    src={this.state.profile_picture}
                                    style={{marginTop: 10}}
                                />
                            ) : null}
                        </Grid>
                        <Grid item xs={5} id='user_name'>
                            <Typography variant="h4" component="h1" style={{marginBottom: 5}}>
                                {this.state.username}
                            </Typography>
                            <Grid container spacing={3} justify="center">
                                <Grid item xs={4}>
                                    Posts:{" "}
                                    {this.state.totalPost}
                                </Grid>
                                <Grid item xs={4}>
                                    Follows:{" "}
                                    {this.state.follows}
                                </Grid>
                                <Grid item xs={4}>
                                    Followed By:{" "}
                                    {this.state.followedBy}
                                </Grid>
                            </Grid>
                            <Typography variant="h6" component="h2" style={{marginTop: 5}}>
                                {this.state.fullName ? this.state.fullName : null}
                                {this.state.user_data && !this.state.fullName
                                    ? this.state.user_data.full_name
                                    : null}
                                <Fab
                                    color="secondary"
                                    id="edit-profile"
                                    aria-label="edit"
                                    onClick={this.openEditFullNameModal}
                                >
                                    <EditIcon fontSize="small"/>
                                </Fab>
                            </Typography>

                            <Modal
                                open={this.state.openFullNameEditModal}
                                onClose={this.closeEditFullNameModal}
                            >
                                <div className="edit-modal-div">
                                    <h2>Edit</h2>
                                    <FormControl required>
                                        <InputLabel htmlFor="fullName">Full Name</InputLabel>
                                        <Input id="fullName" type="text" onChange={this.onChangeEditFullName}/>
                                        {this.state.fullNameRequired ? <FormHelperText>
                                            <span style={{color: "red"}}>required</span>
                                        </FormHelperText> : null}
                                    </FormControl>
                                    <div style={{marginTop: 15}}>
                                        <Button variant="contained" color="primary"
                                                onClick={this.onUpdateFullName}>UPDATE</Button>
                                    </div>
                                </div>
                            </Modal>

                        </Grid>
                        <Grid item xs={4}/>
                    </Grid>
                </Container>
                <Container>
                    <Grid container spacing={0} direction="row" alignItems="center">
                        {this.state.recent_media &&
                        this.state.recent_media.map((details, index) => (
                            <Grid
                                item
                                xs={4}
                                key={details.id}
                                onClick={() => this.onImageClickForDetails(details, index)}>
                                
                                <Card variant="outlined">
                                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                                               image={details.media_url}
                                               title={details.id}/>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Modal open={this.state.openImageDetailModal} onClose={this.closeImageDetailsModal}>
                        <div className="selected-image-modal">
                            <Grid container spacing={2} direction="row" justify="center" alignItems='flex-start'>
                                <Grid item xs={6}>
                                    {this.state.imageSelectedForDetails ? (
                                        <img alt={this.state.imageSelectedForDetails.images.id}
                                             src={this.state.imageSelectedForDetails.images.standard_resolution.url}
                                             style={{height: "100%",width: "100%"}}/>
                                    ) : null}
                                </Grid>
                                <Grid item xs={6}>
                                    {this.state.imageSelectedForDetails ? (
                                            <div className='right-part'>
                                                <div className='upper-part'>
                                                    <Grid className="user-detail-section" container spacing={1}
                                                          direction="row" style={{marginBottom:5}}>
                                                        <Grid item xs={2}>
                                                            <Avatar id='modal-profile-pic'
                                                                    alt={this.state.imageSelectedForDetails.user.full_name}
                                                                    src={this.state.imageSelectedForDetails.user.profile_picture}
                                                            />
                                                        </Grid>{" "}
                                                        <Grid item xs={10}>
                                                            <Typography style={{paddingTop: 20, paddingLeft: 10}}>
                                                                {this.state.imageSelectedForDetails.user.username}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider className='divider' variant="fullWidth"/>
                                                    <Typography style={{marginTop:5}}>
                                                        {this.state.imageSelectedForDetails.caption.text.split("\n")[0]}
                                                    </Typography>
                                                    <Typography>
                                                        {this.state.imageSelectedForDetails.tags.map((tag, index) => (
                                                            <span style={{color: "blue"}}
                                                                  key={index}>{'#' + tag + ' '}</span>
                                                        ))}
                                                    </Typography>
                                                    <Typography component="div" className="comment-section">
                                                        {this.state.comments &&
                                                        this.state.comments[this.state.indexImageSelectedForDetails] &&
                                                        this.state.comments[this.state.indexImageSelectedForDetails].length > 0 &&
                                                        this.state.comments[this.state.indexImageSelectedForDetails].map(comment => {
                                                            return (
                                                                <p style={{fontSize: 16}} key={comment}>
                                                                    <b>{this.state.imageSelectedForDetails.user.username}:</b> {comment}
                                                                </p>
                                                            );
                                                        })}
                                                    </Typography>
                                                </div>
                                                <div className='lower-part'>
                                                    <CardActions disableSpacing>
                                                        <IconButton onClick={() => this.onLikeSelectedImage()}>
                                                            {this.state.liked[this.state.indexImageSelectedForDetails] ?
                                                                <FavoriteIcon style={{color: red[500]}}/>
                                                                :
                                                                <FavoriteBorderIcon/>}
                                                        </IconButton>
                                                        <span>{this.state.liked[this.state.indexImageSelectedForDetails] ? this.state.imageSelectedForDetails.likes.count + 1 : this.state.imageSelectedForDetails.likes.count} likes</span>
                                                    </CardActions>
                                                    <Grid className="comment-add-section" container spacing={3}
                                                          alignItems='flex-end'>
                                                        <Grid item xs={10}>
                                                            <TextField id="add-user-comment-image"
                                                                       className="add-comment-text-field"
                                                                       label="Add a comment"
                                                                       fullWidth={true}/>
                                                        </Grid>
                                                        <Grid item xs={2} className="add-button-grid">
                                                            <Button className="add-button"
                                                                    variant="contained"
                                                                    id="add-comments-button"
                                                                    color="primary"
                                                                    onClick={() => this.onAddCommentSelectedImage()}>Add</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </div>
                    </Modal>
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
                    recent_media: JSON.parse(this.responseText).data
                });
                //that.photoURL();
            }
        });

        let url = "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token");
        xhr.open("GET", url);
        xhr.send(data);
    }
/*
    photoURL() {
        const data = this.state.recent_media;
        var data1;
        var mid='';
        let that = this;
        let medUrl='';
        var count=-1;
        var marr1=[];
        for (var id in data) {
            if (data.hasOwnProperty(id)) {
                mid = data[id]["id"];
                var url = "https://graph.instagram.com/"+mid+"?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");
                //console.log(id);
                $.get(url, function(dataNew) {
                    medUrl = dataNew["media_url"];
                    //data[id]["media_urln"] = medUrl;
                    //var req = { "term" : "s" };
                    count++;
                    //console.log(count);
                    marr1[count]=medUrl;
                    data1 = dataNew;              
                    //alert( "Media URLS: " + data[id]["media_urln"] );
                });
                //console.log(marr1);
            }
        }
        that.setState({
            recent_media: data1
            //filtered_media: data
            //marr : marr1
        });
        //window.$murl = marr1;
        //console.log(data);
        

        //console.log(this.state.filtered_media);
    }
*/
/*
    fetchMediaURL = (mid) => {
        var url = "https://graph.instagram.com/"+mid+"?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");
        var xhr = new XMLHttpRequest();
        let that = this;
        xhr.open("GET", url);

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //console.log(xhr.status);
            //console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            console.log(data["media_url"]);
            //return data["media_url"];
            that.setState({'individual_media': data["media_url"]});
            
        }};

        xhr.send();

    }

    onChangeEditFullName = (e) => {
        if (e.target.value === '') {
            this.setState({newFullName: e.target.value, fullNameRequired: true})
        } else {
            this.setState({newFullName: e.target.value, fullNameRequired: false})
        }
    }
*/
    onUpdateFullName = () => {
        if (this.state.newFullName == null || this.state.newFullName.trim() === "") {
            this.setState({
                fullNameRequired: true
            })
        } else {
            this.setState({
                fullName: this.state.newFullName,
                fullNameRequired: false,
                newFullName: ''
            })

            this.closeEditFullNameModal();
        }

    }

    openEditFullNameModal = () => {
        this.setState({openFullNameEditModal: true, closeFullNameEditModal: false})
    }

    closeEditFullNameModal = () => {
        this.setState({openFullNameEditModal: false, closeFullNameEditModal: true})
    }

    onImageClickForDetails = (image, index) => {
        this.setState({imageSelectedForDetails: image, indexImageSelectedForDetails: index})
        this.openImageDetailsModal()
    }

    openImageDetailsModal = () => {
        this.setState({openImageDetailModal: true, closeImageDetailModal: false})
    }

    closeImageDetailsModal = () => {
        this.setState({openImageDetailModal: false, closeImageDetailModal: true})
    }

    onLikeSelectedImage = () => {
        let index = this.state.indexImageSelectedForDetails;
        let l = this.state.liked;
        l[index] = !l[index];
        this.setState({liked: l})
    }

    onAddCommentSelectedImage = () => {
        let index = this.state.indexImageSelectedForDetails;
        var textbox = document.getElementById("add-user-comment-image");
        if (textbox.value == null || textbox.value.trim() === "") {
            return;
        }
        let c = this.state.comments;
        if (c[index] == null) {
            c[index] = [textbox.value];
        } else {
            c[index] = c[index].concat([textbox.value]);
        }
        this.setState({
            comments: c,
        })
        textbox.value = '';
    }
}

export default Profile;