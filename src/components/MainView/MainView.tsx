import React from "react";
import userApi, {UserData} from '../../model/UserApi';
import UserList from "../List/UserList.container";
import Map from "../Map/Map";

interface MainViewProps {}

interface MainViewState {
  userData: UserData[],
  listClicked: null | number,
  mapHighlight: null | { lat: number, lng: number }
}

export default class MainView extends React.Component<MainViewProps, MainViewState> {
  state: MainViewState;

  constructor(props: MainViewProps) {
    super(props);

    this.state = {
      userData: [],
      listClicked: null,
      mapHighlight: null,
    };
  }

  async componentDidMount(): Promise<any> {
    // Fetch user data
    const userData = await userApi.getUsers();
    this.setState({
      userData,
    })
  }

  onListClick = (data: any): void => {
    debugger;
    this.setState({
      mapHighlight: data,
    })
  };

  onMapClicked = (data: any): void => {
    this.setState({
      listClicked: data,
    })
  };

  render () {
    const {
      onListClick,
      onMapClicked,
      state: {
        listClicked,
        mapHighlight,
        userData,
      }
    } = this;

    return (
      <div>
        <UserList data={userData} onClick={onListClick} listHighlight={listClicked || null}/>
        <Map users={userData} center={mapHighlight || null} onMapClicked={onMapClicked}/>
      </div>
    );
  }
}