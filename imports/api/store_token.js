import {Meteor} from "meteor/meteor";
export const Token=new Mongo.Collection('tokens');

Meteor.methods({
    "tokens.insert"(long_token,array){
        return Token.insert({userId:this.userId,user_token:long_token,array:array});
    },
    "pages.check"(userId){
        return Token.findOne({userId:userId});
    }
});