import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../animation/anim.json';

const Preloader = () => {

    let defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div style={{ margin: '0 auto', width: '100%' }}>
            <Lottie options={defaultOptions} height={"80%"} width={"80%"} />
        </div>
    )
}

export default Preloader;
