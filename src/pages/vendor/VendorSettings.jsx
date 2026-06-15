// VendorSettings.jsx

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { vendorItems } from "../../components/vendor/vendorNav";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";

import { getCurrentUser, updateVendor, changeVendorPassword } from "../../services/api";
import Swal from "sweetalert2";

const Row = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
    <Icon className="h-4 w-4 text-accent shrink-0" />
    <span className="truncate">{text}</span>
  </div>
);

const Field = ({ label, value, onChange, type = "text",readOnly = false, }) => (
  <div>
    <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
      {label}
    </label>

    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
    />
  </div>
);
const VendorSettings = () => {

  const [profile, setProfile] = useState({
    vid: "",
    gid: "",
    vendorname: "",
    brandname: "",
    ownername: "",
    email: "",
    mobileno: "",
    city: "",
    state: "",
    gender: "",
    specialization: "",
    approvedByAdmin: "",
    createdAt: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // vendor Save data
  // const handleSave = async () => {

  //   try {

  //     await updateVendor(profile.vid, profile);

  //     alert("Profile Updated Successfully");

  //   } catch (err) {

  //     console.log(err);

  //     alert("Failed To Update Profile");
  //   }
  // };

  const handleSave = async () => {

    try {

      await updateVendor(profile.vid, profile);

      // fetch updated vendor
      const res = await getCurrentUser();

      const vendor = res.data;

      setProfile({
        vid: vendor.vid || "",
        gid: vendor.gid || "",
        vendorname: vendor.vendorname || "",
        brandname: vendor.brandname || "",
        ownername: vendor.ownername || "",
        email: vendor.email || "",
        mobileno: vendor.mobileno || "",
        city: vendor.city || "",
        state: vendor.state || "",
        gender: vendor.gender || "",
        specialization: vendor.specialization || "",
        approvedByAdmin: vendor.approvedByAdmin || "",
        createdAt: vendor.createdAt
          ? vendor.createdAt.split("T")[0]
          : "",
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Vendor profile updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      // alert("Profile Updated Successfully");

    } catch (err) {

      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update vendor profile",
        confirmButtonColor: "#c08a5b",
      });
      // alert("Failed To Update Profile");
    }
  };

  const navigate = useNavigate();
  const handlePasswordChange = async () => {

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New password and confirm password do not match",
      });

      return;
    }

    try {

      await changeVendorPassword(profile.vid, passwordData);

      Swal.fire({
        icon: "success",
        title: "Password changed successfully",
        text: "Please login again with your new password",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

      }, 2000);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Failed to change password",
      });
    }
  };

  useEffect(() => {

    const loadVendor = async () => {

      try {

        const res = await getCurrentUser();

        const vendor = res.data;

        setProfile({
          vid: vendor.vid || "",
          gid: vendor.gid || "",
          vendorname: vendor.vendorname || "",
          brandname: vendor.brandname || "",
          ownername: vendor.ownername || "",
          email: vendor.email || "",
          mobileno: vendor.mobileno || "",
          city: vendor.city || "",
          state: vendor.state || "",
          gender: vendor.gender || "",
          specialization: vendor.specialization || "",
          approvedByAdmin: vendor.approvedByAdmin || "",
          createdAt: vendor.createdAt
            ? vendor.createdAt.split("T")[0]
            : "",
        });

      } catch (err) {
        console.log(err);
      }
    };

    loadVendor();

  }, []);

  return (

    <DashboardLayout
      role="Vendor"
      userName={profile.ownername}
      items={vendorItems}
    >


      <div className="p-6 lg:p-12">

        <DashHeader
          eyebrow="Store Settings"
          title="Vendor"
          titleAccent="Profile"
          description="Keep your store information up to date."
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Avatar Card */}

          <div className="bg-card border rounded-sm p-8 text-center">

            <div className="h-28 w-28 rounded-full bg-accent flex items-center justify-center text-4xl text-white mx-auto">
              {profile.vendorname?.charAt(0)}
            </div>

            <h3 className="mt-4 text-xl">
              {profile.vendorname}
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              {profile.brandname}
            </p>

            <div className="mt-6 space-y-2 text-left">

              <Row icon={Mail} text={profile.email} />

              <Row icon={Phone} text={profile.mobileno} />

              <Row
                icon={Calendar}
                text={`Joined ${profile.createdAt}`}
              />

            </div>

          </div>

          {/* Form */}

          <div className="xl:col-span-2">

            <div className="bg-card border rounded-sm p-6">

              <h3 className="mb-4 text-lg">
                Store Information
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <Field
                  label="Vendor Name"
                  value={profile.vendorname}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      vendorname: v,
                    })
                  }
                />

                <Field
                  label="Brand Name"
                  value={profile.brandname}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      brandname: v,
                    })
                  }
                />

                <Field
                  label="Owner Name"
                  value={profile.ownername}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      ownername: v,
                    })
                  }
                />

                <Field
                  label="Email"
                  value={profile.email}
                  readOnly
                />

                <Field
                  label="City"
                  value={profile.city}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      city: v,
                    })
                  }
                />

                <Field
                  label="State"
                  value={profile.state}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      state: v,
                    })
                  }
                />

                <Field
                  label="Mobile Number"
                  value={profile.mobileno}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      mobileno: v,
                    })
                  }
                />

                <Field
                  label="Specialization"
                  value={profile.specialization}
                  onChange={(v) =>
                    setProfile({
                      ...profile,
                      specialization: v,
                    })
                  }
                />

                <div>

                  <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
                    Gender
                  </label>

                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-sm"
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              <button
                onClick={handleSave}
                className="mt-4 bg-primary px-4 py-2 text-white rounded-sm">
                Save Changes
              </button>

            </div>

          </div>

        </div>
        <div className="bg-card border rounded-sm p-6 mt-6">

          <h3 className="mb-4 text-lg">
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
                Current Password
              </label>

              {/* <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 bg-background border border-border rounded-sm"
              /> */}
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 pr-10 bg-background border border-border rounded-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
                New Password
              </label>

              {/* <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 bg-background border border-border rounded-sm"
              /> */}
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 pr-10 bg-background border border-border rounded-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
                Confirm Password
              </label>

              {/* <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 bg-background border border-border rounded-sm"
              /> */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 pr-10 bg-background border border-border rounded-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

          </div>

          <button
            onClick={handlePasswordChange}
            className="mt-4 bg-primary px-4 py-2 text-white rounded-sm"
          >
            Change Password
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default VendorSettings;