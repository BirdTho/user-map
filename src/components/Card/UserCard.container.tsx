import React from "react";

import Card from './Card.component';
import {UserData} from "../../model/UserApi";

import './UserCard.scss';

interface UserCardProps {
  data: UserData,
  onClick: (data: any) => void,
}

export default class UserCard extends React.PureComponent<UserCardProps> {
  onClick = () => {
    const {
      id,
      address: {
        geo,
      },
    } = this.props.data;
    this.props.onClick({
      geo: {
        lat: parseFloat(geo.lat),
        lng: parseFloat(geo.lng),
      },
      id,
    });
  };

  render () {
    const {
      data: {
        name, id,
        address,
        phone, email, website
      },
    } = this.props;

    return (
      <Card className={'user-card'} onClick={this.onClick} data-index={id}>
        <table>
          <tbody>
          <tr><td colSpan={2}>{name}</td></tr>
          <tr><td>Phone:</td><td>{phone}</td></tr>
          <tr><td>Email:</td><td>{email}</td></tr>
          <tr><td>Address:</td>
            <td>{address.street} {address.suite}<br/>{address.city} {address.zipcode}</td></tr>
          <tr><td>Website:</td>
            <td><a href={'http://' + website} target='_blank' rel='noopener noreferrer'>{website}</a></td></tr>
          </tbody>
        </table>
      </Card>
    )
  }
}