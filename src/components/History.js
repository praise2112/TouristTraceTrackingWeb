import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import styles from "../styles/LoginStyles";
import * as PropTypes from "prop-types";
import {getUserHistory, updateHistory} from "../actions/historyActions";
import {message} from "antd";
import Moment from "./Profile";
import {withRouter} from "react-router-dom";
import isEmpty from "../validation/is-empty";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            hist: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {  // if user is already logged in redirect
        const user_id = this.props.auth.user.result.id;
        this.props.getUserHistory(user_id);

    }

    componentWillReceiveProps(nextProps, nextState) {      // take the new errors from nextProps if any and set that to errors in the state
        if(nextProps.errors  && nextProps.auth.isAuthenticated){
            this.setState({errors: nextProps.errors}, ()=>{
                this.setState({loading:false});
                if(this.state.errors.message !== undefined)
                    message.error(this.state.errors.message);
            });
        }
        if(nextProps.hist){
            this.setState({hist: nextProps.hist});
        }

        // console.log(nextProps.hist.hist.data[0]);
        // if(this.props.profile){
        //     this.setState({
        //         firstName: nextProps.profile.profile.firstName,
        //         lastName: nextProps.profile.profile.lastName,
        //
        //     })
        // }
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        // console.log(`Handling submit`);
        // const new_profile ={
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     birthday: this.state.birthday,
        //     city: this.state.city,
        //     country: this.state.country,
        //     nationality: this.state.nationality,
        //     email: this.state.email,
        //     phone: this.state.phone
        // };
        // console.log(new_profile);
        // const user_id = this.props.auth.user.result.id;
        // console.log(user_id);
        // this.setState({loading: true});
        // this.props.updateProfile(new_profile, user_id, this.props.history);   //so we can redirect from action
        // we dont have to do http://5000 cus of the proxy value we included in our package.json
        let newHist = [
            {
                lat: "123.23",
                long: "623.32",
                arrival_time: "2019-12-17 00:04:50",
                leave_time: "2019-12-17 00:08:50"
            }
        ];
        const user_id = this.props.auth.user.result.id;

        this.props.updateHistory(newHist,user_id,this.props.history);

        console.log(`Handle submit`);
    }
    render() {
        const {hist} = this.state;
        let history=null;
        if(!isEmpty(hist)) {
            history = hist.hist.map((hist,index) => (
                    <div key={index}>{hist.latitude} -- {hist.longitude}</div>
                ));
        }

        return (
            <div>

                <p>History component</p>
                {history}
                <button onClick={this.handleSubmit} >Add history</button>
            </div>
        );
    }
}


History.propTypes ={
    auth: PropTypes.object.isRequired,

    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    hist: PropTypes.array.isRequired,
    getUserHistory: PropTypes.func.isRequired,
    updateHistory: PropTypes.func.isRequired,
    // updateProfile: PropTypes.func.isRequired


};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors,
    profile: state.profile,
    hist: state.hist
});

export default connect(mapStateToProps, {getUserHistory, updateHistory})(withStyles(styles, {withTheme: true})(withRouter(History)));
