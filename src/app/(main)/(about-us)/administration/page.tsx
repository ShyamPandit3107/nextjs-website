"use client";
import { useWebsiteInfoByInstitute } from "@/api/api-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Content from "@/components/ui/content";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";
import { imageShowUrl } from "@/lib/BaseUrl";
import { useStore } from "@/store";
import { set } from "date-fns";
import { Menu } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Administration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);
  const [selectedContent, setSelectedContent] =
    useState<any>("About Institute");
  const [administration, setAdministration] = useState([]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleContentSelect = (item: any) => {
    setSelectedContent(item);
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    if (
      websiteInfoByInstitute?.one_ins?.landing_control?.administration_object
    ) {
      setAdministration(
        websiteInfoByInstitute?.one_ins?.landing_control?.administration_object
      );
      setSelectedContent(
        websiteInfoByInstitute?.one_ins?.landing_control
          ?.administration_object[0]
      );
    }
  }, [websiteInfoByInstitute?.one_ins?.landing_control?.administration_object]);
  console.log(administration);
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
          {administration.map((item: any, index) => (
            <li key={index} className="mb-2">
              <button
                className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item ? "bg-primary text-secondary" : ""
                }`}
                onClick={() => handleContentSelect(item)}
              >
                {item.leading_person_position}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Card className="bg-background shadow-none">
          <CardHeader>
            <CardTitle>
              <Heading>Administration</Heading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
              <div className="md:w-4/5 w-full">
                {selectedContent.leading_person_message && (
                  <Content>{selectedContent.leading_person_message}</Content>
                )}
              </div>
              <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
                {selectedContent?.leading_person?.profilePhoto && (
                  <ImageViewer
                    src={`${imageShowUrl}/${selectedContent?.leading_person?.profilePhoto}`}
                    alt="founder image"
                    width={250}
                    height={250}
                  />
                )}

                <h3 className="text-lg font-semibold mt-2 text-primary">
                  {selectedContent?.leading_person?.userLegalName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContent?.leading_person_position}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    // <div>hi</div>
  );
};

export default Administration;
