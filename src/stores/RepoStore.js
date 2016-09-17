import {observable, computed, reaction, useStrict, action} from 'mobx';
import uniqueId from 'lodash/uniqueId';
import axios from 'axios';

useStrict(true); // explicit state modification

class RepoStore {
    constructor() {
        const DEFAULT_USER = "usergit";
        action(this.fetch(DEFAULT_USER));
    }

    // data that is fetched from github will be stored here
    @observable userInfo = {
        avatar  : null,
        username: null,
        repos   : [] // this would store the array of repos of the user
    };

    @observable starCount = 0; // the user filter term will be stored here

    @computed get filteredRepos() {
        return this.userInfo.repos.filter(repo => repo.stargazers_count >= this.starCount)
    }

    // used to compute the relative size of the indivdual bar charts
    // repo.stargazers_count * 100)/props.store.largestStarCount
    @computed get largestStarCount(){
        function sortNumbersDescending(a, b) {
            return b-a;
        }

        let repoSize = this.userInfo.repos.map(repo => repo.stargazers_count);
        return repoSize.sort(sortNumbersDescending)[0];
    }

    // count of user repos
    @computed get repoCount(){
        return this.userInfo.repos.map(repo => repo).length;
    }

    //stores the loading status of the repos, has 3 states {null, loading..., errorMessage}
    @observable loadStatus = null;

    // actions have transactions also they can have names that show up on mobxdevtools
    @action("set star count") // github watcher size
    setStarCount(size) {
        this.starCount = size;
    }

    @action("fetch github repos")
    fetch(username) {
        this.loadStatus = "loading...";

        axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
            .then(action(response => {
                this.userInfo.avatar   = response.data[0].owner.avatar_url;
                this.userInfo.username = response.data[0].owner.login;
                this.userInfo.repos    = response.data;
                this.loadStatus = null; // everything is loaded so turn load status to null
            }))
            .catch(action(error => {
                if (error.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.loadStatus = `${error.response.data.message} ${error.response.status}` ;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    this.loadStatus = `Error ${error.message}`
                }
            }));
    }

}

export default RepoStore;


