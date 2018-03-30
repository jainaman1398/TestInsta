import React,{Component} from "react";

export default class List extends Component{

    constructor(props){
        super(props);
        this.getdata=this.getdata.bind(this);
    }

    getdata(data){
        console.log("map",data);
        data=data||[];
        data=data.data||[];
        data=data.data||[];

        return data.map((task, key) => {
            return(
                <tr className="alert alert-dark" key={key}>
                    <th>{task.like_count}</th>
                    <th>{task.comments_count}</th>
                    <img src={task.media_url} alt="" border="3" height="100" width="100" />
                </tr>
            )
        })
    }

    render(){

        return(
            <table className="table table-bordered">
                <tr className="alert alert-success">
                    <th>Like_count</th>
                    <th>Comments_count</th>
                    <th>Media </th>
                </tr>
                {this.getdata(this.props.data)}
            </table>
        )
    }

}

