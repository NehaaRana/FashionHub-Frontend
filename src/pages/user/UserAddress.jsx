import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import Modal from "../../components/admin/Modal";
import { userNav } from "./userNav";
import { Plus, Pencil, Trash2, Home, Briefcase, MapPin } from "lucide-react";

// interface Address {
//   id: string;
//   label: string;
//   type: "Home" | "Work" | "Other";
//   name: string;
//   phone: string;
//   line1: string;
//   line2?: string;
//   city: string;
//   state: string;
//   pincode: string;
//   isDefault?: boolean;
// }

const initial = [
  {
    id: "1",
    label: "Home",
    type: "Home",
    name: "Priya Iyer",
    phone: "+91 98765 43210",
    line1: "204, Lotus Residency",
    line2: "Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    type: "Work",
    name: "Priya Iyer",
    phone: "+91 98765 43210",
    line1: "Tower B, 14th Floor",
    line2: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
  },
];

const empty = {
  id: "",
  label: "",
  type: "Home",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const typeIcon = { Home, Work: Briefcase, Other: MapPin };

const UserAddresses = () => {
  const [list, setList] = useState(initial);
  const [edit, setEdit] = useState(null);

  const save = () => {
    if (!edit) return;
    if (edit.id) setList((s) => s.map((a) => (a.id === edit.id ? edit : a)));
    else setList((s) => [...s, { ...edit, id: Date.now().toString() }]);
    setEdit(null);
  };

  const remove = (id) => setList((s) => s.filter((a) => a.id !== id));
  const setDefault = (id) =>
    setList((s) => s.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <DashboardLayout role="User" userName="Priya Iyer" items={userNav}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Delivery Locations"
          title="Saved"
          titleAccent="Addresses"
          description="Manage where your fashion arrives."
        />

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setEdit(empty)}
            className="bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold px-5 py-3 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {list.map((a) => {
            const Icon = typeIcon[a.type];
            return (
              <div
                key={a.id}
                className="bg-card border border-border rounded-sm p-6 hover:border-accent transition-colors animate-fade-in-up"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{a.label}</h3>
                      {a.isDefault && (
                        <span className="font-body text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEdit(a)}
                      className="p-2 rounded-sm hover:bg-secondary text-muted-foreground hover:text-accent"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(a.id)}
                      className="p-2 rounded-sm hover:bg-secondary text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="font-body text-sm text-foreground space-y-0.5">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-muted-foreground">{a.line1}</p>
                  {a.line2 && <p className="text-muted-foreground">{a.line2}</p>}
                  <p className="text-muted-foreground">
                    {a.city}, {a.state} — {a.pincode}
                  </p>
                  <p className="text-muted-foreground pt-1">{a.phone}</p>
                </div>
                {!a.isDefault && (
                  <button
                    onClick={() => setDefault(a.id)}
                    className="mt-4 font-body text-[11px] uppercase tracking-[0.18em] text-accent font-semibold hover:underline"
                  >
                    Set as default
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? "Edit Address" : "Add Address"}>
        {edit && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Label" value={edit.label} onChange={(v) => setEdit({ ...edit, label: v })} />
              <div>
                <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
                  Type
                </label>
                <select
                  value={edit.type}
                  onChange={(e) => setEdit({ ...edit, type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <Field label="Full Name" value={edit.name} onChange={(v) => setEdit({ ...edit, name: v })} />
            <Field label="Phone" value={edit.phone} onChange={(v) => setEdit({ ...edit, phone: v })} />
            <Field label="Address Line 1" value={edit.line1} onChange={(v) => setEdit({ ...edit, line1: v })} />
            <Field label="Address Line 2" value={edit.line2 ?? ""} onChange={(v) => setEdit({ ...edit, line2: v })} />
            <div className="grid grid-cols-3 gap-3">
              <Field label="City" value={edit.city} onChange={(v) => setEdit({ ...edit, city: v })} />
              <Field label="State" value={edit.state} onChange={(v) => setEdit({ ...edit, state: v })} />
              <Field label="Pincode" value={edit.pincode} onChange={(v) => setEdit({ ...edit, pincode: v })} />
            </div>
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setEdit(null)}
                className="flex-1 border border-border font-body text-xs uppercase tracking-[0.15em] font-semibold py-3 rounded-sm hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="flex-1 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold py-3 rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

const Field = ({ label, value, onChange }) => (
  <div>
    <label className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
    />
  </div>
);

export default UserAddresses;
