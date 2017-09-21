import React from 'react';

export default class Profile extends React.Component {
    render() {
        let data = this.props.data;

        if (data.username === '')
            return (
                <div className="">
                </div>
            );
        else
            return (
                <section className="github--profile">
                    <div className="github--profile__info">
                        <a href={data.homeUrl} target="_blank" title={data.name || data.username}>
                            <img src={data.avatar} alt={data.username} height="200" width="200" /></a>
                        <h2><a href={data.homeUrl} title={data.username} target="_blank">{data.name || data.username}</a> ( {data.username} )</h2>

                        <h3>{data.location}</h3>
                    </div>
                    <div className="github--profile__state">
                        <ul>
                            <li>
                                <span>Repositories:</span><i>{data.repos}</i>
                                <ul>{data.repositories}</ul>
                            </li>
                            <li>
                                <span>Email:</span><i>{data.email}</i>
                            </li>
                            <li>
                                <span>Created:</span><i>{data.created}</i>
                            </li>
                            <li>
                                <span>Organizations:</span>
                                <ul>{data.organizations}</ul>
                            </li>
                        </ul>
                    </div>

                </section>
            );
    }
}
