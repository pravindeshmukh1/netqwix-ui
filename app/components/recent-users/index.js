import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import { authState } from '../auth/auth.slice';
import { AccountType, LOCAL_STORAGE_KEYS } from '../../common/constants';
import { getRecentStudent, getTraineeClips } from '../NavHomePage/navHomePage.api';
import Modal from '../../common/modal';
import { X } from 'react-feather';
import StudentDetail from '../Header/StudentTab/StudentDetail';

const placeholderImageUrl = '/assets/images/avtar/user.png'; // Placeholder image path

// Array.from({ length: 10 }, () => placeholderImageUrl)

const RecentUsers = () => {
    const [accountType, setAccountType] = useState('');
    const [recentStudent, setRecentStudent] = useState([]);
    const [recentFriends, setRecentFriends] = useState(Array.from({ length: 10 }, () => placeholderImageUrl));
    const [recentStudentClips, setRecentStudentClips] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudentData, SetselectedStudentData] = useState({})


    useEffect(() => {
        getRecentStudentApi()
        setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS?.ACC_TYPE))
    }, [])

    const getRecentStudentApi = async () => {
        try {
            let res = await getRecentStudent()
            setRecentStudent(res?.data)
            console.log("resresresresresresres", res)
        } catch (error) {
            console.log(error)
        }
    }
    const getTraineeClipsApi = async (id) => {
        try {
            let res = await getTraineeClips({ trainer_id: id })
            setRecentStudentClips(res?.data)
            console.log("getTraineeClipsApi==============>", res)
        } catch (error) {
            console.log(error)
        }
    }
    const handleStudentClick = (id) => {
        setRecentStudentClips(null);
        setIsOpen(true);
        getTraineeClipsApi(id)
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setRecentStudentClips(null);
    };





    return (
        <div className="card rounded trainer-profile-card Select Recent Student">
            <div className="card-body Recent">
                <div style={{ justifyContent: 'center' }}>
                    <h2 className="Recent-Heading" style={{ textAlign: 'center' }}>
                        Recent {accountType === AccountType?.TRAINER ? 'Students' : 'Friends'}
                    </h2>
                </div>
                <div className="row" style={{ justifyContent: 'center', paddingTop: '15px' }}>
                    <div
                        className="image-gallery"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            paddingTop: '15px',
                            width: '100%',
                            justifyContent: 'center',
                            overflowY: 'auto',
                            maxHeight: '53vh',
                        }}
                    >
                        {/* Render images dynamically */}
                        {accountType === AccountType?.TRAINER && recentStudent?.map((item, index) => (
                            <img
                                key={index}
                                src={item?.profile_picture}
                                alt={`Recent Trainee ${index + 1}`}
                                style={{
                                    width: '6vw',
                                    height: '20vh',
                                    marginBottom: '10px',
                                    marginRight: '10px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    handleStudentClick(item)
                                    SetselectedStudentData({ ...item })
                                }}

                            />
                        ))}

                        {accountType === AccountType?.TRAINEE && recentFriends?.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt={`Recent Trainee ${index + 1}`}
                                style={{
                                    width: '6vw',
                                    height: '20vh',
                                    marginBottom: '10px',
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleStudentClick({ profile_picture: item })}
                            />
                        ))}
                    </div>
                </div>
                {/* Additional content for Recent Students section can be added here */}
            </div>
            {accountType === AccountType?.TRAINER && (
                <Modal
                    isOpen={isOpen}
                    element={
                        <div className="container media-gallery portfolio-section grid-portfolio ">
                            <div className="theme-title">
                                <div className="media">
                                    <div className="media-body media-body text-right">
                                        <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={handleCloseModal}>
                                            <X />
                                        </div>
                                    </div>
                                </div>
                                <StudentDetail videoClips={recentStudentClips} data={selectedStudentData} />
                            </div>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default RecentUsers;
