import React, { useEffect, useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { AccountType, LOCAL_STORAGE_KEYS } from '../../common/constants';
import { authState } from '../auth/auth.slice';
import { useAppSelector } from '../../store';
import Addworkinghour from '../../../containers/leftSidebar/Addworkinghour';
import CalendarPage from '../calendar/calendar';
import MyClips from '../locker/my-clips';
import Reports from '../locker/reports';
import BookingList from '../bookings/BookingList';

const Schedule = ({ activeCenterContainerTab }) => {
    useEffect(() => {
    }, [activeCenterContainerTab])
    return (
        <>
            <Addworkinghour />
            <CalendarPage />
        </>
    )
}
const allTabs = [
    { name: 'My Clips', value: 'myClips', accessBy: [AccountType?.TRAINEE, AccountType?.TRAINER], component: MyClips },
    { name: 'Schedule', value: 'schedule', accessBy: [AccountType?.TRAINER], component: Schedule },
    { name: 'Upcoming Session', value: 'upcomingLesson', accessBy: [AccountType?.TRAINEE, AccountType?.TRAINER], component: BookingList },
    { name: 'Game Plans', value: 'gamePlans', accessBy: [AccountType?.TRAINER, AccountType?.TRAINEE], component: Reports },
];



const NavHomePageCenterContainer = () => {
    const { accountType } = useAppSelector(authState);
    const [activeTab, setActiveTab] = useState(allTabs[0]?.value);



    const toggleTab = (tabValue) => {
        if (activeTab !== tabValue) {
            setActiveTab(tabValue);
        }
    };

    return (
        <>
            <div id='navHomePageCenterContainer'>
                <div className="theme-tab sub-nav">
                    <Nav tabs>
                        {allTabs?.map((el) => (
                            el?.accessBy?.includes(accountType) && <NavItem key={el.value}>
                                <NavLink
                                    className={activeTab === el?.value ? 'activelink' : ''}
                                    onClick={() => toggleTab(el?.value)}
                                >
                                    {el?.name}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </div>
                <div className="file-tab Nav-Home" style={{ color: "black" }}>
                    <TabContent activeTab={activeTab}>
                        {allTabs?.map((el, index) => {
                            return (
                                <TabPane key={index} tabId={el?.value}>
                                    {el?.component ? <el.component key={index} activeCenterContainerTab={activeTab} /> : <h1>{el?.name}</h1>}
                                </TabPane>
                            )
                        })}
                    </TabContent>
                </div>
            </div>
        </>
    );
};

export default NavHomePageCenterContainer;
