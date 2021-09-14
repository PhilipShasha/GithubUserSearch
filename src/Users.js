import React from "react"
import {Button, FormControl, Input, NativeSelect, Grid} from '@material-ui/core';
import List from '@material-ui/core/List';
import User from './User';
import './App.css';

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            userList: [],
        };
    }

    searchUser = (event) => {
        let sortType = document.getElementById('sortBy').value;
        let url = 'https://api.github.com/search/users?q='+ this.state.user + '+in:login' + sortType;
        fetch(url, { 
                    headers: {
                            'Accept' : 'application/vnd.github.v3+json'
                        }})
        .then(response => response.json())
        .then((data) => this.setState({userList: data.items}))
        .catch( error => console.error(error));
        
    }


    render() {
        return (
            <div>
                <br/>
                <Grid container  style={{textAlign: 'center'}}>
                    <Grid item xs={12}>
                        <FormControl id='search'>
                            <Input placeholder="Enter a user..." value ={this.state.user} onChange={event => this.setState({user: event.target.value})}></Input>
                        </FormControl>
                        <NativeSelect id="sortBy">
                            <option value="+sort:joined">Joined</option>
                            <option value="+sort:followers">Followers</option>
                            <option value="+sort:repositories">Public Repos</option>
                        </NativeSelect>
                        <Button variant="contained" type="submit" onClick={this.searchUser} style={{marginLeft: '10px'}}>Search</Button>
                    </Grid>
                </Grid>
                <List id="userlist" component="nav" aria-label="main mailbox folders">
                {this.state.userList.map((user) => (
                    <User userinfo = {user}></User>
                ))}
                </List>
                </div> 
            
        )
    }
}

export default Users