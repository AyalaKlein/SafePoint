import React, { useState, Component, useEffect } from 'react';
import shield from './th.jpg';

class AboutPage extends Component {
    canvas = null;

    componentDidMount() {
        this.addImageToCanvas()
    }

    addImageToCanvas() {
        let context = this.canvas.getContext("2d");
        const img = new Image()
        console.log(shield)
        img.src = shield
        img.onload = () => {
            context.drawImage(img, 0, 0, 120, 100)
        }
    }

    render() {

        return (
            <div >
                <article>
                    <header>
                        <h1 style={{ 'text-shadow': '2px 2px 4px #000000' }}>SafePoint</h1>
                        <aside>
                            <h2>App that make you safe</h2>
                        </aside>
                    </header>
                </article>
                <section>

                    <h1 >Video</h1>
                    <p>This video is...</p>
                </section>
                <canvas ref={canvas => this.canvas = canvas} width="100px" height="100px">
                </canvas>
                <br></br>
                <video width="320" height="240" style={{ 'border': '1px solid black', 'padding': '10px', 'border-radius': '25px' }} controls>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                </video>

                <footer><p>SafePoint Team</p></footer>

            </div>

        );
    }
};

export default AboutPage;