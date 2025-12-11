"use client";

import { useState } from "react";
import HabitCalendar from "./HabitCalendar";
import { MdDeleteOutline } from "react-icons/md";

export interface HabitType {
  _id: string;
  name: string;
  description?: string;
}

export default function HabitList({ habit }: { habit: HabitType[] }) {
  const [selected, setSelected] = useState<HabitType | null>(null);
  const [habits,setHabit]=useState(habit)
 

  async function deleteHabit(habitId:string){
    try {
          alert("Are you sure?")
          const res=await fetch(`/api/habits/delete?habitId=${habitId}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },

          } );
          console.log(res)
          setHabit(habits.filter((item)=>item._id!==habitId));
          setSelected(null)

    } catch (error) {
      console.log(error)
    }    
  }

  return (
    <div className=" w-full flex justify-around gap-10">
      <div className="flex flex-col flex-1 gap-3  border p-5">
      <h2 className="text-lg font-bold border-b">Your Habits</h2>

      {habits.length === 0 && <p>No habits yet</p>}

      {habits.map((h) => (
        <button
          key={h._id}
          onClick={() => setSelected(h)}
          className={`border rounded p-3 text-left hover:bg-gray-100 hover:text-black ${
            selected?._id === h._id ? "bg-gray-200 text-black "  : ""
          }`}
        >
          <div className="font-semibold">{h.name}</div>
          <div className="text-xs text-gray-500">{h.description}</div>
          <div className="flex justify-end">{selected && <MdDeleteOutline size={20} onClick={()=>deleteHabit(h._id)} className="float-right mt-[-25px]  "/>}</div>
        </button>
      ))}

      
      </div>

      <div className="flex-2 border p-5 ">
        {selected == null && <p className="text-lg font-bold  flex justify-center">Select a habit to view its calendar..</p>}
        
        {selected && <HabitCalendar habit={selected} />}
      </div>
    </div>
  );
}
