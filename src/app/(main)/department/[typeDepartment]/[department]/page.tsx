"use client";
import { useAllDepartments, useDepartmentSiteInfo } from "@/api/api-hooks";
import { Menu } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import About from "./_ui/about";
import VisionMission from "./_ui/vision-mission";
import Projects from "./_ui/projects";
import InnovativePractices from "./_ui/innovative-practices";
import MouCollaboration from "./_ui/mou-collaboration";
import StudentAchievement from "./_ui/student-achievement";
import StudentAssociations from "./_ui/student-associations";
import Syllabus from "./_ui/syllabus";
import Faculties from "./_ui/faculties";
import HodMessage from "./_ui/hod-message";
import PoPso from "./_ui/po-pso";
import { useStore } from "@/store";
import ActivitiesTable from "./_ui/activities";
import ContactCard from "./_ui/contact-us";
import Link from "next/link";
import Labrotory from "./_ui/labrotory";

const Department = () => {
  const [selectedContent, setSelectedContent] = useState("about");
  const id = useStore((state) => state.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const param = useParams();
  const { department: did, typeDepartment } = param;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [currentDepartment, setCurrentDepartment] = useState();
  console.log(param);
  // fetching the department data from the API
  const { data: departmentSiteInfo } = useDepartmentSiteInfo(did as string);
  const { data: AllDepartment } = useAllDepartments(id);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (tab) setSelectedContent(tab);
  }, [tab]);

  useEffect(() => {
    if (AllDepartment?.institute?.depart) {
      const department = AllDepartment.institute.depart.find(
        (item: any) => did === item?._id
      );
      setCurrentDepartment(department);
    }
  }, [AllDepartment]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                  href={`/department/${typeDepartment}/${did}?tab=${item.url}`}
                >
                  <button
                    className={`w-full text-left p-4 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary transition-colors shadow-md bg-card rounded-sm ${
                      selectedContent === item.url
                        ? "bg-primary text-secondary"
                        : ""
                    }`}
                    onClick={() => setSelectedContent(item.url)}
                  >
                    {item.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {selectedContent === "about" ? (
            <About data={departmentSiteInfo?.department_site?.about} />
          ) : selectedContent === "vision-mission" ? (
            <VisionMission
              vision={departmentSiteInfo?.department_site?.department_vission}
              mission={departmentSiteInfo?.department_site?.department_mission}
            />
          ) : selectedContent === "po-pso" ? (
            <PoPso data={departmentSiteInfo?.department_site?.po_pso} />
          ) : selectedContent === "hod-message" ? (
            <HodMessage
              message={
                departmentSiteInfo?.department_site?.department_hod_message
              }
              hodDetails={currentDepartment}
            />
          ) : selectedContent === "faculties" ? (
            <Faculties did={did as string} />
          ) : selectedContent === "syllabus" ? (
            <Syllabus
              syllabus={departmentSiteInfo?.department_site?.syllabus}
            />
          ) : selectedContent === "laboratory" ? (
            <Labrotory />
          ) : selectedContent === "student-associations" ? (
            <StudentAssociations
              data={departmentSiteInfo?.department_site?.student_associations}
            />
          ) : selectedContent === "student-achievements" ? (
            <StudentAchievement
              data={departmentSiteInfo?.department_site?.student_achievements}
            />
          ) : selectedContent === "mou-collaboration" ? (
            <MouCollaboration did={did as string} />
          ) : selectedContent === "activities" ? (
            <ActivitiesTable did={did as string} />
          ) : selectedContent === "innovative-practices" ? (
            <InnovativePractices
              data={departmentSiteInfo?.department_site?.innovative_practices}
            />
          ) : selectedContent === "projects" ? (
            <Projects
              projects={departmentSiteInfo?.department_site?.projects}
            />
          ) : selectedContent === "contact-us" ? (
            <ContactCard
              contacts={departmentSiteInfo?.department_site?.department_contact}
            />
          ) : (
            <h1>Default</h1>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Department;

const sidebar = [
  { title: "About", url: "about" },
  { title: "Vision Mission", url: "vision-mission" },
  { title: "PO and PSO", url: "po-pso" },
  { title: "HOD Message", url: "hod-message" },
  { title: "Faculties", url: "faculties" },
  { title: "Syllabus", url: "syllabus" },
  { title: "Laboratory", url: "laboratory" },
  { title: "Student Associations", url: "student-associations" },
  { title: "Student Achievements", url: "student-achievements" },
  { title: "MoU/Collaboration", url: "mou-collaboration" },
  { title: "Activities", url: "activities" },
  { title: "Innovative Practices", url: "innovative-practices" },
  { title: "Projects", url: "projects" },
  { title: "Contact Us", url: "contact-us" },
];
