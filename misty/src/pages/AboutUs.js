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
                </div>
                <div className="info-two">
                    <div className="info-img-two">
                        <img src={diffuser} alt="diffuser-info" className="img-two" />
                    </div>
                </div>
                <div className="info-three">
                    <div className="info-img-three">
                        <img src={oil} alt="oil-info" className="img-three" />
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}