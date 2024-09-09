"use client";

import { ImageDropzone } from "@components/image-dropzone";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateEvent } from "@lib/eventHandler";
import { useRouter } from "next/navigation";
import { storage } from "@firebase/config";
import { deleteObject } from "firebase/storage";

const EditEventForm = ({ event: oldEvent }) => {
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

    if (oldEvent.image !== selectedImage) {
      const fileRef = ref(
        storage,
        `images/${oldEvent.id}/${oldEvent.imageRef}`
      );
      await deleteObject(fileRef);

      const reader = new FileReader();
      reader.onabort = () => setFormError("File reading was aborted");
      reader.onerror = () => setFormError("File reading has failed");

      reader.onload = async () => {
        await uploadFile(selectedImage);
      };

      reader.readAsArrayBuffer(selectedImage);
    } else {
      await updateEvent("events", oldEvent.id, {
        ...formData,
        attendees: oldEvent.attendees,
      });
      router.push("/admin/events");
    }
  };

  const uploadFile = async (file) => {
    try {
      const fileRef = ref(storage, `images/${oldEvent.id}/${file.name}`);

      const result = await uploadBytes(fileRef, file);

      if (!result) return;
      const downloadURL = await getDownloadURL(fileRef);

      uploadImage();

      await updateEvent("events", oldEvent.id, {
        ...formData,
        image: downloadURL,
        imageRef: file.name,
      });

      router.push("/admin/events");
    } catch (err) {
      console.log(err.message);
      setFormError("Something went wrong, please try again later");
    }
  };

  const [selectedImage, setSelectedImage] = useState(oldEvent.image);
  const [imageError, setImageError] = useState("");

  const [formError, setFormError] = useState();
  const [formData, setFormData] = useState({
    name: oldEvent.name,
    description: oldEvent.description,
    location: oldEvent.location,
    date: oldEvent.date,
    seats: oldEvent.seats,
    attendees: oldEvent.attendees,
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
      // attendees list
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Attendees</h2>
        <ul className="mt-4 space-y-2">
          {formData.attendees.map((attendee, index) => (
            <li key={index} className="flex items-center space-x-2">
              <p>{attendee}</p>
              <button
                onClick={() => {
                  setFormData((data) => ({
                    ...data,
                    attendees: data.attendees.filter((_, i) => i !== index),
                  }));
                }}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default EditEventForm;
