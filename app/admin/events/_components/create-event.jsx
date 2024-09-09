"use client";

import { ImageDropzone } from "@components/image-dropzone";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateEvent, addEvent } from "@lib/eventHandler";
import { useRouter } from "next/navigation";
import { storage } from "@firebase/config";

const CreateEvent = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (
      !selectedImage ||
      !formData.name ||
      !formData.location ||
      !formData.date ||
      !formData.seats
    ) {
      setFormError("All fields are required");
      setTimeout(() => {
        setFormError(null);
      }, 4000);
      return;
    }

    const reader = new FileReader();
    reader.onabort = () => setFormError("File reading was aborted");
    reader.onerror = () => setFormError("File reading has failed");

    reader.onload = async () => {
      await uploadFile(selectedImage);
    };

    reader.readAsArrayBuffer(selectedImage);
  };

  const uploadFile = async (file) => {
    try {
      const doc = await addEvent("events", { ...formData });

      const fileRef = ref(storage, `images/${doc.id}/${file.name}`);

      const result = await uploadBytes(fileRef, file);

      if (!result) return;

      const downloadURL = await getDownloadURL(fileRef);

      await updateEvent("events", doc.id, {
        image: downloadURL,
        imageRef: file.name,
      });
      router.push("/admin/events");
    } catch (err) {
      console.log(err.message);
      setFormError("Something went wrong, please try again later");
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const [formError, setFormError] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    seats: "",
  });
  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="p-10">
      <form className="space-y-6 " onSubmit={handleSubmit}>
        <ImageDropzone
          setImageError={setImageError}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {imageError && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">
              {imageError}
            </p>
          </div>
        )}
        {formError && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">
              {formError}
            </p>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Event Name</Label>
          <Input id="name" value={formData.name} onChange={onChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={formData.location} onChange={onChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={formData.date}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seats">Available spots</Label>
          <Input
            type="number"
            id="seats"
            value={formData.seats}
            onChange={onChange}
          />
        </div>

        <Button className="w-full">Save</Button>
      </form>
    </div>
  );
};
export default CreateEvent;
