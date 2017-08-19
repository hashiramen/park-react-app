import React, { Component } from 'react';

import iconColors from '../constants/iconColors.js'

class Provider extends Component {
    constructor(props){
        super(props)
        this.state = {
            hide: true
        }
    }

    renderParkings(){
        const { parkings } = this.props
        return parkings.map( p => p)
    }

    handleProviderClick(){
        this.setState({
            hide: !this.state.hide
        })
    }

    render() {  
        const { provider, size } = this.props
        const styling = {
            backgroundColor: `#${iconColors[provider].color}`
        }
        return (
            <div className="provider-container">
                <div className={`provider-info ${size <= 0 ? 'block-provider' : ''}`} onClick={() => this.handleProviderClick()}>
                    <img src="https://cdn4.iconfinder.com/data/icons/mall-part-1/30/mall-icons-part1-08-256.png" className="provider-logo" style={styling}/><p className="provider-title">{provider}</p><p className="provider-amount" style={{float:'right', marginRight: '1em'}}>results {size}</p>
                </div>
                <div className={`parkings-list ${this.state.hide ? 'hide-parkings' : ''}`}>
                {this.renderParkings()}
                </div>
            </div>
        );
    }
}

export default Provider;