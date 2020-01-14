import React from 'react';
// import { Icon } from 'antd';
import RoomIcon from '@material-ui/icons/Room';

const MapMarker = (({ name, key, lat, lng, handleMarkerClick, col }) => {
  return (
    <div key={key} style={{width: "10em", zIndex: "9000"}} onClick={()=>handleMarkerClick(lat, lng)}>
      <span className="brand-red"><b>{name}</b></span><br/>
      {/*<Icon className="font-1-5" type="environment" theme="twoTone" twoToneColor="#fd0000" />*/}
      <RoomIcon style={{color: `${col}`, fontSize: "2.5em"}}/>
    </div>
  );
});

export default MapMarker;
