import React from 'react';

const API_ORG_MEMBERS = 'https://api.github.com/orgs/code42/members';


export default class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }

    _handleClick(e) {
        e.preventDefault();

        let username = e.target.getAttribute('id');
        this.props.fetchProfile(username);
    }

    componentDidMount() {

        this.props.setSpinner(true);

        fetch(`${API_ORG_MEMBERS}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let members = data.map((mem) => {
                        return (
                            <li className="list-group-item" id={mem.login} key={mem.login}
                                onClick={this._handleClick.bind(this)}>{mem.login}</li>
                        )
                    }
                )
                this.setState({members: members});
            })
            .catch((error) => console.log('Oops! . There Is A Problem Getting Members' + error))

       this.props.setSpinner(false);
    }

    render() {
        let newMember ='blanning19';
        return (
            <div>
                <ul>
                    {this.state.members}
                    <li className="list-group-item" id={newMember} key={newMember}
                        onClick={this._handleClick.bind(this)}>{newMember}</li>
                </ul>
            </div>
        )
    }
}
