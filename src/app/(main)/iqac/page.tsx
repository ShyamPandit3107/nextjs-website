"use client";
import { useStore } from "@/store";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Composition from "./_ui/composition";
import Policy from "./_ui/policy";
import BestPractices from "./_ui/best-practices";
import AcademicCalender from "./_ui/academic-calender";
import Audit from "./_ui/audit";
import QualityInitiatives from "./_ui/quality-initiatives";
import { useOneIqacAuthority } from "@/api/api-hooks";
import SyllabusFeedback from "./_ui/syllabus-feedback";
import IQACReports from "./_ui/iqac-reports";
import SSR2018Reports from "./_ui/srr-2018-reports";
import SSR2018Documents from "./_ui/srr-2018-documents";
import AnnualReports from "./_ui/annual-reports";

const IQAC = () => {
  const [selectedContent, setSelectedContent] = useState("About Institute");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const qcid = useStore((state) => state.qid);
  const { data: iqacData } = useOneIqacAuthority(qcid);
  console.log(iqacData);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const type = searchParams.get("type");
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
          {sidebar.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                className={`w-full text-left block p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                  selectedContent === item.url
                    ? "bg-primary text-secondary"
                    : ""
                }`}
                href={`/iqac?tab=${item.url}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {selectedContent === "composition" ? (
          <Composition />
        ) : selectedContent === "policy" ? (
          <Policy />
        ) : selectedContent === "best-practices" ? (
          <BestPractices />
        ) : selectedContent === "syllabus-feedback" ? (
          <SyllabusFeedback data={iqacData?.custom?.syllabus_feedback_object} />
        ) : selectedContent === "academic-calendar" ? (
          <AcademicCalender data={iqacData?.custom?.academic_calendar} />
        ) : selectedContent === "iqac-reports" ? (
          <IQACReports
            aqar={iqacData?.custom?.iqac_aqar}
            minutesOfMeetings={iqacData?.custom?.meetings}
          />
        ) : selectedContent === "annual-reports" ? (
          <AnnualReports data={iqacData?.custom?.annual_reports} />
        ) : selectedContent === "ssr-2018-reports" ? (
          <SSR2018Reports data={iqacData?.custom?.ssr_reports} />
        ) : selectedContent === "ssr-2018-documents" ? (
          <SSR2018Documents data={iqacData?.custom?.ssr_documents} />
        ) : selectedContent === "audit" ? (
          <Audit data={iqacData?.custom?.audit_reports} />
        ) : selectedContent === "quality-initiatives" ? (
          <QualityInitiatives />
        ) : (
          <h1>Default</h1>
        )}
      </div>
    </div>
  );
};

export default IQAC;

const sidebar = [
  {
    title: "Composition of IQAC",
    url: "composition",
  },
  {
    title: "Policy",
    url: "policy",
  },
  {
    title: "Best Practices",
    url: "best-practices",
  },
  {
    title: "Syllabus Feedback",
    url: "syllabus-feedback",
  },
  {
    title: "Academic Calendar",
    url: "academic-calendar",
  },
  {
    title: "IQAC Reports",
    url: "iqac-reports",
  },
  {
    title: "Annual Reports",
    url: "annual-reports",
  },
  {
    title: "SSR 2018 Reports",
    url: "ssr-2018-reports",
  },
  {
    title: "SSR 2018 Documents",
    url: "ssr-2018-documents",
  },
  {
    title: "Audit",
    url: "audit",
  },
  {
    title: "Quality Initiatives",
    url: "quality-initiatives",
  },
];
