import React from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart'

const UserRepoList = observer((props) => {
    return (
        <ul>
            {props.store.filteredRepos.map(repo => {
                return (
                    <li key={repo.id}>
                        {repo.name} <BarChart/> {repo.stargazers_count} &#9734; {props.stars}
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