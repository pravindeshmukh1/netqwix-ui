import React, { useState } from 'react'
import NavHomePageCenterContainer from './NavHomePageCenterContainer'
import "./index.scss"
import ShareClipsCard from '../share-clips'
import UploadClipCard from '../videoupload/UploadClipCard'
import InviteFriendsCard from '../invite-friends'
import RecentUsers from '../recent-users'
import UserInfoCard from '../cards/user-card'
import { useMediaQuery } from '../../hook/useMediaQuery'

const NavHomePage = () => {
    const [progress, setProgress] = useState(0)
    const width2000 = useMediaQuery(2000)
    const width1200 = useMediaQuery(1200)
    const width600 = useMediaQuery(600)
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Right side */}
                <div className={`${width600 ? "col-sm-12" : width1200 ? "row" : width2000 ? "col-sm-3" : ""}  my-3`} style={{ width: "auto !important" }}>
                    <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-6" : width2000 ? "col-sm-12" : ""}`}>
                        <UserInfoCard />
                    </div>
                    <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-6" : width2000 ? "col-sm-12" : ""} my-3`}>
                        <div className='card trainer-profile-card Home-main-Cont' style={{ height: "100%", width: "100%", color: "black" }}>
                            <div className='card-body'>
                                <RecentUsers />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Middle */}
                <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-12" : width2000 ? "col-sm-6" : ""} my-3`} style={{ width: "auto !important", padding: "0px" }}>
                    <div className='card trainer-profile-card Home-main-Cont' style={{ height: "100%", width: "100%", overflow: "auto" }}>
                        <div className='card-body'>
                            <NavHomePageCenterContainer />
                        </div>
                    </div>
                </div>

                {/* Left side */}
                <div className={`${width600 ? "col-sm-12" : width1200 ? "row" : width2000 ? "col-sm-3" : ""}`} style={{ width: "auto !important" }}>
                    <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-6" : width2000 ? "col-sm-12" : ""} my-3`}>
                        <div className='card trainer-profile-card Home-main-Cont' style={{ height: "100%", width: "100%" }}>
                            <div className='card-body'>
                                <UploadClipCard progress={progress} setProgress={setProgress} />
                            </div>
                        </div>
                    </div>
                    <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-6" : width2000 ? "col-sm-12" : ""} my-3`}>
                        <div className='card trainer-profile-card Home-main-Cont' style={{ height: "100%", width: "100%" }}>
                            <div className='card-body'>
                                <ShareClipsCard />
                            </div>
                        </div>
                    </div>
                    <div className={`${width600 ? "col-sm-12" : width1200 ? "col-sm-6" : width2000 ? "col-sm-12" : ""} my-3`}>
                        <div className='card trainer-profile-card Home-main-Cont' style={{ height: "100%", width: "100%" }}>
                            <div className='card-body'>
                                <InviteFriendsCard />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default NavHomePage