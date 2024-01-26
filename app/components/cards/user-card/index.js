import React, { useState, useEffect } from 'react'
import { Utils } from '../../../../utils/utils'
import { useAppDispatch, useAppSelector } from '../../../store';
import { authState, authAction, getMeAsync } from '../../auth/auth.slice';
import { Edit, Save, Star, X } from "react-feather";
import { AccountType, TRAINER_AMOUNT_USD } from '../../../common/constants';
import SocialMediaIcons from '../../../common/socialMediaIcons';
import { myClips } from '../../../../containers/rightSidebar/fileSection.api';
import { bookingsAction, bookingsState, uploadProfilePictureAsync } from '../../common/common.slice';
import { toast } from 'react-toastify';
import { updateTraineeProfileAsync } from '../../trainee/trainee.slice';





const UserInfoCard = () => {
    const { userInfo, accountType } = useAppSelector(authState);
    const [isEditing, setIsEditing] = useState(false);
    const [imgURL, setImgURL] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [displayedImage, setDisplayedImage] = useState("/assets/images/avtar/user.png");
    const dispatch = useAppDispatch()
    const { profile_picture, profile_image_url } = useAppSelector(bookingsState);
    const [profile, setProfile] = useState({
        username: "",
        address: "Alabma , USA",
        wallet_amount: 0,
        hourly_rate: 0,
        editStatus: false,
        profile_picture: undefined,
    });

    useEffect(() => {
        getMeAsync()
    }, [])

    useEffect(() => {
        if (profile_picture) {
            setProfile({ ...profile, profile_picture: profile_picture });
        }
    }, [profile_picture]);

    useEffect(() => {
        setProfile({
            ...profile,
            ...userInfo
        })
        setDisplayedImage(Utils?.dynamicImageURL(userInfo?.profile_picture))
    }, [userInfo])



    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleRateChange = (e) => {
        setProfile({
            ...profile,
            extraInfo: {
                ...profile?.extraInfo,
                hourly_rate: e.target.value
            }
        })
    };

    const handleSaveClick = (e) => {
        setIsEditing(false);
        dispatch(updateTraineeProfileAsync(profile))
    };

    const showRatings = (ratings, extraClasses = "") => {
        const { ratingRatio, totalRating } = Utils.getRatings(ratings);
        return (
            <>
                <div className={extraClasses}>
                    <Star color="#FFC436" size={28} className="star-container star-svg" />
                    <p className="ml-1 mt-1 mr-1 font-weight-light">{ratingRatio || 0}</p>
                    <p className="mt-1">({totalRating || 0})</p>
                </div>
            </>
        );
    };



    const handlePictureChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedImage(selectedFile);
    };
    const handleRemovePreview = () => {
        setSelectedImage(null);
    };

    const handleSavePicture = () => {
        if (selectedImage) {
            handelSelectFile(selectedImage)
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                // Update the UI or store the base64Data as needed
                console.log("Updated profile picture:", base64Data);

                // Save the selectedImage and update the displayedImage after clicking "Save Picture"
                setSelectedImage(null);
                setDisplayedImage(URL.createObjectURL(selectedImage));
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handelSelectFile = async (file) => {
        if (file) {
            if (file instanceof File) {
                const fileSizeLessthan2Mb = Utils.fileSizeLessthan2Mb(file);
                if (fileSizeLessthan2Mb) {
                    let res = await dispatch(uploadProfilePictureAsync({ files: file }));
                    setProfile({
                        ...profile,
                        profile_picture: res?.payload?.url
                    })
                    setImgURL(res?.payload?.url)
                } else {
                    setIsError(!fileSizeLessthan2Mb);
                }
            } else {
                console.error("Invalid file selected.");
            }
        }
        event.stopPropagation();
    };

    useEffect(() => {
        if (imgURL) {
            dispatch(updateTraineeProfileAsync(profile))
        }
    }, [imgURL])


    return (
        <div className="Trainer-box-1">
            <div className="Abc align-items-center justify-content-center">
                <div className="Image-Trainer-Profile">
                    {selectedImage ? (
                        <div className="preview-image">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="selected-image"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                            <button className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={handleRemovePreview}>
                                <X />
                            </button>
                        </div>
                    ) : (
                        <img
                            src={displayedImage}
                            alt="trainer_image"
                            className="rounded trainer-profile"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    )}
                </div>
                <div className="col-7 col-sm-6 col-md-7 col-lg-8 col-xl-9 card-trainer">
                    {accountType === AccountType?.TRAINER && <div div className="Hourly-up">
                        <h3 className="Hourly-rate">
                            Hourly Rate: ${isEditing ? (
                                <input className="Rate-input-box"
                                    type="number"
                                    value={profile?.extraInfo?.hourly_rate}
                                    onChange={handleRateChange}
                                    onBlur={handleSaveClick}
                                />
                            ) : (
                                profile?.extraInfo?.hourly_rate
                            )}
                        </h3>
                        <a
                            className="icon-btn btn-outline-light btn-sm edit-btn Trainer"
                            href="#"
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? <Save /> : <Edit />}
                        </a>
                    </div>}


                    {accountType === AccountType?.TRAINER && showRatings(profile && profile?.ratings, "mt-3 d-flex ml-n2")}
                    {userInfo &&
                        userInfo.extraInfo &&
                        userInfo.extraInfo.social_media_links &&
                        userInfo.extraInfo.social_media_links ? (
                        <SocialMediaIcons
                            profileImageURL={""}
                            social_media_links={userInfo.extraInfo.social_media_links}
                            isvisible={false}
                        />
                    ) : null}
                    <div className="Change-up-button">
                        {!selectedImage && (
                            <>
                                <label htmlFor="profilePictureInput" className="btn btn-primary btn-sm">
                                    Change Picture
                                </label>
                                <input
                                    id="profilePictureInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handlePictureChange}
                                />
                            </>
                        )}
                        {selectedImage && (
                            <button type="button" className="btn btn-success btn-sm" onClick={handleSavePicture}>
                                Save Picture
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div >


    )
}

export default UserInfoCard