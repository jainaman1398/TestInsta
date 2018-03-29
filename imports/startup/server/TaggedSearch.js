import { Meteor } from "meteor/meteor";
import { HTTP } from 'meteor/http';
import {Token} from "../../api/store_token";


Meteor.methods({
    "tagged_search"(instaID) {
        let yo= Token.findOne({userId:this.userId});
        let long_token=yo.user_token;
        console.log("user_token",long_token);
        let url=`https://graph.facebook.com/v2.12/${instaID}/tags?oauth_token=${long_token}`;
        let res1=HTTP.call("get",url);
        console.log("tagged",res1);
        return res1;
    }
});