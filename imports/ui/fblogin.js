import React ,{Component} from "react";
import {Token} from "../api/store_token";
import Table from "./Table";
export default class Fblogin extends Component{
    constructor(props){
          super(props);
          this.state={
              query_string:"",arr:""
          };
    }

    aj(event){
        console.log(event.target.value);
        this.setState({query_string:event.target.value});
    }

    login() {
            window.FB.login(function (response) {
                    if (response.authResponse) {
                        console.log("small token", response.authResponse.accessToken);
                        console.log("userID", response.authResponse.userID);
                        let token = response.authResponse.accessToken;
                        let userID = response.authResponse.userID;
                        Meteor.call("get_fb_long_token", token, (err, res1) => {
                            if (err) {
                                console.log("long err ", err);
                            } else {
                                console.log("long Token ", res1.data.access_token);
                                Meteor.call("get_page_access_token", res1.data.access_token, (err, res) => {
                                    if (err)
                                        throw err;
                                    else {
                                        this.setState({arr:res});
                                        Meteor.call("tokens.insert",res1.data.access_token,res,
                                            (err, res) => {
                                                console.log(res);
                                            })
                                    }
                                })
                            }
                        });
                    }
                    else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }.bind(this), {
                    scope: 'manage_pages, read_insights, pages_show_list,instagram_manage_insights,instagram_basic,instagram_manage_comments,business_management',
                    return_scopes: true
                }
            )
    }


    hi(){

        Meteor.call("tagged_search",this.state.query_string,(err,res)=>{
            if(err)
                throw err;
            else
                console.log(res);
        })
    }

    componentDidMount(){
        let t=Meteor.userId();
       console.log(t);
       Meteor.call("pages.check",t,(err,res)=>{
           if(err)
               throw err;
           else
               this.setState({arr:res.array});
       })

    }

    render(){
        console.log("hello");
        return(
            <div>
                <button className="btn btn-primary " onClick={this.login.bind(this)}>Login</button>
                <input value={this.state.query_string} placeholder="Page Statistics" onChange={this.aj.bind(this)}/>
                <button className="btn btn-info" onClick={this.hi.bind(this)}>get Tagged data</button>
                <Table data={this.state.arr}/>
            </div>
        )
    }
}