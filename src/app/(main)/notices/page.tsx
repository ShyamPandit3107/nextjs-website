"use client";
import { useLibrarySiteInfo, useNoticeInstitute } from "@/api/api-hooks";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import OneNotices from "./_ui/one-notice";
import { useSearchParams } from "next/navigation";

const Notices = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const id = useStore((state) => state.id);
  const { data: notices } = useNoticeInstitute({
    id: id,
    page: 1,
    limit: 1000,
  });
  const searchParams = useSearchParams();
  const nid = searchParams.get("nid");
  const [selectedContent, setSelectedContent] = useState(
    nid || notices?.announcement?.[0]._id
  );
  useEffect(() => {
    if (notices?.announcement) {
      setSelectedContent(notices?.announcement?.[0]._id);
    }
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleContentSelect = (item: any) => {
    setSelectedContent(item);
    setIsSidebarOpen(false);
  };
  console.log(notices);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
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
          {notices?.announcement?.map((item: any, index: number) => (
            <li key={index} className="mb-2">
              <button
                className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item._id
                    ? "bg-primary text-secondary"
                    : ""
                }`}
                onClick={() => handleContentSelect(item?._id)}
              >
                {item?.insAnnTitle}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <OneNotices id={selectedContent} />
      </div>
    </div>
    // </Suspense>
  );
};

export default Notices;
