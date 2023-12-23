import axios from "axios";
import { createReport, cropImage, getReport, removeImage } from "../videoupload/videoupload.api";
import CropImage from "./cropimage";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Modal from "../../common/modal";
import { Crop, Trash2, X } from "react-feather";
import { Button } from "reactstrap";
import html2canvas from "html2canvas";
import { getS3SignPdfUrl } from "./video.api";



const reportModal = ({
    currentReportData,
    isOpenReport,
    setIsOpenReport,
}) => {

    const [isOpenCrop, setIsOpenCrop] = useState(false);
    const [selectImage, setSelectImage] = useState("")
    const [reportArr, setReportArr] = useState([]);
    const [reportObj, setReportObj] = useState({ title: "", topic: "" });
    const [screenShots, setScreenShots] = useState([]);


    useEffect(() => {
        setScreenShot();
    }, [screenShots?.length])

    useEffect(() => {
        if (currentReportData?.session) getReportData()
    }, [currentReportData?.session])

    const setScreenShot = async () => {

        // var newReportImages = [];

        for (let index = 0; index < screenShots?.length; index++) {
            const element = screenShots[index];
            try {
                const response = await fetch(`https://netquix.s3.ap-south-1.amazonaws.com/${element?.imageUrl}`);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1];
                    reportArr.push({ ...element, imageUrl: `data:image/jpeg;base64,${base64data}` })
                    setReportArr([...reportArr])
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error fetching or converting image:', error);
            }
        }
        // setReportArr([...newReportImages])
    }


    const handleCropImage = async (filename, blob) => {
        var res = await cropImage({ sessions: currentReportData?.session, trainer: currentReportData?.trainer, trainee: currentReportData?.trainee, oldFile: filename })
        if (res?.data?.url) await pushProfilePhotoToS3(res?.data?.url, blob)
        getReportData()
        setIsOpenCrop(false)
    }

    async function pushProfilePhotoToS3(presignedUrl, uploadPhoto) {
        const myHeaders = new Headers({ 'Content-Type': 'image/*' });
        await axios.put(presignedUrl, uploadPhoto, {
            headers: myHeaders,
        })
        return true
    }


    const getReportData = async () => {
        var res = await getReport({ sessions: currentReportData?.session, trainer: currentReportData?.trainer, trainee: currentReportData?.trainee, })
        setScreenShots(res?.data?.reportData)
        setReportObj({ title: res?.data?.title, topic: res?.data?.description })
    }

    const handleRemoveImage = async (filename) => {
        var res = await removeImage({ sessions: currentReportData?.session, trainer: currentReportData?.trainer, trainee: currentReportData?.trainee, filename: filename })
        getReportData()
    }



    var pdf = new jsPDF();

    const generatePDF = async () => {

        const content = document.getElementById("report-pdf")
        content.style.removeProperty("display");

        html2canvas(content).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // Calculate the width of the page
            var pageWidth = pdf.internal.pageSize.width;


            // Calculate the aspect ratio of the canvas
            var aspectRatio = canvas.width / canvas.height;

            // Calculate the height to maintain the aspect ratio
            var imgHeight = pageWidth / aspectRatio;


            pdf.internal.pageSize.height = imgHeight;

            // Add the canvas as an image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
            // pdf.save('yourDocument.pdf');

            // Get the data URL of the PDF
            const generatedPdfDataUrl = pdf.output('dataurlstring');

            // Convert data URL to Blob
            const byteCharacters = atob(generatedPdfDataUrl.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const pdfBlob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/pdf' });

            // Create a File from the Blob
            const pdfFile = new File([pdfBlob], 'generated_pdf.pdf', { type: 'application/pdf' });

            var link = await createUploadLink();
            if (link) pushProfilePDFToS3(link, pdfFile);

            content.style.display = "none";

            var res = await createReport({
                sessions: currentReportData?.session,
                trainer: currentReportData?.trainer,
                trainee: currentReportData?.trainee,
                title: reportObj?.title,
                topic: reportObj?.topic,
                reportData: [...screenShots],
            })
            setIsOpenReport(false)
        })
    };


    const createUploadLink = async () => {
        var payload = { session_id: currentReportData?.session };
        const data = await getS3SignPdfUrl(payload);
        if (data?.url) return data?.url
        else return ""
    }




    async function pushProfilePDFToS3(presignedUrl, uploadPdf) {
        const myHeaders = new Headers({ 'Content-Type': 'application/pdf' });
        axios.put(presignedUrl, uploadPdf, {
            headers: myHeaders,
            onUploadProgress: progressEvent => {
                // const { loaded, total } = progressEvent;
                // const percentCompleted = (loaded / total) * 100;
                // console.log("percentCompletedpercentCompleted", percentCompleted);
            },
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error('Error:', error);
        });
    }


    return <>
        <Modal
            isOpen={isOpenReport}
            element={
                <>
                    <div id="generate-report" className="container media-gallery portfolio-section grid-portfolio">
                        <div className="theme-title  mb-5">
                            <div className="media-body media-body text-right" >
                                <div
                                    className="icon-btn btn-sm btn-outline-light close-apps pointer"
                                    onClick={() => {
                                        setIsOpenReport(false)
                                    }}
                                >
                                    <X />
                                </div>
                            </div>
                            <div className="media d-flex flex-column  align-items-center">
                                <div>
                                    <h2>Report</h2>
                                </div>
                            </div>
                        </div>

                        <div className="theme-tab">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12 p-2" >
                                    <div className="form-group">
                                        <label className="col-form-label">Title</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            onChange={(e) => {
                                                reportObj.title = e.target.value;
                                                setReportObj({ ...reportObj })
                                            }}
                                            value={reportObj.title}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-12 col-xs-12 p-2" >
                                    <div className="form-group">
                                        <label className="col-form-label">Description</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="topic"
                                            placeholder="Topic"
                                            onChange={(e) => {
                                                reportObj.topic = e.target.value;
                                                setReportObj({ ...reportObj })
                                            }}
                                            value={reportObj.topic}
                                        />
                                    </div>
                                </div>
                                {screenShots?.map((sst, i) => {
                                    return <>
                                        <div className="col-md-6 col-sm-12 col-xs-12 p-2" style={{ position: "relative" }}>
                                            <img style={{ width: "100%", height: "100%", maxHeight: "280px", border: "1px solid #ced4da", marginTop: "10px" }}
                                                src={`https://netquix.s3.ap-south-1.amazonaws.com/${sst?.imageUrl}`}
                                                alt="Screen Shot"
                                            />
                                            <div style={{ position: "absolute", bottom: 0 }} >
                                                <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => {
                                                    setSelectImage(sst?.imageUrl)
                                                    setIsOpenCrop(true)
                                                }}>
                                                    <Crop />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 p-2" >
                                            <div className="media-body media-body text-right" >
                                                <div
                                                    className="icon-btn btn-sm btn-outline-light close-apps pointer"
                                                    onClick={() => {
                                                        handleRemoveImage(sst?.imageUrl)
                                                        // var temp = screenShots.filter((st, index) => index !== i)
                                                        // setScreenShots([...temp])
                                                    }}
                                                >
                                                    <Trash2 />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Title</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="title"
                                                    placeholder="Title"
                                                    onChange={(e) => {
                                                        screenShots[i].title = e.target.value;
                                                        setScreenShots([...screenShots])
                                                    }}
                                                    value={screenShots[i]?.title}
                                                />
                                                <label className="col-form-label">Description</label>
                                                <textarea
                                                    rows="4"
                                                    className="form-control"
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
                                                    onChange={(e) => {
                                                        screenShots[i].description = e.target.value;
                                                        setScreenShots([...screenShots])
                                                    }}
                                                    value={screenShots[i]?.description}
                                                />
                                            </div>
                                        </div>
                                    </>
                                })}
                            </div>
                            <div className="d-flex justify-content-center w-100 p-3">
                                <Button className="mx-3" color="primary" onClick={() => { generatePDF() }}>Save</Button>
                            </div>
                        </div>

                        <div id="report-pdf" style={{ display: "none", padding: "30px 0px" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ textTransform: 'uppercase', marginTop: '0px', fontSize: '40px', fontWeight: '600' }}>Game Plan</p>
                            </div>
                            <div>
                                <h2 style={{ margin: '0px' }}>Topic: {reportObj?.title}</h2>
                                <h2 style={{ margin: '0px' }}>NAME: {reportObj?.topic}</h2>
                            </div>
                            <hr style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'brown' }} />
                            {reportArr?.map((sst, i) => {
                                return <>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img src={sst?.imageUrl} alt="image" style={{ height: '260px', width: '240px', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '30px', fontWeight: '600', margin: '0px' }}>TIP #{i + 1} {screenShots[i]?.title}</p>
                                            <p>{screenShots[i]?.description}</p>
                                        </div>
                                    </div>
                                    <hr style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'brown' }} />
                                </>
                            })}
                        </div>
                    </div>
                    <CropImage
                        isOpenCrop={isOpenCrop}
                        setIsOpenCrop={setIsOpenCrop}
                        selectImage={selectImage}
                        screenShots={screenShots}
                        setScreenShots={setScreenShots}
                        handleCropImage={handleCropImage}
                    />
                </>
            }
        />
    </>
}


export default reportModal;