import React from "react";
import List from "./List.component";
import UserCard from "../Card/UserCard.container";
import {UserData} from "../../model/UserApi";

import './UserList.scss';

interface UserListProps {
  data: UserData[],
  onClick: (data: any) => void,
  listHighlight: number | null,
}

export default class UserList extends React.PureComponent<UserListProps> {
  render() {
    const {
      data,
      onClick,
    } = this.props;
    return (
      <List<UserData, UserCard> data={data} ListElement={UserCard} onClick={onClick} className={'user-list'}/>
    );
  }
}