import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {getGoecode} from '../../api'
import Geocode from "react-geocode";
import './SimpleMap.css'

const GOOGLE_API_KEY = 'AIzaSyAGsJ_d09jxhQCUrHQplmZxa8cf5NPZS2M'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
        position: {lat: 59.955413,lng: 30.337844},
        mapError: ''
    }
  }


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentDidMount(){
    getGoecode(Geocode, this.props.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            let newPosition  = {lat, lng}
            this.setState({position: newPosition})
        },
        error => {
            console.error(error);
            this.setState({mapError: error.message})
        }
        );
  }

  render() {
    return (
      <div className={'map-container'}>
        <div style={{ height: '300px', width: '300px' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={this.props.center}
            center={this.state.position}
            defaultZoom={this.props.zoom}
            >
            <AnyReactComponent
                lat={this.state.position.lat}
                lng={this.state.position.lng}
                text="📍"
            />
            </GoogleMapReact>
        </div>
    {this.state.mapError ? (<div className={'map-error'}>{this.state.mapError}</div>) : null}
      </div>

    );
  }
}

export default SimpleMap;