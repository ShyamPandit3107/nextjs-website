"use client";
import { useWebsiteInfoByInstitute } from "@/api/api-hooks";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import About from "./_ui/about";
import OrganisationStructure from "./_ui/organisation-structure";
import VisionMission from "./_ui/vision-mission";
import Affiliation from "./_ui/affiliation";

const Institute = () => {
  const [selectedContent, setSelectedContent] = useState("About Institute");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);
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
          {Sidebar.map((item, index) => (
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
        {selectedContent === "Affiliation" ? (
          <Affiliation
            affiliation={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.affiliation
            }
          />
        ) : selectedContent === "Vision Mission" ? (
          <VisionMission
            vision={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.vision
            }
            mission={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.mission
            }
          />
        ) : selectedContent === "Organisation Structure" ? (
          <OrganisationStructure
            data={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.org_structure
            }
          />
        ) : (
          <About
            name={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.ins_name
            }
            content={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_us_institute_object?.ins_about
            }
          />
        )}
      </div>
    </div>
  );
};

export default Institute;

const Sidebar = [
  "About Institute",
  "Affiliation",
  "Vision Mission",
  "Organisation Structure",
];
