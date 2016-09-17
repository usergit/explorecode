import React from 'react'

// mobx import
import DevTools from 'mobx-react-devtools'
import {observer} from 'mobx-react';
import RepoStore from './stores/RepoStore';

// components import
import SearchField from './components/SearchField';
import UserInfo from './components/UserInfo';
import UserRepoList from './components/UserRepoList';


// create the store
const newRepoStore = new RepoStore();

@observer
class App extends React.Component {
    constructor() {
        super();

        // holds username value, declared here to avoid putting it in the state, as state change will re-render
        this.username = null;

        // binding
        this.searchUser            = this.searchUser.bind(this);
        this.filterRepoByStarCount = this.filterRepoByStarCount.bind(this);
        this.saveUsername          = this.saveUsername.bind(this);
        this.handleKeyDown         = this.handleKeyDown.bind(this);
        this.commonFollowers       = this.commonFollowers.bind(this);

        this.state = {
            multipleUsername    : false,
        }
    }


    setUsers() {
        if (this.username) {
            let removedSpaces = this.username.replace(/ /g, "");
            let usernameArr   = removedSpaces.split(",");

            if (usernameArr.length > 1) { // if  multiple users on input field, store usernames list
                this.setState({multipleUsername: true});
                this.multipleUsernameList = usernameArr;
            } else { // 0 or 1 users on input field, don't store userenames list, empty stored multiple usernames list
                this.setState({multipleUsername: false});
                this.multipleUsernameList = null;
            }
        }
    }

    commonFollowers() {
        newRepoStore.getCommonFollowers(this.multipleUsernameList)
    }

    // search user
    searchUser() {
        newRepoStore.fetchRepo(this.username);
    }

    handleKeyDown(event) {
        this.setUsers(); // get all users

        if (!event) event = window.event;
        var keyCode = event.keyCode || event.which;

        // if enter is pressed and input field has only one username
        if (keyCode == '13' && !this.state.multipleUsername) {
            newRepoStore.fetchRepo(this.username);
            return false;
        } else if (keyCode == '13' && this.state.multipleUsername) { // if enter is pressed and input field has multiple usernames
            this.commonFollowers()
        }
    }

    filterRepoByStarCount(event) {
        let value = event.target.value;
        if (value === "") { // if empty value is passed make the StarCount 0
            value = 0;
        }

        newRepoStore.setStarCount(parseInt(value));
    }

    saveUsername(event) {
        this.username = event.target.value;
    }

    render() {
        return (
            <div className="container">
                <DevTools/>

                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h4>Code Explorer</h4>
                        <div className="input-group">
                            <SearchField className="form-control"
                                         placeholder={"Type github username e.g. john or john, david to compare followers"}
                                         handleChange={this.saveUsername}
                                         handleKeyDown={this.handleKeyDown}/>
                            <span className="input-group-btn">
                                {this.state.multipleUsername ? (<button className="btn btn-success" type="button"
                                                                        onClick={this.commonFollowers}>Common
                                    Followers</button>) : <button className="btn btn-primary" type="button"
                                                                  onClick={this.searchUser}>Search</button>
                                }
                        </span>
                        </div>
                    </div>
                    <div className="col-md-2"><h5>{newRepoStore.loadStatus}</h5></div>
                </div>

                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <SearchField type="number"
                                     min={0}
                                     placeholder={"Filter By Star Count"}
                                     handleChange={this.filterRepoByStarCount}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <UserInfo username={newRepoStore.userInfo.username}
                                  avatar={newRepoStore.userInfo.avatar}
                                  repoCount={newRepoStore.repoCount}/>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="well well-sm"><h6><strong>Common Followers: </strong>{newRepoStore.commonFollowers}</h6></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <UserRepoList store={newRepoStore}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
