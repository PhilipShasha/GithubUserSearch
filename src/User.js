import React from "react"
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import './App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showinfo: false,
            userUrl: '',
            userImg: '',
            followers: '',
            publicrepos: '',
            name: '',
        };
    }

    getDetails = (event) => {
            this.setState({showinfo: !this.state.showinfo})

            let url = 'https://api.github.com/users/'+ this.props.userinfo.login
            fetch(url, { 
                        headers: {
                                'Accept' : 'application/vnd.github.v3+json'
                            }})
            .then(response => response.json())
            .then((data) => this.setState({userUrl: data.html_url, userImg: data.avatar_url, followers: data.followers, publicrepos: data.public_repos, name: data.name}))
            .catch( error => console.error(error));
        

    }
    componentDidUpdate(prevProps) {
        if(prevProps.userinfo.login !== this.props.userinfo.login){
            this.setState({showinfo: false})
            
        }
    }

    render() {
        return (
            <div id = 'user'>
                <ListItem key={this.props.userinfo.id} button component = {Link} to={`/users/${this.props.userinfo.login}`} id = 'testing' onClick={this.getDetails}>{this.props.userinfo.login}</ListItem>
                {this.state.showinfo && <ListItem key={this.props.userinfo.id + '_info'}>
                    <Card>
                        <img src={this.state.userImg} alt=''/>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Followers: {this.state.followers}<br/>
                            Public repositories: {this.state.publicrepos}
                        </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                            <a href={this.state.userUrl} target='_blank' rel="noreferrer" style={{textDecoration: 'none'}}><GitHubIcon style={{fontSize: '100%'}}></GitHubIcon> GITHUB</a>
                            </Button>
                        </CardActions>
                    </Card> 
                </ListItem>}
            </div>
        )
    }
}

export default User