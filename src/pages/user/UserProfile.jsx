// import { useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import DashHeader from "../../components/dashboard/DashHeader";
// import { userNav } from "./userNav";
// import { Camera, Mail, Phone, Calendar, Lock } from "lucide-react";
// import { getCurrentUser } from "../../services/api";

// const [profile, setProfile] = useState({
//   username: "",
//   email: "",
//   phone: "",
//   city: "",
//   state: "",
//   gender: "",
// });

// const handleSave = async () => {
//   try {
//     await updateUser(user.uid, profile);
//     alert("Profile updated!");
//   } catch (err) {
//     console.log(err);
//   }
// };
// useEffect(() => {
//   const loadUser = async () => {
//     try {
//       const res = await getCurrentUser();
//       const user = res.data;

//       setProfile({
//         username: user.username,
//         email: user.email,
//         city: user.city,
//         state: user.state,
//         gender: user.gender,
//         phone: "", // optional (if not in DB)
//       });

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   loadUser();
// }, []);


// const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

// return (
//   <DashboardLayout role="User" userName={`${profile.username}`} items={userNav}>
//     <div className="p-6 lg:p-12">
//       <DashHeader
//         eyebrow="Account Settings"
//         title="My"
//         titleAccent="Profile"
//         description="Keep your personal information up to date."
//       />

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Avatar card */}
//         <div className="bg-card border border-border rounded-sm p-8 text-center animate-fade-in-up">
//           <div className="relative inline-block">
//             <div className="h-28 w-28 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-4xl font-bold">
//               {profile.username.charAt(0)}
//             </div>
//             <button className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
//               <Camera className="h-4 w-4" />
//             </button>
//           </div>
//           <h3 className="font-display text-2xl font-semibold text-foreground mt-4">
//             {profile.username}
//           </h3>
//           <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Premium Member</p>

//           <div className="mt-6 pt-6 border-t border-border space-y-3 text-left">
//             <Row icon={Mail} text={profile.email} />
//             <Row icon={Phone} text={profile.phone} />
//             <Row icon={Calendar} text={`Member since Apr 2024`} />
//           </div>
//         </div>

//         {/* Personal info */}
//         <div className="xl:col-span-2 space-y-6">
//           <div className="bg-card border border-border rounded-sm p-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
//             <h3 className="font-display text-xl font-semibold text-foreground mb-5">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* <Field label="First Name" value={profile.firstName} onChange={(v) => setProfile({ ...profile, firstName: v })} />
//                 <Field label="Last Name" value={profile.lastName} onChange={(v) => setProfile({ ...profile, lastName: v })} />
//                 <Field label="Email" type="email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
//                 <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
//                 <Field label="Date of Birth" type="date" value={profile.dob} onChange={(v) => setProfile({ ...profile, dob: v })} /> */}
//               <Field
//                 label="Username"
//                 value={profile.username}
//                 onChange={(v) => setProfile({ ...profile, username: v })}
//               />

//               <Field
//                 label="Email"
//                 type="email"
//                 value={profile.email}
//                 onChange={(v) => setProfile({ ...profile, email: v })}
//               />

//               <Field
//                 label="City"
//                 value={profile.city}
//                 onChange={(v) => setProfile({ ...profile, city: v })}
//               />

//               <Field
//                 label="State"
//                 value={profile.state}
//                 onChange={(v) => setProfile({ ...profile, state: v })}
//               />
//               <div>

//                 <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
//                   Gender
//                 </label>
//                 <select
//                   value={profile.gender}
//                   onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
//                   className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
//                 >
//                   <option>Female</option>
//                   <option>Male</option>
//                   <option>Prefer not to say</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button onClick={handleSave} className="bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
//                 Save Changes
//               </button>
//             </div>
//           </div>

//           <div className="bg-card border border-border rounded-sm p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
//             <div className="flex items-center gap-2 mb-5">
//               <Lock className="h-4 w-4 text-accent" />
//               <h3 className="font-display text-xl font-semibold text-foreground">Change Password</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Field label="Current Password" type="password" value={pwd.current} onChange={(v) => setPwd({ ...pwd, current: v })} />
//               <Field label="New Password" type="password" value={pwd.next} onChange={(v) => setPwd({ ...pwd, next: v })} />
//               <Field label="Confirm" type="password" value={pwd.confirm} onChange={(v) => setPwd({ ...pwd, confirm: v })} />
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button className="bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
//                 Update Password
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </DashboardLayout>
// );


// const Row = ({ icon: Icon, text }) => (
//   <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
//     <Icon className="h-4 w-4 text-accent shrink-0" />
//     <span className="truncate">{text}</span>
//   </div>
// );

// const Field = ({
//   label,
//   value,
//   onChange,
//   type = "text",
// }) => (
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

// export default UserProfile;


import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { userNav } from "./userNav";
import { Camera, Mail, Phone, Calendar, Lock } from "lucide-react";
import { getCurrentUser, updateUser } from "../../services/api";

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
      await updateUser(user.uid, profile);
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
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
              <Row icon={Phone} text={profile.phone} />
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

              <button onClick={handleSave} className="mt-4 bg-primary px-4 py-2">
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