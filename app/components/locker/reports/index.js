import { useEffect, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { videouploadAction, videouploadState } from "../../../../app/components/videoupload/videoupload.slice";
import { authAction, authState } from "../../../../app/components/auth/auth.slice";
import { myClips, reports, traineeClips } from "../../../../containers/rightSidebar/fileSection.api";
import { AccountType, LOCAL_STORAGE_KEYS } from "../../../common/constants";
import Modal from "../../../common/modal";
import ReportModal from "../../../../app/components/video/reportModal";
import { X } from "react-feather";


const Reports = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: "#" + "my-test-gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();

        let lightbox2 = new PhotoSwipeLightbox({
            gallery: "#" + "my-gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox2.init();

        let lightbox3 = new PhotoSwipeLightbox({
            gallery: "#" + "gallery8",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox3.init();
        let lightbox4 = new PhotoSwipeLightbox({
            gallery: "#" + "gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox4.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
            lightbox2.destroy();
            lightbox2 = null;
            lightbox3.destroy();
            lightbox3 = null;
            lightbox4.destroy();
            lightbox4 = null;
        };
    }, []);
    const { isOpen } = useAppSelector(videouploadState);
    const [activeTab, setActiveTab] = useState("media");
    const [reportsData, setReportsData] = useState([]);
    const [isOpenPDF, setIsOpenPDF] = useState(false);
    const [reportName, setReportName] = useState("");
    const [isOpenReport, setIsOpenReport] = useState(false);
    const { sidebarLockerActiveTab, accountType } = useAppSelector(authState);
    const [currentReportData, setCurrentReportData] = useState({})



    const [videoDimensions, setVideoDimensions] = useState({ width: "470px", height: "587px" });

    useEffect(() => {
        setActiveTab(sidebarLockerActiveTab)
        if (sidebarLockerActiveTab === "report") {
            var temp = reportsData
            temp = temp.map((vl, i) => { return i === 0 ? { ...vl, show: true } : { ...vl, show: false } })
            setReportsData([...temp])
        }
    }, [sidebarLockerActiveTab])

    const handleVideoLoad = (event) => {
        const video = event.target;
        const aspectRatio = video.videoWidth / video.videoHeight;

        // Set width and height based on aspect ratio
        if (aspectRatio > 1) {
            setVideoDimensions({ width: "100%", height: "70%" });
        } else {
            setVideoDimensions({ width: "470px", height: "587px" });
        }
    };

    useEffect(() => {
        if (!isOpen) getMyClips()
    }, [isOpen])


    const getMyClips = async () => {
        var res3 = await reports({})
        var temp = res3?.result
        temp = temp.map(vl => { return { ...vl, show: true } })
        setReportsData([...temp])
    }

    return (
        <div className="media-gallery portfolio-section grid-portfolio">
            {reportsData?.length ? reportsData?.map((cl, ind) =>
                <div className={`collapse-block ${!cl?.show ? "" : "open"}`}>
                    <h5
                        className="block-title"
                        onClick={() => {
                            // var temp = reportsData
                            // temp = temp.map(vl => { return { ...vl, show: false } })
                            // temp[ind].show = true
                            // setReportsData([...temp])
                        }}
                    >
                        <label className="badge badge-primary sm ml-2">{`${cl?._id?.day}/${cl?._id?.month}/${cl?._id?.year}`}</label>
                    </h5>
                    {/*  NORMAL  STRUCTURE END  */}
                    <div className={`block-content ${!cl?.show ? "d-none" : "d-flex flex-wrap"}`}>
                        {cl?.report.map((clp, index) => (
                            <div className={`col-6`} key={index} style={{ whiteSpace: "nowrap" }}>
                                <div className="ml-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ marginBottom: "5px" }}>
                                        <dd
                                            className="ml-3"
                                            style={{ cursor: "pointer", textAlign: "center" }}
                                            onClick={() => {
                                                if (accountType === "Trainer") {
                                                    setCurrentReportData({ session: clp?.session?._id, trainer: clp?.trainer?._id, trainee: clp?.trainee?._id })
                                                    setIsOpenReport(true)
                                                } else {
                                                    setIsOpenPDF(true)
                                                    setReportName(clp?.session?.report)
                                                }
                                            }}
                                        >
                                            <img
                                                src="/icons/FileSee.png" // Adjust the path to your PNG icon
                                                alt="FileSee Icon"
                                                style={{ width: "30px", height: "30px" }} // Adjust the size accordingly
                                            />
                                            {accountType === "Trainer" ? "" : ""}
                                        </dd>
                                    </div>
                                    <div>
                                        <dd>{index + 1}. {accountType === AccountType?.TRAINER ? AccountType?.TRAINEE : AccountType?.TRAINER} : <strong>{clp?.[accountType === AccountType?.TRAINER ? "trainee" : "trainer"]?.fullname}</strong></dd>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            ) : <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <h5 className="block-title">  No Data Found</h5>
            </div>}


            <Modal
                isOpen={isOpenPDF}
                element={
                    <>
                        <div className="container media-gallery portfolio-section grid-portfolio ">
                            <div className="theme-title">
                                <div className="media">
                                    <div className="media-body media-body text-right">
                                        <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setIsOpenPDF(false) }} > <X /> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column  align-items-center">
                                <h1 className="p-3">Report</h1>
                                <embed src={`https://netquix.s3.ap-south-1.amazonaws.com/${reportName}`} width="100%" height="500px" allowfullscreen />
                            </div>
                            <div className="justify-content-center">
                            </div>
                        </div>
                    </>
                }
            />


            <ReportModal
                currentReportData={currentReportData}
                isOpenReport={isOpenReport}
                setIsOpenReport={setIsOpenReport}
            />

        </div>
    )
}

export default Reports