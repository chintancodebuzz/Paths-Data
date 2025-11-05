
import editbtn from "../../../assets/images/edit-btn.png";
import { useNavigate } from "react-router-dom";
// import { authorizationHeaders, Axios } from "../../helper/Axios";
import { useState } from "react";
import "../../../styles/cluster.css";
import "../../../styles/forms.css";

const AddCrossAccountIAMRole = () => {
  const navigate = useNavigate();

  const [subscriptionData, setSubscriptionData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);

  // const GetProfileData = async () => {
  //   try {
  //     const res = await Axios.get(`/profile`, authorizationHeaders());
  //     // console.log("profile++", res);

  //     if (res?.data?.statusCode === 200) {
  //       setProfileData(res?.data?.data);
  //     } else {
  //       toast.error(res.data?.message);
  //     }
  //   } catch (err) {
  //     console.error("Error Profile++", err);

  //     if (err?.message === "Network Error") {
  //       toast.error(err?.message);
  //     }
  //     if (err?.response?.data?.statusCode === "440") {
  //       toast.error("Session expired. Please log in again.");
  //       localStorage.clear();
  //       navigate("/sign-in");
  //     } else {
  //       toast.error(err?.response?.data?.message || "An error occurred");
  //     }
  //   }
  // };

  // const GetSubscriptionData = async () => {
  //   try {
  //     const res = await Axios.get(`/subscription`, authorizationHeaders());
  //     console.log("networkres", res);

  //     if (res.data?.statusCode === 200) {
  //       setSubscriptionData(res.data.data);
  //     } else {
  //       toast.error(res.data?.message);
  //     }
  //   } catch (err) {
  //     console.error("Error subscription++", err);

  //     if (err?.message === "Network Error") {
  //       // toast.error(err?.message);
  //     }
  //     if (err?.response?.data?.statusCode === "440") {
  //       toast.error("Session expired. Please log in again.");
  //       localStorage.clear();
  //       localStorage.setItem("openCloudOption", false);
  //       navigate("/sign-in");
  //     } else {
  //       toast.error(err?.response?.data?.message || "An error occurred");
  //     }
  //   }
  // };

  // const handleUpgrade = () => {
  //   navigate("/subscription-upgrade", {
  //     state: { plan: subscriptionData?.subscription_type, account: true },
  //   });
  // };

  // const handleCancel = async () => {
  //   try {
  //     const res = await Axios.delete(`/subscription`, authorizationHeaders());
  //     if (res?.data?.statusCode === 200) {
  //       toast.success(res.data?.message);
  //       GetSubscriptionData();
  //     } else {
  //       if (err?.message === "Network Error") {
  //         toast.error(err?.message);
  //       }
  //       if (err?.response?.data?.statusCode === "440") {
  //         toast.error("Session expired. Please log in again.");
  //         localStorage.clear();
  //         localStorage.setItem("openCloudOption", false);
  //         navigate("/sign-in");
  //       } else {
  //         toast.error(err?.response?.data?.message || "An error occurred");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error Delete resourcesIAM++", err);
  //   }
  // };

  // useEffect(() => {
  //   GetSubscriptionData();

  //   GetProfileData();
  // }, []);

  const handleSubmit = async () => {};

  const handleCancel = () => {
    navigate(-1);
    localStorage.removeItem("subnets");
    localStorage.removeItem("Securitygroup");
  };

  return (
    <>
      <section className="setting-sec pd">
        <div className="setting-form">
          <div className="">
            <div className="add-title d-flex justify-content-between align-items-center">
              <div>Create Cross Account IAM Role</div>

              <div>
                <img
                  src={editbtn}
                  alt="Edit"
                  className="me-4 cursor-pointer"
                  onClick={() => navigate("/edit-profile")}
                />
              </div>
            </div>
            <form className="row mt-4">
              <div className="col-lg-6 mb-3 mb-lg-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Please enter name"
                    value={profileData?.name || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-3 mb-lg-4">
                <label htmlFor="iam_role" className="form-label">
                  Cross Account IAM Role{" "}
                </label>
                <div className="add-input">
                  <input
                    type="text"
                    id="iam_role"
                    name="iam_role"
                    placeholder="Please enter cross account iam role"
                    value={profileData?.iam_role || ""}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center py-5">
        <button
          className="cancel-button me-2 me-md-4"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`save-button ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-3 ms-3"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </>
  );
};
export default AddCrossAccountIAMRole;
