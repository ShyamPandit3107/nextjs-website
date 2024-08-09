"use client";
import React, { Suspense, useState } from "react";
import OneEvent from "./_ui/one-event";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAllEvents } from "@/api/api-hooks";

const Events = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const eventId = useStore((state) => state.ids.eventId);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const searchParams = useSearchParams();
  const eid = searchParams.get("eid");
  const { data: allEvents } = useAllEvents(eventId);
  const [selectedContent, setSelectedContent] = useState(
    eid || allEvents?.all_events?.[0]._id
  );
  const handleContentSelect = (item: any) => {
    setSelectedContent(item);
    setIsSidebarOpen(false);
  };
  console.log(allEvents);
  //   console.log(selectedContent);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="flex flex-col md:flex-row border-t-1 border-back ">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-4 bg-background text-primary"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } md:block w-full md:w-64 bg-background p-4 h-[30rem] overflow-y-auto`}
          >
            <ul>
              {allEvents?.all_events?.map((item: any, index: number) => (
                <li key={index} className="mb-2">
                  <button
                    className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                      selectedContent === item._id
                        ? "bg-primary text-secondary"
                        : ""
                    }`}
                    onClick={() => handleContentSelect(item?._id)}
                  >
                    {item?.event_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            <OneEvent evid={selectedContent} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Events;
