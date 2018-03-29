import { Meteor } from "meteor/meteor";
import { HTTP } from 'meteor/http';

Meteor.methods({
   async "get_page_access_token"(longToken) {
        let baseURL = "https://graph.facebook.com/me/accounts";
        let apiURL = `${baseURL}?access_token=${longToken}`;
        let res = HTTP.call("get", apiURL);
        console.log("long_res : ", res.data);
        let yo=res.data.data;
        let array=[];
        for(let i=0;i<yo.length;i++)
        {
           let url=`https://graph.facebook.com/${yo[i].id}?fields=instagram_business_account&access_token=${yo[i].access_token}`;
           let result=HTTP.call("get",url);
           if(result.data.instagram_business_account)
           {
               console.log(i);
               array.push({id:result.data.instagram_business_account.id,name:yo[i].name});
           }
        }
        console.log(array);
        return array;
    }
});