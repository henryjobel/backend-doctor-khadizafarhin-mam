import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    chamber: String,
    service: { type: String, required: true },
    date: { type: String, required: true },
    message: String,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
