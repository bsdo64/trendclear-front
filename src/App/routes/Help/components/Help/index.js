/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{ lat: 37.556605, lng: 126.925185, }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, key) => (
      <Marker
        key={key}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [{
        position: {
          lat: 37.556605,
          lng: 126.925185,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }]
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    return (
      <section style={{height: 400, width: '100%'}}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          markers={this.state.markers}
        />
      </section>
    );
  }
}

const PolicyBox = () => {

  return (
    <div className="ui segment contact-info">
      <div className="ui left aligned container">
        <h3 className="ui header">Contact Us</h3>
      </div>
      <div className="ui center aligned container company-info">
        <div className="ui list">
          <div className="item">
            <i className="heart icon"></i>
            <div className="content title">
              상호명
            </div>
            <div className="content description">
              베나클
            </div>
          </div>
          <div className="item">
            <i className="marker icon"></i>
            <div className="content title">
              사업장 소재지
            </div>
            <div className="content description">
              마포구 영화로18안길 10 401호
            </div>
          </div>
          <div className="item">
            <i className="sticky note icon"></i>
            <div className="content title">
              사업자등록번호
            </div>
            <div className="content description">
              359-19-00336
            </div>
          </div>
          <div className="item">
            <i className="user icon"></i>
            <div className="content title">
              대표
            </div>
            <div className="content description">
              도병수 (이메일 : <a href="mailto:bsdo64@gmail.com">bsdo64@gmail.com</a>)
            </div>
          </div>
          <div className="item">
            <i className="user icon"></i>
            <div className="content title">
              개인정보담당자
            </div>
            <div className="content description">
              도병수
            </div>
          </div>
          <div className="item">
            <i className="mail icon"></i>
            <div className="content title">
              문의 사항
            </div>
            <div className="content description">
              <a href="mailto:webmaster@venacle.com">webmaster@venacle.com</a>
            </div>
          </div>
          <div className="item">
            <i className="phone icon"></i>
            <div className="content title">
              Tel
            </div>
            <div className="content description">
              010-4906-2685
            </div>
          </div>
        </div>
      </div>
      <div id="map"></div>
      <SimpleMap

      />
    </div>
  )
}

export default PolicyBox;
