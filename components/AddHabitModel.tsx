"use client";

import { useState } from "react";

export default function AddHabitModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function createHabit() {
    const res = await fetch("/api/habits/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      window.location.href = "/dashboard"; // better than reload()
    } else {
      alert("Failed to add habit");
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-white text-black p-2 rounded w-[33.5%]">
        + Add Habit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-xl font-bold mb-4 text-black">New Habit</h2>

            <input
              className="w-full border p-2 mb-2 text-black"
              placeholder="Habit name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="w-full border p-2 mb-2 text-black"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={createHabit} className="bg-black text-white px-3 py-2 rounded">
                Save
              </button>
              <button onClick={() => setOpen(false)} className="border px-3 py-2 rounded text-black">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
