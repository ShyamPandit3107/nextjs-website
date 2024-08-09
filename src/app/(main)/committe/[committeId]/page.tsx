"use client";
import {
  useOneIqacAuthority,
  useWebsiteInfoByInstitute,
} from "@/api/api-hooks";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import About from "./_ui/about";
import Compositions from "./_ui/composition";
import Meetings from "./_ui/meetings";

const Committe = () => {
  const params = useParams();
  //   console.log(params);
  const { committeId } = params;
  const [selectedContent, setSelectedContent] = useState("About");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: committe } = useOneIqacAuthority(committeId as string);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleContentSelect = (item: any) => {
    setSelectedContent(item);
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row border-t-1 border-back">
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
        } md:block w-full md:w-64 bg-background p-4`}
      >
        <ul>
          {sidebar.map((item: any, index: number) => (
            <li key={index} className="mb-2">
              <button
                className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item ? "bg-primary text-secondary" : ""
                }`}
                onClick={() => handleContentSelect(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {selectedContent === "About" ? (
          <About data={committe?.about} />
        ) : selectedContent === "Compositions" ? (
          <Compositions data={committe?.composition} />
        ) : selectedContent === "Meetings" ? (
          <Meetings data={committe?.meetings} />
        ) : (
          <About data={committe?.about} />
        )}
      </div>
    </div>
  );
};

export default Committe;
const sidebar = ["About", "Compositions", "Meetings"];
