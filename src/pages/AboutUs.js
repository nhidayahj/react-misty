import React from 'react';
import diffuser from '../icons/diffuser.jpg'
import oil from '../icons/oil.jpg';
import mix from '../icons/mix.jpg'

export default function AboutUs() {
    return (
        <React.Fragment>
            <div className="container">
                <h3 className="profile-title mt-4">Who Are We</h3>
                <div className="info-one">
                    <div className="info-img-one">
                        <img src={mix} alt="mix-info" className="img-one" />
                    </div>
                    <div className="info-desc-one">
                        <div className="info-text">
                            <p className="info">We are a group of young and passionate individuals who loves yoga and meditation 
                               We work alongside professionals in aramotherapy
                                to give you all the specially scented essential oils. Most of our diffusers are handcrafted 
                                from artisans all around the the world, to give you that unique touch.
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="info-two">
                    <div className="info-img-two">
                        <img src={diffuser} alt="diffuser-info" className="img-two" />
                    </div>
                    <div className="info-desc-two">
                        <div className="info-text">
                            <p className="info">Most of our diffusers are specially handcrafted by talented 
                                artisans, each representating a unique look. Perfect for your 
                                decorated home items. 
                        </p>
                        </div>
                    </div>
                </div>
                <div className="info-three">
                    <div className="info-img-three">
                        <img src={oil} alt="oil-info" className="img-three" />
                    </div>
                    <div className="info-desc-three">
                        <div className="info-text">
                            <p className="info"> Misty's essential oil are carefully selected to give you the calmness and relaxation, 
                                enhancing your spiritual
                                practice, or use it for your meditaton. Apply to your wrists, feet and behind the ears.

                        </p>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}