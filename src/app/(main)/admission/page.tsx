"use client";

import { useAdmissionSiteInfo } from "@/api/api-hooks";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import About from "./_ui/about";
import NewAdmission from "./_ui/new-admission";
import AdmissionEnquiry from "./_ui/admission-enquiry";
import AdmissionProcess from "./_ui/admission-process";
import DocumentChecklist from "./_ui/document-checklist";
import ContactUs from "./_ui/contact-us";

const AdmissionPage = () => {
  const [selectedContent, setSelectedContent] = useState("About");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const aid = useStore((state) => state.ids.admissionId);
  const { data: admissionDetails } = useAdmissionSiteInfo(aid);

  const Sidebar = [
    {
      title: "About",
      url: "about",
    },
    {
      title: "New Admission",
      url: "new-admission",
    },
    {
      title: "Admission Enquiry",
      url: "admission-enquiry",
    },
    {
      title: "Admission Process",
      url: "admission-process",
    },
    {
      title: "Document Checklist",
      url: "document-checklist",
    },
    {
      title: "Contact Us",
      url: "contact-us",
    },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  useEffect(() => {
    if (tab) {
      setSelectedContent(tab);
    }
  }, [tab]);

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
              <Link
                className={`w-full text-left block p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item.url
                    ? "bg-primary text-secondary"
                    : ""
                }`}
                href={`/admission?tab=${item.url}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {selectedContent === "about" ? (
          <About data={admissionDetails?.admission_site?.admission_about} />
        ) : selectedContent === "new-admission" ? (
          <NewAdmission />
        ) : selectedContent === "admission-enquiry" ? (
          <AdmissionEnquiry />
        ) : selectedContent === "admission-process" ? (
          <AdmissionProcess />
        ) : selectedContent === "document-checklist" ? (
          <DocumentChecklist />
        ) : selectedContent === "contact-us" ? (
          <ContactUs
            contacts={admissionDetails?.admission_site?.admission_contact}
          />
        ) : (
          <About data={admissionDetails?.admission_site?.admission_about} />
        )}
      </div>
    </div>
  );
};

export default AdmissionPage;
