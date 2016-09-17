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
    }

    // search user
    searchUser() {
        newRepoStore.fetch(this.username);
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
            <div>
                <DevTools/>
                <p>Github Explorer</p>
                <SearchField placeholder={"Enter Github Username e.g. john"} handleChange={this.saveUsername}/>
                <button onClick={this.searchUser}>Search</button>
                <p>{newRepoStore.loadStatus}</p>

                <SearchField type="number"
                             min={0}
                             placeholder={"Star Count"}
                             handleChange={this.filterRepoByStarCount}/>

                <UserInfo username={newRepoStore.userInfo.username} avatar={newRepoStore.userInfo.avatar}/>
                <UserRepoList store={newRepoStore}/>

                {/*<SharedFollowers/>*/}
            </div>
        )
    }
}

export default App
