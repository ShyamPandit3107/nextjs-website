"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import Content from "@/components/ui/content";
import { useStore } from "@/store";
import { useWebsiteInfoByInstitute } from "@/api/api-hooks";
import FounderMessage from "./_ui/founder-message";
import About from "./_ui/about";
import VisionMission from "./_ui/vision-mission";
import OrganisationStructure from "./_ui/organisation-structure";
import { Menu } from "lucide-react";

const EducationSocietyUI = () => {
  const [selectedContent, setSelectedContent] = useState("About");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);
  const Sidebar = [
    "About",
    "Founder Message",
    "Vision Mission",
    "Organisation Structure",
  ];

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
        {selectedContent === "Founder Message" ? (
          <FounderMessage
            designation={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.founder_message_designation
            }
            image={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.founder_message_image
            }
            message={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.founder_message_message
            }
            name={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.founder_message_name
            }
          />
        ) : selectedContent === "Vision Mission" ? (
          <VisionMission
            vision={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.vision
            }
            mission={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.mission
            }
          />
        ) : selectedContent === "Organisation Structure" ? (
          <OrganisationStructure
            data={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.organisation_structure
            }
          />
        ) : (
          <About
            name={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.dynamic_name
            }
            content={
              websiteInfoByInstitute?.one_ins?.landing_control
                ?.about_society_dynamic?.about
            }
          />
        )}
      </div>
    </div>
  );
};

export default EducationSocietyUI;
