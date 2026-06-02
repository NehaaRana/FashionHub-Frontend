import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { userNav } from "./userNav";
import { Camera, Mail, Phone, Calendar, Lock } from "lucide-react";
import { getCurrentUser, updateUser } from "../../services/api";
import Swal from "sweetalert2";
  const Field = ({ label, value, onChange, type = "text" }) => (
    <div>
      <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
      />
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

  const [pwd, setPwd] = useState({
    current: "",
    next: "",
    confirm: ""
  });

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

  const handleSave = async () => {
    try {
      console.log("Profile Data:", profile);
      await updateUser(user.uid, profile);
        await Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully",
          confirmButtonColor: "#000",
        });
      // alert("Profile updated!");
    } catch (err) {
      console.log(err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update profile",
          confirmButtonColor: "#000",
        });
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

              <div className="grid grid-cols-2 gap-4">

                <Field label="Username"
                  value={profile.username}
                  onChange={(v) => setProfile({ ...profile, username: v })}
                />

                <Field label="Email"
                  value={profile.email}
                  onChange={(v) => setProfile({ ...profile, email: v })}
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
                  value={profile.mobileno}
                  onChange={(v) =>
                    setProfile({ ...profile, mobileno: v })
                  }
                />

                <Field
                  label="Date of Birth"
                  type="date"
                  value={profile.dob}
                  onChange={(v) =>
                    setProfile({ ...profile, dob: v })
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
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button onClick={handleSave} className="mt-4 bg-primary text-white  px-4 py-2">
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;   