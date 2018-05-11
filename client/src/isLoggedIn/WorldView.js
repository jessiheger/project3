import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';


class Worldview extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoiamVzc2loZWdlciIsImEiOiJjamd2N3pscTUwcHMwMnFwOHdka3Fsa296In0.gAcDJIY5kkQBDFg71l9poA"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Worldview;




