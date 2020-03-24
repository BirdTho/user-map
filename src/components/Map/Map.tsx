import React from "react";
import {UserData} from "../../model/UserApi";

import './Map.scss';

interface MapProps {
  users: UserData[],
  onMapClicked: (id: any) => void,
  center: {geo: {lat: number, lng: number}, id: number} | null
}

interface MarkerTable {
  [key: number]: google.maps.Marker
}

interface MapState {
  map: google.maps.Map | null,
  infoWindow: google.maps.InfoWindow,
  markers: MarkerTable,
}

export default class Map extends React.Component<MapProps, MapState>{
  mapRef: any;

  constructor(props: MapProps) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      map: null,
      infoWindow: new google.maps.InfoWindow(),
      markers: {},
    };
  }

  async componentDidMount(): Promise<any> {
    const {
      mapRef: {
        current
      },
      state: {
        infoWindow,
      },
      props: {
        onMapClicked,
      },
    } = this;

    infoWindow.addListener('closeclick', () => {
      onMapClicked(null);
    });

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
        infoWindow,
      },
      props: {
        users,
        onMapClicked,
      },
    } = this;

    let sumLat = 0;
    let sumLng = 0;

    if (map && users.length) {
      let markers: MarkerTable = {};
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
          title: name,
        });

        marker.addListener('click', () => {
          infoWindow.setContent(name);
          infoWindow.open(marker.get('map'), marker);
          onMapClicked(id);
        });

        markers[id] = marker;
      });

      map.setCenter(new google.maps.LatLng({
        lat: sumLat / users.length,
        lng: sumLng / users.length,
      }));

      this.setState({
        markers,
      })
    }
  }

  componentDidUpdate(prevProps: Readonly<MapProps>): void {
    if (prevProps.users?.length < 1 && this.props.users?.length > 0) {
      this.setMarkers();
    }

    if (this.props.center !== prevProps.center && this.props.center) {
      const {
        map,
        markers,
        infoWindow,
      } = this.state;
      const {
        geo,
        id,
      } = this.props.center;

      if (map) {
        map.setZoom(8);
        map.panTo(new google.maps.LatLng(geo));
        if (markers) {
          const marker = markers[id];
          if (marker) {
            infoWindow.setContent(marker.getTitle() || '');
            infoWindow.open(map, marker);
          }
        }
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
