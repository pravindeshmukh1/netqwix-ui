import React, { useEffect, useState } from "react";
import SearchableDropdown from "../../app/components/trainee/helper/searchableDropdown";
import {
  getTraineeWithSlotsAsync,
  traineeState,
} from "../../app/components/trainee/trainee.slice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { masterState } from "../../app/components/master/master.slice";
import { params } from "../../app/common/constants";
import Modal from "../../app/common/modal";
import TrainersDetails from "../../app/components/public";
import { bookingsAction } from "../../app/components/common/common.slice";
import { ChevronRight } from "react-feather";

const Category = (masterRecords) => {
  const dispatch = useAppDispatch();
  const { handleSelectedTrainer } = bookingsAction;
  const [query, setQuery] = useState("");
  const { getTraineeSlots } = useAppSelector(traineeState);
  const [getParams, setParams] = useState(params);
  const [selectedTrainer, setSelectedTrainer] = useState({ id: null });
  const [trainerInfo, setTrainerInfo] = useState({
    userInfo: null,
    isOpen: null,
    selectCategory: null,
  });
  const { master } = useAppSelector(masterState);
  const [categoryList, setCategoryList] = useState([]);
  const [listOfTrainers, setListOfTrainers] = useState([]);
  useEffect(() => {
    dispatch(getTraineeWithSlotsAsync(getParams));
  }, [getParams]);

  useEffect(() => {
    const { masterData } = master;
    setCategoryList([]);
    if (masterData && masterData.category && masterData.category.length) {
      const payload = masterData.category.map((category) => {
        return { id: category, name: category, isCategory: true };
      });
      setCategoryList(payload);
    }
  }, [master]);

  useEffect(() => {
    setListOfTrainers(
      getTraineeSlots.map((trainer) => {
        return {
          id: trainer._id,
          background_image: trainer?.profilePicture,
          isActive: true,
          category: trainer?.category,
          name: trainer?.fullname,
          isCategory: false,
          extraInfo: trainer.extraInfo,
        };
      })
    );
  }, [getTraineeSlots]);

  const handleClose = () => {
    setTrainerInfo((prev) => ({
      ...prev,
      isOpen: false,
      userInfo: null,
      selectCategory: null,
    }));
    setParams((prev) => ({
      ...prev,
      search: null,
    }));
  };

  const [containerStyles, setContainerStyles] = useState({
    backgroundColor: "#9d01ac",
    borderRadius: "50%",
    alignItems: "center",
  });

  useEffect(() => {
    const smallScreenStyles = {
      // backgroundImage: 'url(particular_ad_small.png)',
      innerHeight: "200px",
      backgroundColor: "black",
    };

    if (window.innerWidth === 820) {
      setContainerStyles((prevStyles) => ({
        ...prevStyles,
        ...smallScreenStyles,
      }));
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-wrap justify-content-center align-items-center ">
          {masterRecords?.masterRecords?.category?.map((item) => {
            return (
              <span
                class="badge badge-light lg"
                style={{
                  margin: "20px",
                  padding: "18px",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "black",
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div class="container" style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              width: "50%",
              margin: "40px",
              fontSize: "35px",
              color: "black",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            Are you ready to embark on a transformative journey towards your
            personal and professional development?
            <div>
              <button className="btn btn-primary mt-5 d-flex">
                <div>Get Started</div>
                <div className="pl-2">
                  <ChevronRight />
                </div>
              </button>
            </div>
          </div>

          <div
            // style={{
            //   backgroundColor: "#9d01ac",
            //   borderRadius: "50%",
            //   alignItems: "center",

            // }}
            style={containerStyles}
          >
            <div
              style={{ width: "50%", alignItems: "center" }}
              className="my-5 "
            >
              <img
                src="/assets/images/1-removebg 1.png"
                alt="logo"
                style={{
                  maxWidth: "500px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center my-5">
          <SearchableDropdown
            placeholder="Search Trainers..."
            options={[...listOfTrainers, ...categoryList]}
            label="name"
            id="id"
            customClasses={{
              searchBar: "search-bar-trainee",
              searchButton: "search-button-trainee",
              dropdown: "custom-dropdown-width",
            }}
            onSearchClick={(query) => {
              setTrainerInfo((prev) => ({
                ...prev,
                userInfo: null,
                isOpen: true,
                selectCategory: query,
              }));
              setQuery(query);
            }}
            searchValue={(value) => {
              setParams({ search: value });
            }}
            selectedOption={(option) => {
              if (option && option.isCategory) {
                setTrainerInfo((prev) => ({
                  ...prev,
                  userInfo: option,
                  isOpen: true,
                  selectCategory: option.name,
                }));
              } else {
                setTrainerInfo((prev) => ({
                  ...prev,
                  userInfo: option,
                  isOpen: true,
                  selectCategory: null,
                }));
              }
            }}
            handleChange={(value) => {
              setParams({ search: value });
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={trainerInfo.isOpen}
        element={
          <TrainersDetails
            onClose={handleClose}
            selectedOption={trainerInfo}
            categoryList={categoryList}
            key={`trainersDetails`}
            searchQuery={query}
            trainerInfo={trainerInfo.userInfo}
            selectTrainer={(_id) => {
              if (_id) {
                dispatch(handleSelectedTrainer(_id));
                setSelectedTrainer({ ...selectedTrainer, id: _id });
              }
            }}
          />
        }
        allowFullWidth={true}
      />
    </>
  );
};

export default Category;
