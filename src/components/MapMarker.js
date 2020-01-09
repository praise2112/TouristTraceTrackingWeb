import React from 'react';
import { Icon } from 'antd';

const MapMarker = (({ name, key, lat, lng, handleMarkerClick }) => {
  return (
    <div key={key} style={{width: "10em", zIndex: "1000"}} onClick={()=>handleMarkerClick(lat, lng)}>
      <span className="brand-red"><b>{name}</b></span><br/>
      <Icon className="font-1-5" type="environment" theme="twoTone" twoToneColor="#fd0000" />
    </div>
  );
});

export default MapMarker;
