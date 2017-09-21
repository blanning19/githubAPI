import React, {Component} from 'react';
import { Grid,Col,Row} from 'react-bootstrap';
import moment from 'moment';

import Members from './Members';
import Profile from './Profile';
import Footer from './Footer';

import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';

import '../styles/App.css';
import Header from "./Header";

const API = 'https://api.github.com/users'


class App extends Component {
    constructor(props) {
        super(props)
        this.setSpinner=this.setSpinner.bind(this);
        this.state = {
            membersLoading: false,
            membersLoadingContent: '',
            profileLoading: false,
            profileLoadingContent: '',
            username: '',
            name:'',
            avatar:'',
            location:'',
            repos:'',
            email: '',
            homeUrl:'',
            notFound:'',
            created:'',
            members:[],
            repositories:[],
            organizations:[]
        }


    };

    setSpinner(bool){
        this.setState({
            membersLoading: bool,
        })
    }

    fetchProfile(username){
        this.setState({
            profileLoading: true
        });

        let url = `${API}/${username}`;
        let url2 = `${API}/${username}` + '/repos';
        let url3 = `${API}/${username}` + '/orgs';

        fetch(url)
            .then((res) => res.json() )
            .then((data) => {
                let date = moment(data.created_at);
                let dateComponent = date.utc().format('YYYY-MM-DD');
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    location: data.location,
                    repos: data.public_repos,
                    email: data.email,
                    homeUrl: data.html_url,
                    notFound: data.message,
                    created: dateComponent
                })
            })
            .catch((error) => console.log('Oops! . There Is A Problem loading the profile data') )

        //Get the User's repositories
        fetch(url2)
            .then((res) => res.json() )
            .then((data) => {
                let repositories = data.map((rep) =>{
                    let link = 'https://github.com/' +username+ '/'+rep.name;
                    return(
                        <li key={rep.id}><a href={link} target="_blank"> {rep.name} </a></li>
                    )
                })
            this.setState({
                    repositories: repositories,
                })
            })
            .catch((error) => console.log('Oops! . There Is A Problem loading the repository data') )

        //Get the User's organizations
        fetch(url3)
            .then((res) => res.json() )
            .then((data) => {
                let organizations = data.map((orgs) =>{
                    return(
                        <li key={orgs.id}> {orgs.login} </li>
                    )
                })
                this.setState({
                    organizations: organizations,
                })
            })
            .catch((error) => console.log('Oops! . There Is A Problem loading the organizations data'+error) )

        //TODO Get the User's contributions. Can't find them in the REST API data ??


        this.setState({
            profileLoading: false
        });
    }

    render() {

        return (
            <div className="container-fluid" >


                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Header/>
                            </Col>
                            <Col md={3}>
                                <section id="memberslist">
                                    <Loading isLoading={this.state.membersLoading} loadingClassName='loading' >
                                        <Members setSpinner={this.setSpinner}  fetchProfile={this.fetchProfile.bind(this)}/>
                                    </Loading>
                                </section>
                            </Col>

                            <Col md={9}>
                                <section id="profile">
                                    <Loading isLoading={this.state.profileLoading} loadingClassName='loading'>
                                        <Profile data={this.state} />
                                    </Loading>
                                </section>
                            </Col>
                        </Row>
                    </Grid>

                <Footer/>
            </div>
        )
    }
}


export default App;
