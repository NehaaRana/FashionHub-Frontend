import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
// import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import {
  Package,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCurrentUser
} from "../../services/api";
import Swal from "sweetalert2";



const emptyForm = {
  productName: "",
  description: "",
  price: "",
  discount: "",
  fabric: "",
  color: "",
  size: "",
  stock: "",
  cid: "",
  image: null,
  images: [],
  colorImages: {},
  isActive: true,
};
const ProductManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();

  }, []);

  const [showColors, setShowColors] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const [mainPreview, setMainPreview] = useState(null);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [colorPreviews, setColorPreviews] = useState({});
  const [vendorName, setVendorName] = useState("");

  const fetchProducts = async () => {
    try {

      // GET CURRENT LOGGED IN VENDOR
      const userRes = await getCurrentUser();
      const currentVendor = userRes.data;

      setVendorName(
        currentVendor.ownername
      );

      console.log("CURRENT VENDOR:", currentVendor);

      // GET VENDOR ID
      const vendorId =
        currentVendor.vid ||
        currentVendor.Vid;

      // FETCH PRODUCTS
      const res = await getVendorProducts(vendorId);

      console.log("PRODUCTS:", res.data);

      const formatted = res.data.map((p) => ({
        id: p.pid,
        productName: p.productName,
        vendorName: p.vendorName || p.vendor?.vendorName || "Vendor",
        description: p.description,
        price: p.price,
        discount: p.discount,
        fabric: p.fabric,
        color: p.color,
        size: p.size,
        stock: p.stock,
        cid: p.cid,
        isActive: p.isActive,

        image: p.productImage
          ? `https://localhost:7106${p.productImage}`
          : "/placeholder.png",
        productImages: p.productImages,
      }));

      setRows(formatted);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      //  Only ACTIVE categories
      const activeCategories = res.data.filter(cat => cat.isActive === true);

      console.log("CATEGORIES:", res.data)
      setCategories(activeCategories);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch = r.productName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ||
        (filter === "Active" && r.isActive) ||
        (filter === "Hidden" && !r.isActive);

      return matchSearch && matchFilter;
    });
  }, [rows, search, filter]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      active: rows.filter((r) => r.isActive).length,
    };
  }, [rows]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);

    setMainPreview(null);
    setExtraPreviews([]);
    setColorPreviews({});
    setModalOpen(true);
  };

  const openEdit = (p) => {

    let parsedData = {};
    let parsedColorImages = {};
    let galleryImages = [];

    try {

      parsedData = p.productImages
        ? JSON.parse(p.productImages)
        : {};

      galleryImages = parsedData.gallery || [];

      parsedColorImages = parsedData.colors || {};
      console.log("PARSED GALLERY:", galleryImages);
      console.log("PARSED COLORS:", parsedColorImages);


    } catch (err) {

      console.log("JSON PARSE ERROR:", err);

      parsedColorImages = {};
      galleryImages = [];
    }

    setEditing(p);

    setForm({
      ...p,
      image: null,
      // images: [],
      images: galleryImages,
      colorImages: parsedColorImages,
    });

    setMainPreview(p.image);

    // GALLERY PREVIEWS
    setExtraPreviews(
      galleryImages.map(
        (img) => `https://localhost:7106${img}`
      )
    );

    // COLOR PREVIEWS
    const formattedColorPreviews = {};

    for (const color in parsedColorImages) {

      formattedColorPreviews[color] =
        parsedColorImages[color].map(
          (img) => `https://localhost:7106${img}`
        );
    }

    setColorPreviews(formattedColorPreviews);

    setModalOpen(true);
  };
  const handleSave = async () => {
    try {
      if (!form.productName.trim()) {
        // alert("Product name required");
        Swal.fire({
          icon: "warning",
          title: "Product Name Required",
          text: "Please enter product name",
          confirmButtonColor: "#c08a5b",
        });
        return;
      }

      const userRes = await getCurrentUser();

      const currentVendor = userRes.data;

      const vendorId =
        currentVendor.vid ||
        currentVendor.Vid;

      const formData = new FormData();

      formData.append("Vid", vendorId);
      formData.append("Cid", Number(form.cid)); // ⚠️ must not be empty
      formData.append("ProductName", form.productName);
      formData.append("Description", form.description);
      formData.append("Price", form.price);
      formData.append("Discount", form.discount);
      formData.append("Fabric", form.fabric);
      formData.append("Color", form.color);
      formData.append("Size", form.size);
      formData.append("Stock", form.stock);
      formData.append("IsActive", form.isActive);

      // if (form.image) {
      //   formData.append("Image", form.image);
      // }
      // // const colorMap = {};

      // for (const color in form.colorImages) {

      //   const files = form.colorImages[color];

      //   colorMap[color] = [];

      //   files.forEach((file) => {

      //     // OLD IMAGE
      //     if (typeof file === "string") {

      //       colorMap[color].push(file);

      //     }

      //     // NEW IMAGE
      //     else {

      //       formData.append("Images", file);

      //       colorMap[color].push(file.name);
      //     }
      //   });
      // }
      // formData.append(
      //   "GalleryImagesJson",
      //   JSON.stringify(galleryImages)
      // );
      // formData.append(
      //   "ColorImagesJson",
      //   JSON.stringify(colorMap)
      // );


      if (form.image) {
        formData.append("Image", form.image);
      }

      // GALLERY + COLOR IMAGES
      const galleryImages = [];
      const colorMap = {};

      // NORMAL GALLERY IMAGES
      if (form.images && form.images.length > 0) {

        form.images.forEach((file) => {

          // OLD IMAGE
          if (typeof file === "string") {

            galleryImages.push(file);
          }

          // NEW IMAGE
          else {

            formData.append("Images", file);

            galleryImages.push(file.name);
            // galleryImages.push(`/images/${file.name}`);
            // galleryImages.push(`/images/${file.name}`);
          }
        });
      }

      // COLOR WISE IMAGES
      for (const color in form.colorImages) {

        const files = form.colorImages[color];

        colorMap[color] = [];

        files.forEach((file) => {

          // OLD IMAGE
          if (typeof file === "string") {

            colorMap[color].push(file);
          }

          // NEW IMAGE
          else {

            formData.append("Images", file);

            colorMap[color].push(file.name);
            // colorMap[color].push(`/images/${file.name}`);
            // colorMap[color].push(`/images/${file.name}`);
          }
        });
      }

      formData.append(
        "GalleryImagesJson",
        JSON.stringify(galleryImages)
      );

      formData.append(
        "ColorImagesJson",
        JSON.stringify(colorMap)
      );

      // ✅ MOVE API CALL HERE

      if (editing) {
        console.log("FINAL GALLERY:", galleryImages);
        console.log("FINAL COLOR MAP:", colorMap);

        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        await updateProduct(editing.id, formData);

        Swal.fire({
          icon: "success",
          title: "Product Updated",
          text: "Product updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {

        await createProduct(formData);

        Swal.fire({
          icon: "success",
          title: "Product Added",
          text: "Product created successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      fetchProducts();

      setModalOpen(false);

    }
    catch (err) {
      // console.error(err);
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error while saving product",
        confirmButtonColor: "#c08a5b",
      });
      // alert("Error while saving product ");
    }
  };

  const handleDelete = async () => {

    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This product will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {

      try {

        await deleteProduct(confirmDelete.id);

        fetchProducts();

        setConfirmDelete(null);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Product deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });

      } catch (error) {

        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Unable to delete product",
          confirmButtonColor: "#c08a5b",
        });
      }
    }
  };


  const colorOptions = [
    "Red",
    "Maroon",
    "Black",
    "White",
    "Blue",
    "Navy Blue",
    "Beige",
    "Green",
    "Pink",
    "Yellow",
    "Purple",
    "Grey",
    "Orange",
    "Brown",
  ];

  const sizeOptions = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  return (
    // <DashboardLayout role="Vendor" userName="Vendor" items={vendorItems}>
    <DashboardLayout
      role="Vendor"
      userName={vendorName}
      items={vendorItems}
    >
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Catalogue"
          title="Manage"
          titleAccent="Products"
          description="Add, edit and manage your store products."
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Products" value={stats.total} icon={Package} />
          <StatCard label="Active" value={stats.active} icon={CheckCircle2} />
        </div>

        <AdminToolbar
          search={search}
          onSearch={setSearch}
          onAdd={openAdd}
          addLabel="Add Product"
        />

        <div className="bg-card border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {["Product", "Price", "Stock", "Image", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.productName}</td>
                  <td className="px-6 py-4">₹{p.price}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4">
                    <img
                      src={p.image}
                      alt={p.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {p.isActive ? "Active" : "Hidden"}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(p)}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => setConfirmDelete(p)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">

          <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl relative max-h-[95vh] overflow-y-auto">

            {/* HEADER */}
            <div className="sticky top-0 bg-white z-20 border-b px-8 py-5 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {editing ? "Update Product" : "Add New Product"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your fashion product details
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* LEFT SIDE */}
              <div className="space-y-6">

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={form.productName}
                    onChange={(e) =>
                      setForm({ ...form, productName: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Enter description"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black resize-none"
                  />
                </div>

                {/* Price + Discount */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Price
                    </label>

                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Discount %
                    </label>

                    <input
                      type="number"
                      value={form.discount}
                      onChange={(e) =>
                        setForm({ ...form, discount: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>
                </div>

                {/* Fabric + Stock */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Fabric
                    </label>

                    <input
                      type="text"
                      value={form.fabric}
                      onChange={(e) =>
                        setForm({ ...form, fabric: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Stock
                    </label>

                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    />
                  </div>

                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>

                  <select
                    value={form.cid || ""}
                    onChange={(e) =>
                      setForm({ ...form, cid: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option key={cat.cid} value={cat.cid}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* COLORS */}
                <div className="relative">

                  <label className="block text-sm font-semibold mb-2">
                    Colors
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowColors(!showColors)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left bg-white"
                  >
                    {form.color || "Select Colors"}
                  </button>

                  {showColors && (
                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-2xl shadow-xl p-4 max-h-64 overflow-y-auto">

                      <div className="grid grid-cols-2 gap-3">

                        {colorOptions.map((color) => {
                          const selectedColors = form.color
                            ? form.color.split(",")
                            : [];

                          return (
                            <label
                              key={color}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={selectedColors.includes(color)}
                                onChange={(e) => {

                                  let updated = [...selectedColors];

                                  if (e.target.checked) {
                                    updated.push(color);
                                  } else {
                                    updated = updated.filter(
                                      (c) => c !== color
                                    );
                                  }

                                  // setForm({
                                  //   ...form,
                                  //   color: updated.join(","),
                                  // });
                                  const updatedColorImages = { ...form.colorImages };

                                  if (!e.target.checked) {
                                    delete updatedColorImages[color];
                                  }

                                  setForm({
                                    ...form,
                                    color: updated.join(","),
                                    colorImages: updatedColorImages,
                                  });
                                }}
                              />

                              {color}
                            </label>
                          );
                        })}

                      </div>
                    </div>
                  )}

                  {/* Selected Colors */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.color &&
                      form.color.split(",").map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs"
                        >
                          {c}
                        </span>
                      ))}
                  </div>

                </div>

                {/* SIZES */}
                <div className="relative">

                  <label className="block text-sm font-semibold mb-2">
                    Sizes
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowSizes(!showSizes)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left bg-white"
                  >
                    {form.size || "Select Sizes"}
                  </button>

                  {showSizes && (
                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-2xl shadow-xl p-4 max-h-64 overflow-y-auto">

                      <div className="grid grid-cols-2 gap-3">

                        {sizeOptions.map((size) => {

                          const selectedSizes = form.size
                            ? form.size.split(",")
                            : [];

                          return (
                            <label
                              key={size}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSizes.includes(size)}
                                onChange={(e) => {

                                  let updated = [...selectedSizes];

                                  if (e.target.checked) {
                                    updated.push(size);
                                  } else {
                                    updated = updated.filter(
                                      (s) => s !== size
                                    );
                                  }

                                  setForm({
                                    ...form,
                                    size: updated.join(","),
                                  });
                                }}
                              />

                              {size}
                            </label>
                          );
                        })}

                      </div>
                    </div>
                  )}

                  {/* Selected Sizes */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.size &&
                      form.size.split(",").map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                        >
                          {s}
                        </span>
                      ))}
                  </div>

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">

                {/* MAIN IMAGE */}
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Main Product Image
                  </label>

                  <div className="border-2 border-dashed rounded-2xl p-6 bg-gray-50">

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {

                        const file = e.target.files[0];

                        setForm({
                          ...form,
                          image: file,
                        });

                        if (file) {
                          setMainPreview(
                            URL.createObjectURL(file)
                          );
                        }
                      }}
                    />

                    {mainPreview && (
                      <img
                        src={mainPreview}
                        alt=""
                        className="w-full h-72 object-cover rounded-2xl mt-5"
                      />
                    )}

                  </div>

                </div>

                {/* MULTIPLE IMAGES */}
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Additional Product Images
                  </label>

                  <div className="border-2 border-dashed rounded-2xl p-6 bg-gray-50">

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {

                        const newFiles = Array.from(
                          e.target.files
                        );

                        setForm((prev) => ({
                          ...prev,
                          // images: [
                          //   ...prev.images,
                          //   ...newFiles,
                          // ],
                          images: [
                            ...(prev.images || []),
                            ...newFiles,
                          ],
                        }));

                        const previews = newFiles.map((file) =>
                          URL.createObjectURL(file)
                        );

                        setExtraPreviews((prev) => [
                          ...prev,
                          ...previews,
                        ]);
                      }}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                      {extraPreviews.map((img, index) => (
                        <div
                          key={index}
                          className="relative"
                        >

                          <img
                            src={img}
                            alt=""
                            className="w-full h-32 object-cover rounded-xl"
                          />

                          {/* <button
                            type="button"
                            onClick={() => {

                              const updatedImages = [
                                ...form.images,
                              ];

                              updatedImages.splice(index, 1);

                              const updatedPreview = [
                                ...extraPreviews,
                              ];

                              updatedPreview.splice(index, 1);

                              setForm({
                                ...form,
                                images: updatedImages,
                              });

                              setExtraPreviews(
                                updatedPreview
                              );
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full"
                          >
                            ×
                          </button> */}

                          <button
                            type="button"
                            onClick={() => {

                              setForm((prev) => {

                                const updatedImages = [...(prev.images || [])];

                                updatedImages.splice(index, 1);

                                return {
                                  ...prev,
                                  images: updatedImages,
                                };
                              });

                              setExtraPreviews((prev) => {

                                const updatedPreview = [...prev];

                                updatedPreview.splice(index, 1);

                                return updatedPreview;
                              });

                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full"
                          >
                            ×
                          </button>

                        </div>
                      ))}

                    </div>

                  </div>

                </div>

                {/* COLOR WISE IMAGES */}
                <div>

                  <label className="block text-sm font-semibold mb-4">
                    Color Wise Images
                  </label>

                  <div className="space-y-6">

                    {form.color &&
                      form.color.split(",").map((color) => (

                        <div
                          key={color}
                          className="border rounded-2xl p-4"
                        >

                          <h3 className="font-semibold mb-4">
                            {color} Images
                          </h3>

                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {

                              const files = Array.from(e.target.files);
                              // setForm((prev) => ({
                              //   ...prev,
                              //   colorImages: {
                              //     ...prev.colorImages,
                              //     [color]: [
                              //       ...(prev.colorImages[color] || []),
                              //       ...files,
                              //     ],
                              //   },
                              // }));

                              setForm((prev) => ({
                                ...prev,

                                // ADD TO GALLERY ALSO
                                images: [
                                  ...(prev.images || []),
                                  ...files,
                                ],

                                // ADD TO COLOR
                                colorImages: {
                                  ...prev.colorImages,
                                  [color]: [
                                    ...(prev.colorImages[color] || []),
                                    ...files,
                                  ],
                                },
                              }));
                              const previews = files.map((file) =>
                                URL.createObjectURL(file)
                              );
                              setColorPreviews((prev) => ({
                                ...prev,
                                [color]: [
                                  ...(prev[color] || []),
                                  ...previews,
                                ],
                              }));
                            }}
                          />

                          <div className="grid grid-cols-3 gap-3 mt-4">

                            {/* {colorPreviews[color]?.map((img, index) => (
                              <img
                                key={index}
                                // src={img}
                                src={
                                  img.startsWith("/images")
                                    ? `https://localhost:7106${img}`
                                    : img
                                }
                                alt=""
                                className="w-full h-28 object-cover rounded-xl"
                              />
                            ))} */}

                            {colorPreviews[color]?.map((img, index) => (

                              <div key={index} className="relative">

                                <img
                                  // src={
                                  //   typeof img === "string"
                                  //     ? (
                                  //       img.startsWith("/images")
                                  //         ? `https://localhost:7106${img}`
                                  //         : img
                                  //     )
                                  //     : URL.createObjectURL(img)
                                  // }
                                  src={
                                    typeof img === "string"
                                      ? img
                                      : URL.createObjectURL(img)
                                  }
                                  alt=""
                                  className="w-full h-28 object-cover rounded-xl"
                                />

                                <button
                                  type="button"
                                  onClick={() => {

                                    const removedImage =
                                      form.colorImages[color][index];

                                    // REMOVE PREVIEW
                                    setColorPreviews((prev) => {

                                      const updated = [...(prev[color] || [])];

                                      updated.splice(index, 1);

                                      return {
                                        ...prev,
                                        [color]: updated,
                                      };
                                    });

                                    setForm((prev) => {

                                      // REMOVE FROM CURRENT COLOR
                                      const updatedColorFiles =
                                        [...(prev.colorImages[color] || [])];

                                      updatedColorFiles.splice(index, 1);

                                      // UPDATED COLOR MAP
                                      const updatedColorImages = {
                                        ...prev.colorImages,
                                        [color]: updatedColorFiles,
                                      };

                                      // CHECK IF IMAGE EXISTS IN OTHER COLORS
                                      let stillUsed = false;

                                      for (const clr in updatedColorImages) {

                                        if (clr === color) continue;

                                        const exists =
                                          (updatedColorImages[clr] || []).some(
                                            (img) => {

                                              // STRING IMAGE
                                              if (
                                                typeof img === "string" &&
                                                typeof removedImage === "string"
                                              ) {
                                                return img === removedImage;
                                              }

                                              // FILE IMAGE
                                              if (
                                                typeof img !== "string" &&
                                                typeof removedImage !== "string"
                                              ) {
                                                return img.name === removedImage.name;
                                              }

                                              return false;
                                            }
                                          );

                                        if (exists) {
                                          stillUsed = true;
                                          break;
                                        }
                                      }

                                      // REMOVE FROM GALLERY ONLY IF UNUSED
                                      let updatedGallery = [...(prev.images || [])];

                                      if (!stillUsed) {

                                        updatedGallery = updatedGallery.filter((img) => {

                                          // STRING IMAGE
                                          if (
                                            typeof img === "string" &&
                                            typeof removedImage === "string"
                                          ) {
                                            return img !== removedImage;
                                          }

                                          // FILE IMAGE
                                          if (
                                            typeof img !== "string" &&
                                            typeof removedImage !== "string"
                                          ) {
                                            return img.name !== removedImage.name;
                                          }

                                          return true;
                                        });
                                      }

                                      return {
                                        ...prev,
                                        images: updatedGallery,
                                        colorImages: updatedColorImages,
                                      };
                                    });

                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-sm"
                                >
                                  ×
                                </button>

                              </div>
                            ))}

                          </div>

                        </div>
                      ))}
                  </div>
                </div>

                {/* ACTIVE */}
                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-5 h-5"
                  />

                  <label className="text-sm font-medium">
                    Active Product
                  </label>

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t px-8 py-5 flex justify-end gap-4 rounded-b-3xl">

              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 rounded-xl border border-gray-300 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-black text-white font-medium"
              >
                {editing
                  ? "Update Product"
                  : "Create Product"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Delete */}
      {/* DELETE MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* HEADER */}
            <div className="px-6 py-5 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Delete Product
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone.
              </p>
            </div>

            {/* BODY */}
            <div className="p-6">

              <div className="flex items-center gap-4">

                <img
                  src={confirmDelete.image}
                  alt={confirmDelete.productName}
                  className="w-20 h-20 rounded-xl object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {confirmDelete.productName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Price: ₹{confirmDelete.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {confirmDelete.stock}
                  </p>
                </div>

              </div>

              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">
                  Are you sure you want to permanently delete this product?
                </p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">

              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete Product
              </button>

            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductManagement;