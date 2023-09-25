import React from 'react'
import Rating from 'react-rating'

const ReviewCard = ({ trainer }) => {
    return (
        <>
            <div className="row">
                {
                    trainer?.trainer_ratings.map((item, index) => {
                        return (<>
                            <div className="col-sm-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='d-flex'>
                                            <div className='col-sm-6 col-md-6 col-lg-6 d-flex ml-n4 justify-content-between'>
                                                <h5 className="card-title ml-n3" >
                                                    <Rating
                                                        start={0}
                                                        stop={5}
                                                        readonly={true}
                                                        initialRating={item?.ratings?.trainee?.recommendRating}
                                                        emptySymbol={[
                                                            "fa fa-star-o fa-2x mediumRating",
                                                            "fa fa-star-o fa-2x mediumRating",
                                                            "fa fa-star-o fa-2x mediumRating",
                                                            "fa fa-star-o fa-2x mediumRating",
                                                            "fa fa-star-o fa-2x mediumRating",
                                                            "fa fa-star-o fa-2x mediumRating",
                                                        ]}
                                                        fullSymbol={[
                                                            "fa fa-star fa-2x mediumRating",
                                                            "fa fa-star fa-2x mediumRating",
                                                            "fa fa-star fa-2x mediumRating",
                                                            "fa fa-star fa-2x mediumRating",
                                                            "fa fa-star fa-2x mediumRating",
                                                            "fa fa-star fa-2x mediumRating",
                                                        ]}
                                                        fractions={2}
                                                    />
                                                </h5>
                                            </div>

                                            <h5 className="card-title">Special title treatment</h5>
                                        </div>
                                        <h6 className='' style={{fontSize:"18px",fontWeight:600}}>name</h6>
                                        <h6 className='mb-1' style={{fontSize:"18px"}}>name</h6>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })
                }

            </div>

        </>
    )
}

export default ReviewCard