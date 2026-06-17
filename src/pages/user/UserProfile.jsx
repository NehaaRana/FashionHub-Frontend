import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { userNav } from "./userNav";
import { Mail, Phone, Calendar } from "lucide-react";
import { getCurrentUser, updateUser } from "../../services/api";
import Swal from "sweetalert2";
// const Field = ({ label, value, onChange, type = "text" }) => (
//   <div>
//     <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
//       {label}
//     </label>

//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
//     />
//   </div>
// );
const Field = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  readOnly = false,
}) => (
  <div>
    <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
      {label}
    </label>

    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2.5 bg-background border rounded-sm font-body text-sm focus:outline-none
      ${error
          ? "border-red-500 focus:border-red-500"
          : "border-border focus:border-accent"
        }`}
    />

    {error && (
      <p className="text-red-500 text-xs mt-1">
        {error}
      </p>
    )}
  </div>
);

const UserProfile = () => {

  const [profile, setProfile] = useState({
    uid: "",
    gid: "",
    username: "",
    email: "",
    mobileno: "",
    city: "",
    state: "",
    gender: "",
    dob: "",
  });
  const [user, setUser] = useState(null);

  // const [pwd, setPwd] = useState({
  //   current: "",
  //   next: "",
  //   confirm: ""
  // });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const Row = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
      <Icon className="h-4 w-4 text-accent shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );


  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        const userData = res.data;

        setUser(userData);

        setProfile({
          uid: userData.uid,
          gid: userData.gid,
          username: userData.username || "",
          email: userData.email || "",
          mobileno: userData.mobileno || "",
          city: userData.city || "",
          state: userData.state || "",
          gender: userData.gender || "",
          dob: userData.dob
            ? userData.dob.split("T")[0]
            : "",
        });

      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Username
    if (!profile.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Email
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profile.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Mobile
    if (profile.mobileno && !/^[0-9]{10}$/.test(profile.mobileno)) {
      newErrors.mobileno = "Mobile number must be 10 digits";
    }

    // DOB future validation
    if (profile.dob) {
      const selectedDate = new Date(profile.dob);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        newErrors.dob = "Date of birth cannot be in future";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
  const handleSave = async () => {

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      const payload = {
        ...profile,
        dob: profile.dob === "" ? null : profile.dob,
      };

      await updateUser(user.uid, payload);

      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        confirmButtonColor: "#000",
      });

    } catch (err) {

      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile",
        confirmButtonColor: "#000",
      });

    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout role="User" userName={profile.username} items={userNav}>
      <div className="p-6 lg:p-12">

        <DashHeader
          eyebrow="Account Settings"
          title="My"
          titleAccent="Profile"
          description="Keep your personal information up to date."
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Avatar */}
          <div className="bg-card border rounded-sm p-8 text-center">
            <div className="h-28 w-28 rounded-full bg-accent flex items-center justify-center text-4xl">
              {profile.username?.charAt(0)}
            </div>

            <h3 className="mt-4 text-xl">{profile.username}</h3>

            <div className="mt-6 space-y-2 text-left">
              <Row icon={Mail} text={profile.email} />
              <Row icon={Phone} text={profile.mobileno} />
              <Row icon={Calendar} text="Member since 2024" />
            </div>
          </div>

          {/* Form */}
          <div className="xl:col-span-2">

            <div className="bg-card border rounded-sm p-6">
              <h3 className="mb-4 text-lg">Personal Info</h3>

              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* <Field label="Username"
                  value={profile.username}
                  onChange={(v) => setProfile({ ...profile, username: v })}
                /> */}
                <Field
                  label="Username"
                  value={profile.username}
                  error={errors.username}
                  // onChange={(v) =>
                  //   setProfile({ ...profile, username: v })
                  // }
                  onChange={(v) => {
                    setProfile({ ...profile, username: v });

                    setErrors((prev) => ({
                      ...prev,
                      username: "",
                    }));
                  }}
                />

                <Field label="Email"
                  value={profile.email}
                  readOnly
                  error={errors.email}
                  // onChange={(v) => setProfile({ ...profile, email: v })}
                  onChange={(v) => {
                    setProfile({ ...profile, email: v });

                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }}
                />

                <Field label="City"
                  value={profile.city}
                  onChange={(v) => setProfile({ ...profile, city: v })}
                />

                <Field label="State"
                  value={profile.state}
                  onChange={(v) => setProfile({ ...profile, state: v })}
                />

                <Field
                  label="Mobile Number"
                  type="tel"
                  value={profile.mobileno}
                  error={errors.mobileno}
                  // onChange={(v) =>
                  //   setProfile({ ...profile, mobileno: v })
                  // }
                  onChange={(v) => {
                    const onlyNumbers = v.replace(/\D/g, "").slice(0, 10);
                    setProfile({ ...profile, mobileno: v });

                    setErrors((prev) => ({
                      ...prev,
                      mobileno: "",
                    }));
                  }}
                />

                <Field
                  label="Date of Birth"
                  type="date"
                  value={profile.dob}
                  error={errors.dob}
                  // onChange={(v) =>
                  //   setProfile({ ...profile, dob: v })
                  // }
                  onChange={(v) => {
                    setProfile({ ...profile, dob: v });

                    setErrors((prev) => ({
                      ...prev,
                      dob: "",
                    }));
                  }}
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
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* <button onClick={handleSave} className="mt-4 bg-primary text-white  px-4 py-2">
                Save Changes
              </button> */}
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-4 bg-primary text-white px-4 py-2 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;   