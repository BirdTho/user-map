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
  listRef: any;

  constructor(props: UserListProps) {
    super(props);

    this.listRef = React.createRef();
  }

  componentDidUpdate(prevProps: Readonly<UserListProps>): void {
    const {
      listHighlight
    } = this.props;
    if (prevProps.listHighlight !== listHighlight) {
      const ul = this.listRef.current as HTMLUListElement;
      const prevListHighlight = prevProps.listHighlight;
      if (prevListHighlight) {
        const li = Array.from(ul.children).find(li => li.getAttribute('data-index') === prevListHighlight.toString()) as HTMLLIElement;
        li.classList.remove('highlight');
      }

      if (listHighlight) {
        const li = Array.from(ul.children).find(li => li.getAttribute('data-index') === listHighlight.toString()) as HTMLLIElement;
        li.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        li.classList.add('highlight');
      }
    }
  }

  render() {
    const {
      data,
      onClick,
    } = this.props;

    return (
      <List<UserData, UserCard> listRef={this.listRef} data={data} ListElement={UserCard} onClick={onClick} className={'user-list'}/>
    );
  }
}