/**
 * React Functional Component : "ReviewAdd"
 * Purpose : Renders form to add a review
 * State Manager : ReviewReducer
 */

import React, { useEffect, useState } from "react";
import {
  CSpinner,
  CInput,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CButton,
  CSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { renderEmployees } from "src/views/reviews/common";
import { useSelector, useDispatch } from "react-redux";
import {
  addReviewInfo,
  getEmployeeListing,
  unsetLastAddedReviewId,
} from "src/redux/actions";

const ReviewAdd = () => {
  const history = useHistory();
  let waitForServer = useSelector((state) => state.ReviewReducer.waitForServer);
  let [employees, setEmployees] = useState([]);
  let [from, setFrom] = useState(0);
  let [to, setTo] = useState(0);
  let [year, setYear] = useState(2021);
  let [quarter, setQuarter] = useState(3);

  useEffect(() => {
    dispatch(getEmployeeListing({}));
  }, [dispatch]);

  const empListingData = useSelector(
    (state) => state.EmployeeReducer.empListingData
  );

  useEffect(() => {
    if (empListingData) {
      setEmployees(empListingData);
    }
  }, [empListingData]);

  let lastAddedReviewId = useSelector(
    (state) => state.ReviewReducer.lastAddedReviewId
  );

  const dispatch = useDispatch();

  let saveReviewInfo = () => {
    if (waitForServer !== true && from && to) {
      dispatch(
        addReviewInfo({
          from_emp: from,
          to_emp: to,
          year: year,
          quarter: quarter,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(unsetLastAddedReviewId());
    };
  }, [1]);

  useEffect(() => {
    if (lastAddedReviewId > 0) {
      history.push("/review/" + lastAddedReviewId);
    }
  }, [lastAddedReviewId]);

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>Submit Review Request</h1>

                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      From
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    type="text"
                    placeholder="From"
                    autoComplete="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option>Select reviewer</option>
                    {renderEmployees(employees)}
                  </CSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      To
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    type="text"
                    placeholder="To"
                    autoComplete="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option>Select reviewee</option>
                    {renderEmployees(employees)}
                  </CSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Year
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Year"
                    autoComplete="year"
                    readOnly={true}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Quarter
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Quarter"
                    autoComplete="quarter"
                    readOnly={true}
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                  />
                </CInputGroup>
                <CButton
                  color={
                    waitForServer || !from || !to ? "secondary" : "primary"
                  }
                  block
                  onClick={saveReviewInfo}
                >
                  Add{" "}
                  <CSpinner
                    hidden={waitForServer !== true}
                    color="success"
                    size="sm"
                  ></CSpinner>
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ReviewAdd;
