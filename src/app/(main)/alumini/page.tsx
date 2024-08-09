"use client";
import Heading from "@/components/ui/heading";
import { Menu } from "lucide-react";
import React, { useState } from "react";

const Alumini = () => {
  const [selectedContent, setSelectedContent] = useState("About");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          {sidebar.map((item, index) => (
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
        <Heading>Alumini</Heading>
      </div>
    </div>
  );
};

export default Alumini;
const sidebar = [
  "About",
  "Prominent Alumni",
  "Alumini Registration",
  "Alumini Feedback",
];
