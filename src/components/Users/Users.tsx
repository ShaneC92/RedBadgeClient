import React from "react";
import "./User.css";
import EditIcon from '@material-ui/icons/Edit';
import APIURL from '../helpers/environment';
type Token = {
    token:any,
    users:any,
    userList:any,
    editUpdateMember:any,
    updateOn:any
}

class UserTable extends React.Component<Token,{}>{
    users:any = () =>{
        const deleteMember = (memberId:number,memberEmail:any)=>{
            fetch(`http://localhost:3000/user/deleteUser/${memberId}`,{
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": this.props.token
                    })
                })
                .then(deleted=>{
                    alert(`Deleted ${memberEmail}`);
                    this.props.users();
                })
        }
        let members = this.props.userList.user;
        return(
            (members.map((member:any,index:any)=>{
                return(
                    <tr key = {index}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td><button onClick = {()=>{
                            deleteMember(member.id,member.email);
                        }}>DELETE</button></td>
                        <td>
                            <EditIcon onClick = {()=>{
                                this.props.editUpdateMember(member);
                                this.props.updateOn();
                                }}/>
                        </td>
                    </tr>
                )
            }))
        )
    }
    render(){
        console.log("User list from ",this.props.userList.user);
        return(
            <div>

                <h1 id = "fontFamily">List of members</h1>
                <table className = "userTable">
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.users()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default UserTable;