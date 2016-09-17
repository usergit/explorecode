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
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }

    // search user
    searchUser() {
        newRepoStore.fetch(this.username);
    }

    handleEnterKey(event){
        if (!event) event = window.event;
        var keyCode = event.keyCode || event.which;
        if (keyCode == '13'){
            newRepoStore.fetch(this.username);
            return false;
        }
    }

    filterRepoByStarCount(event) {
        let value = event.target.value;
        if (value === "") {
            value = 0;
        } // if empty value is passed make the StarCount 0

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
                    <div className="col-md-8 col-md-offset-2" >
                        <h4>Code Explorer</h4>
                        <div className="input-group">
                            <SearchField className="form-control"
                                         placeholder={"Enter Github Username e.g. john"}
                                         handleChange={this.saveUsername}
                                        handleEnterKey={this.handleEnterKey}/>
                            <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.searchUser}>Search</button>
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
                        <UserRepoList store={newRepoStore}/>
                    </div>
                </div>

                {/*<SharedFollowers/>*/}
            </div>
        )
    }
}

export default App
