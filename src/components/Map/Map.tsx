import React from "react";
import {UserData} from "../../model/UserApi";

import './Map.scss';

interface MapProps {
  users: UserData[],
  onMapClicked: (id: any) => void,
  center: {lat: number, lng: number} | null
}

interface MapState {
  map: google.maps.Map | null
}

export default class Map extends React.Component<MapProps, MapState>{
  mapRef: any;

  constructor(props: MapProps) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      map: null,
    };
  }

  async componentDidMount(): Promise<any> {
    const {
      mapRef: {
        current
      }
    } = this;

    const map = new google.maps.Map(current, {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
      center: new google.maps.LatLng(0, 0)
    });

    this.setState({
      map,
    });
  }

  setMarkers() {
    const {
      state: {
        map,
      },
      props: {
        users,
        onMapClicked,
      },
    } = this;

    let sumLat = 0;
    let sumLng = 0;

    if (map) {
      users.forEach(({id, name, address}: UserData) => {
        const geo = address.geo;
        let lat = parseFloat(geo.lat) as number;
        let lng = parseFloat(geo.lng) as number;

        sumLat += lat;
        sumLng += lng;

        const geometry = new google.maps.LatLng({lat, lng});
        const marker = new google.maps.Marker({
          position: geometry,
          map,
        });
        const infoWindow = new google.maps.InfoWindow({
          content: `${name}\n${address.street} ${address.suite}\n${address.city} ${address.zipcode}`
        });
        marker.addListener('click', function () {
          infoWindow.open(marker.get('map'), marker);
          onMapClicked(id);
        });
      });

      if (users.length) {
        map.setCenter(new google.maps.LatLng({
          lat: sumLat / users.length,
          lng: sumLng / users.length,
        }))
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<MapProps>): void {
    if (prevProps.users?.length < 1 && this.props.users?.length > 0) {
      this.setMarkers();
    }
    debugger;
    if (this.props.center !== prevProps.center && this.props.center) {
      const map = this.state.map;
      if (map) {
        map.setZoom(8);
        map.panTo(new google.maps.LatLng(this.props.center));
      }
    }
  }

  onMapClicked = (data: any) => {
    this.props.onMapClicked(data);
  };

  render () {
    const {
      mapRef
    } = this;
    return (
      <div>
        <div className={'user-map-root'} ref={mapRef}/>
      </div>
    )
  }
}
