import React, { Component } from 'react';

class Parking extends Component {
    constructor(props){
        super(props)

        this.state = {
            lat:0,
            lng:0
        }
    }

    componentDidMount() {
        const { sellingPointLocation, parseGeoLocation } = this.props
        let location = parseGeoLocation(sellingPointLocation)
        this.setState({
            lat: parseFloat(location[0]),
            lng: parseFloat(location[1])
        })
    }
    handleClick(){
        const newPosition = {
            lat: () =>{
                return this.state.lat
            },
            lng: () => {
                return this.state.lng
            }
        }
        this.props.setNewPosition(newPosition)
    }
    render() {
        const { providerId, validityBegin, validityEnd } = this.props
        return (
            <div className="parking" onClick={()=> this.handleClick()}>
                <span className="prov-parking">{providerId}</span>
                <p>Start: <span className="start">{validityBegin}</span></p>
                <p>End: <span className="end">{validityEnd}</span></p>
                <p>Latitude: {this.state.lat} - Longtitude: {this.state.lng}</p>
            </div>
        )
    }
}

export default Parking;