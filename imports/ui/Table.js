import React,{Component} from "react";

export default class Table extends Component{

    constructor(props){
        super(props);
        this.getdata=this.getdata.bind(this);
    }

    getdata(data){
        console.log("map",data);
        data=data||[];
        return data.map((task, key) => {
            return(
                <tr className="alert alert-dark" key={key}>
                    <th>{task.id}</th>
                    <th>{task.name}</th>
                    <hr/>
                </tr>
            )
        })
    }

    render(){

        return(
            <table className="table table-bordered">
                <tr className="alert alert-success">
                    <th>id</th>
                    <th>Name</th>
                </tr>
                {this.getdata(this.props.data)}
            </table>
        )
    }

}

