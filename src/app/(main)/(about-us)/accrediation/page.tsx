"use client";
import { useWebsiteInfoByInstitute } from "@/api/api-hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Content from "@/components/ui/content";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";
import PDFViewer from "@/components/ui/PDFViewer";
import { imageShowUrl } from "@/lib/BaseUrl";
import { useStore } from "@/store";
import { FileIcon, Menu } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Accrediation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);
  const [selectedContent, setSelectedContent] =
    useState<any>("About Institute");
  const [accrediation, setAccrediation] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleContentSelect = (item: any) => {
    setSelectedContent(item);
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    if (
      websiteInfoByInstitute?.one_ins?.landing_control
        ?.home_accreditation_object
    ) {
      setAccrediation(
        websiteInfoByInstitute?.one_ins?.landing_control
          ?.home_accreditation_object
      );
      setSelectedContent(
        websiteInfoByInstitute?.one_ins?.landing_control
          ?.home_accreditation_object[0]
      );
    }
  }, [
    websiteInfoByInstitute?.one_ins?.landing_control?.home_accreditation_object,
  ]);
  console.log(accrediation);
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
          {accrediation.map((item: any, index) => (
            <li key={index} className="mb-2">
              <button
                className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item ? "bg-primary text-secondary" : ""
                }`}
                onClick={() => handleContentSelect(item)}
              >
                {item.name}
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
                {selectedContent.about && (
                  <Content>{selectedContent.about}</Content>
                )}
              </div>
              <div className="sm:w-1/5 w-full flex flex-col items-center justify-center text-center">
                {selectedContent?.image && (
                  <ImageViewer
                    src={`${imageShowUrl}/${selectedContent?.image}`}
                    alt="founder image"
                    width={250}
                    height={250}
                  />
                )}
              </div>
            </div>
          </CardContent>
          {selectedContent?.combined?.length > 0 && (
            <div className="mt-6">
              {viewPdf ? (
                <PDFViewer file={viewPdf} setActive={setViewPdf} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedContent?.combined?.map(
                    (item: any, index: number) => (
                      <Card
                        key={index}
                        className="flex items-center p-4 hover:shadow-md transition-shadow"
                      >
                        <FileIcon className="h-10 w-10 text-blue-500 mr-4" />
                        <div className="flex-grow">
                          <p className="font-medium">{item.c_name}</p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                        <Button
                          className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary"
                          onClick={() => setViewPdf(item?.c_attach)}
                          variant="outline"
                        >
                          View
                        </Button>
                      </Card>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
    // <div>hi</div>
  );
};

export default Accrediation;
