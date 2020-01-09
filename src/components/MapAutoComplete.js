import React, { Component } from 'react';
import { AutoComplete, Input, Button, Icon } from 'antd';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from "../styles/NavbarStyles";
import styles from "../styles/MapContainerStyles";
import {withStyles} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "./layout/Navbar";

class MapAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      dataSource: [],
      singaporeLatLng: this.props.singaporeLatLng,
      autoCompleteService: this.props.autoCompleteService,
      geoCoderService: this.props.geoCoderService,
    }
  }

  // Runs after clicking away from the input field or pressing 'enter'.
  // Geocode the location selected to be created as a marker.
  onSelect = ((value) => {
    console.log(`from on select`);
    this.state.geoCoderService.geocode({ address: value }, ((response) => {
      const { location } = response[0].geometry;
        console.log(response);
        console.log(response[0]);
        console.log(location);
      this.props.addMarker(location.lat(), location.lng(), value);
      // this.props.onSelectOption(null, null, null, )
      // this.props.addMarker(location.lat(), location.lng(), this.props.markerName);
    }))
  });


  // Runs a search on the current value as the user types in the AutoComplete field.
  handleSearch = ((value) => {
    console.log(`from handle search`);
    const { autoCompleteService, singaporeLatLng } = this.state;
    // Search only if there is a string
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: singaporeLatLng, // Search in Singapore
        radius: 30000, // With a 30km radius
      };
      autoCompleteService.getQueryPredictions(searchQuery, ((response) => {
        // The name of each GoogleMaps suggestion object is in the "description" field
        if (response) {
          const dataSource = response.map((resp) => resp.description);
          this.setState({ dataSource, suggestions: response });
        }
      }));
    }
  });

  render() {
    const { dataSource } = this.state;
    const {classes} = this.props;
    return (
            <AutoComplete
        // className="w-100"
        dataSource={dataSource}
        // options={dataSource}
                placeholder={this.props.placeholder}

        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        style={{width: "20em", border: "none", color: "rgba(0, 0, 0, 0.5)"}}

        >

              <Input
                  suffix={

                     <Icon type={"search"} />
                 }
              />

     </AutoComplete>

        // placeholder={this.props.placeholder}
        // renderInput={params =>(
        //   <InputBase
        //       {...params}
        //   placeholder="Search…"
        //   classes={{
        //     root: classes.inputRoot,
        //     input: classes.inputInput,
        //   }}
        //   inputProps={{ 'aria-label': 'search' }}
        //   />
        //     )}
        // classes={{
        //   root: classes.inputRoot,
        //   input: classes.inputInput,
        // }}
        // inputProps={{ 'aria-label': 'search' }}

    );
  }
}

export default MapAutoComplete;
