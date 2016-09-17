import React from 'react';
import {observer} from 'mobx-react';

const UserRepoList = observer((props) => {
    return (
        <ul>
            {props.store.filteredRepos.map(repo => {
                return (
                    <li key={repo.id}>
                        {repo.name} {repo.stargazers_count}
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