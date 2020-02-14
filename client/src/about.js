import React, { useState, Component } from 'react';

const AboutPage = () => {
    
    return (
        <div >
            <article>
  <header>
    <h1 style={{'text-shadow':'2px 2px 4px #000000'}}>SafePoint</h1>
    <aside>
        <h2>App that make you safe</h2>
    </aside>
    </header>
</article>
<canvas id="myCanvas" width="100%" height="2px" style={{'border':'1px', 'solid': '#000550'}}></canvas>
<section>

  <h1 >Video</h1>
  <p>This video is...</p>
</section>
            <canvas id="myCanvas" width="100%" height="0" border="1px" solid="#000550">
        </canvas>
        <br></br>
            <video width="320" height="240" style={{'border':'1px solid black', 'padding': '10px', 'border-radius':'25px'}} controls>
              <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
            </video>

            <footer><p>SafePoint Team</p></footer>
            
        </div>

    );
};
 
export default AboutPage;