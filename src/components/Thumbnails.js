import React, { Component } from 'react';

class Thumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: 0,
    }

    this.left = 190
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.video.preload = 'auto'
    this.video.src = "https://media.w3.org/2010/05/sintel/trailer.mp4"

    this.video.onloadeddata = () => {
      this.video.currentTime = this.state.range
    }

    this.video.onseeked = () => {
      this.duration = this.video.duration
      this.ctx.drawImage(this.video, 0, 0, 138, 90)
    }
  }

  componentWillUpdate() {
    this.video.src = "https://media.w3.org/2010/05/sintel/trailer.mp4"

    this.video.onloadeddata = () => {
      this.video.currentTime = this.state.range
    }

    this.video.onseeked = () => {
      this.ctx.drawImage(this.video, 0, 0, 138, 90)
    }
  }

  show = e => {
    this.left = this.state.range * 900 / this.duration + 230
    console.log(this.left)

    this.setState({
      range: e.target.value,
    })
  }

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 160, position: 'absolute', left: this.left, bottom: 0 }}>
            <canvas
              style={{ marginLeft: 8 }}
              step={1}
              ref={canvas => this.canvas = canvas}
              width="160px"
              height="90px"
            />
            <div style={{ height: 0, width: 0, border: '10px solid rgba(0,0,0,0)', borderTop: '10px solid #6c9', margin: 'auto' }} />
          </div>
        </div>
        <input
          style={{ width: 900 }}
          type="range"
          min={0}
          max={this.duration}
          value={this.state.range}
          onChange={this.show}
        />
        <video
          style={{ display: 'none' }}
          ref={video => this.video = video}
        />
      </div>
    );
  }
}

export default Thumbnails;