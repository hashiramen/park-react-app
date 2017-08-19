import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import _ from 'lodash'

//constants
import mapStyling from '../../constants/mapStyle.json'
import iconColors from '../../constants/iconColors.js'

//actions
import { requestParkeringer } from '../../actions/action_parkeringer'

//components
import Provider from '../../components/Provider'
import Parking from '../../components/Parking'

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            total: 0,
            provider: '',
            center: {
                zoom: 10,
                lat: 55.6764,
                lng: 12.2681
            }
        }

        this.setNewCenterPositon = this.setNewCenterPositon.bind(this)
        this.parseGeoLocation = this.parseGeoLocation.bind(this)
        this.handleProviderSearch = this.handleProviderSearch.bind(this)
    }

    componentDidMount() {
        this.props.requestParkeringer()
    }

    filterParkingsToRender(){
        const { results } = this.props.parkeringer
        let totalSize = 0
        const filteredList = Object.keys(results).map( (key, index) => {
            let subSize = 0;
            const subParkings = Object.keys(results[key]).filter( (subkey, subindex) => {
                if(_.includes(results[key][subkey].providerId.toLocaleLowerCase(), this.state.provider.toLocaleLowerCase())){
                    subSize += 1
                    totalSize += 1
                    return results[key][subkey]
                }
            }).map(subkey => { return ( <Parking { ...results[key][subkey] } key={subkey} setNewPosition={this.setNewCenterPositon} parseGeoLocation={this.parseGeoLocation}/> )} )

            return ( <Provider parkings={subParkings} provider={key} key={key} size={subSize}/>)
        })

        var resultFinish = {
            totalSize,
            filteredList
        }
        return resultFinish
    }

    filterParkingsForMarkups(){
        const { results } = this.props.parkeringer
        let markups = []
        const filteredList = Object.keys(results).map( (key, index) => {
            let subParkings = Object.keys(results[key]).filter( (subkey, subindex) => {
                if(_.includes(results[key][subkey].providerId.toLowerCase(), this.state.provider.toLocaleLowerCase()) && results[key][subkey].sellingPointLocation !== '-')
                    return results[key][subkey]
            }).map(subkey => results[key][subkey]  )

            markups = [ ...markups, ...subParkings ]
        })

        return markups
    }

    setNewCenterPositon(latLng){
        this.setState({
            center: {
                lat: latLng.lat(),
                lng: latLng.lng(),
                zoom: 12
            }
        })
    }

    handleProviderSearch(e){
        this.setState({provider: e.currentTarget.value})
    }

    parseGeoLocation(locationString){
        let location = []
        if(locationString.indexOf('/') !== -1){
            location = locationString.split('/')
        }
        else
        {
            location = locationString.split(',')
        }

        return location;
    }

    render() {
        const { results, pending } = this.props.parkeringer
        const { totalSize, filteredList } = this.filterParkingsToRender()
        const Google = withGoogleMap( props => (
            <GoogleMap 
                ref={props.onMapLoad}
                defaultZoom={this.state.center.zoom}
                defaultCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}
                defaultOptions={{styles: mapStyling}}
            >
                {Object.keys(props.markers).map( (key, index) => {
                    const location = this.parseGeoLocation(props.markers[key].sellingPointLocation)

                    var pinImage = 
                    new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" 
                                    + iconColors[props.markers[key].providerId].color,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34));
                    return (<Marker { ...props.markers[key]} position={{ lat: parseFloat(location[0]), lng: parseFloat(location[1])}}
                                                                title={props.markers[key].providerId}
                                                                key={index}
                                                                icon={pinImage}
                                                                onClick={(e) => this.setNewCenterPositon(e.latLng)}>
                            {
                                <InfoWindow>
                                    <div>{props.markers[key].providerId}</div>
                                </InfoWindow>
                            }
                            </Marker>)
                })}
            </GoogleMap>
        ))
        if(pending){
            return ( <div className="container"><span className="loading">Loading...</span></div> )
        }

        return (
            <div className="container">
                <div className="options-container">
                    <nav className="menu-container">
                    </nav>
                    <div className="settings-container">
                        <select onChange={this.handleProviderSearch} value={this.state.provider}>
                            <option value="">All - Choose a provider</option>
                            {Object.keys(results).map((key, index) => {
                                return (<option value={key} onChange={this.handleProviderSearch} key={index}>{key}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="map-container">
                    <Google containerElement={<div style={{ height: `100%`, width: '100%'  }} />}
                            mapElement={<div style={{ height: `100%`, width: '100%'}} />}
                            onMapLoad={this.handleMapLoad}
                            onMapClick={this.handleMapClick}
                            onMarkerRightClick={this.handleMarkerRightClick}
                            markers={this.filterParkingsForMarkups()}></Google>
                </div>
                <div className="parkings-container">
                    <div className="total-parkings-in-period">
                        <p>{totalSize} results</p>
                    </div>
                    <div className="parkings">
                        {filteredList}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({parkeringer}){
    return{
        parkeringer
    }
}
export default connect(mapStateToProps, { requestParkeringer })(Main);