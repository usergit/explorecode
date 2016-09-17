import React from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart'

// displays the list of repositories along with bar chart and star count
const UserRepoList = observer((props) => {
    return (
        <ul className="list-group">
            {props.store.filteredRepos.map(repo => {
                return (
                    <li className="list-group-item" key={repo.id} style={{paddingTop: "8px", paddingBottom: "8px"}}>
                            {repo.name} <span className="badge">{repo.stargazers_count} &#9734;</span> <br/>

                            <BarChart size={parseInt((repo.stargazers_count * 100)/props.store.largestStarCount) + "%"}/>
                    </li>
                )
            })}
        </ul>
    )
});

UserRepoList.propTypes = {
    store: React.PropTypes.object
};

export default UserRepoList;