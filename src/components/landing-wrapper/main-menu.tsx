import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useStore } from "@/store";
import { useIqacAuthority, useWebsiteInfoByInstitute } from "@/api/api-hooks";
import Image from "next/image";
import { imageShowUrl } from "@/lib/BaseUrl";
import PinDepartment from "./department/pin-department";
import { ListItem } from "../ui/list-item";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const MainMenu = ({ academicCourse }: { academicCourse: any }) => {
  const qid = useStore((state) => state.ids.iqacId);
  const { data: iqacAuthority } = useIqacAuthority(qid);
  const { setQid, setRndId } = useStore();
  const [uniqueCommittees, setUniqueCommittees] = useState<any>([]);

  useEffect(() => {
    if (iqacAuthority) {
      const newCommittees: { id: string; name: string; url: string }[] = [];
      iqacAuthority.iqac.authority.forEach((item: any) => {
        if (item.custom_head_name === "IQAC") {
          setQid(item._id);
        } else if (item.custom_head_name === "RND") {
          setRndId(item._id);
        } else {
          newCommittees.push({
            id: item._id,
            name: item.custom_head_name,
            url: `/committe/${item._id}`,
          });
        }
      });
      const uniqueCommittees = newCommittees.filter(
        (committee, index, self) =>
          index === self.findIndex((c) => c.id === committee.id)
      );
      setUniqueCommittees(uniqueCommittees);
    }
  }, [iqacAuthority, setQid, setRndId]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);

  const toggleDropdown = (key: any) => {
    setOpenDropdowns((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const MobileMenuItem = ({
    href,
    title,
    children,
    hasDropdown = false,
  }: {
    href: string;
    title: string;
    children?: React.ReactNode;
    hasDropdown?: boolean;
  }) => {
    const isOpen = openDropdowns[title as keyof typeof openDropdowns] || false;

    return (
      <div className="py-2">
        <div
          className="flex justify-between items-center"
          onClick={() => hasDropdown && toggleDropdown(title)}
        >
          {hasDropdown ? (
            <span className="text-lg font-semibold">{title}</span>
          ) : (
            <Link
              href={href}
              className="text-lg font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {title}
            </Link>
          )}
          {hasDropdown && (
            <button>{isOpen ? <ChevronUp /> : <ChevronDown />}</button>
          )}
        </div>
        {hasDropdown && isOpen && <div className="pl-4 mt-1">{children}</div>}
      </div>
    );
  };

  const MobileMenuLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="block py-1"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={`${imageShowUrl}/${websiteInfoByInstitute?.one_ins?.website_looks?.logo}`}
            alt="Logo"
            width={75}
            height={75}
          />
        </div>

        <button className="md:hidden z-50" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu (unchanged) */}
        <div className="hidden md:flex">
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                <NavigationMenuItem>
                  <Link className={navigationMenuTriggerStyle()} href="/">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/society" title="About Society">
                        Learn more about our society
                      </ListItem>
                      <ListItem href="/institute" title="Institute Profile">
                        Overview of our educational institute
                      </ListItem>
                      <ListItem href="/administration" title="Administration">
                        Meet our administrative team
                      </ListItem>
                      <ListItem href="/accrediation" title="Accreditation">
                        Our accreditations and certifications
                      </ListItem>
                      <ListItem href="/faculties" title="Faculties">
                        Our faculties and departments
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Academic Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {academicCourse?.map((item: any) => (
                        <ListItem
                          key={item._id}
                          title={item.head_name}
                          href={`/academic-course/${item._id}`}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Department</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <PinDepartment />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admission</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[230px] p-2 grid grid-cols-1">
                      <ListItem
                        href="/admission?tab=about"
                        title="Admission Department"
                      ></ListItem>
                      <ListItem
                        href="/admission?tab=new-admission"
                        title="New Admission"
                      ></ListItem>
                      <ListItem
                        href="/admission?tab=admission-enquiry"
                        title="Admission Enquiry"
                      ></ListItem>
                      <ListItem
                        href="/admission?tab=admission-process"
                        title="Admission Process"
                      ></ListItem>
                      <ListItem
                        href="/admission?tab=document-checklist"
                        title="Document Checklist"
                      ></ListItem>
                      <ListItem
                        href="/admission?tab=contact-us"
                        title="Contact Us"
                      ></ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>R&D</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[230px] p-2 grid grid-cols-1">
                      <ListItem
                        href="/research-and-development?tab=about"
                        title="Research and Department"
                      ></ListItem>
                      <ListItem
                        href="/research-and-development?tab=mou"
                        title="MOU"
                      ></ListItem>
                      <ListItem
                        href="/research-and-development?tab=research-paper"
                        title="Research Paper"
                      ></ListItem>
                      <ListItem
                        href="/research-and-development?tab=activities"
                        title="Activities"
                      ></ListItem>
                      <ListItem
                        href="/research-and-development?tab=projects"
                        title="Projects"
                      ></ListItem>
                      <ListItem
                        href="/research-and-development?tab=meetings"
                        title="Meetings"
                      ></ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="/examination"
                  >
                    Examination
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu with slide-in effect */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden overflow-y-auto z-40`}
      >
        <div className="p-4 mt-16">
          <MobileMenuItem href="/" title="Home" />
          <MobileMenuItem
            href="/admission?tab=new-admission"
            title="New Admission"
          />
          <MobileMenuItem href="#" title="About Us" hasDropdown>
            <MobileMenuLink href="/society">About Society</MobileMenuLink>
            <MobileMenuLink href="/institute">Institute Profile</MobileMenuLink>
            <MobileMenuLink href="/administration">
              Administration
            </MobileMenuLink>
            <MobileMenuLink href="/accrediation">Accreditation</MobileMenuLink>
            <MobileMenuLink href="/faculties">Faculties</MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem href="#" title="Academic Courses" hasDropdown>
            {academicCourse?.map((item: any) => (
              <MobileMenuLink
                key={item._id}
                href={`/academic-course/${item._id}`}
              >
                {item.head_name}
              </MobileMenuLink>
            ))}
          </MobileMenuItem>
          <MobileMenuItem href="#" title="Department" hasDropdown>
            <PinDepartment />
          </MobileMenuItem>
          <MobileMenuItem href="#" title="Admission" hasDropdown>
            <MobileMenuLink href="/admission?tab=about">
              Admission Department
            </MobileMenuLink>
            <MobileMenuLink href="/admission?tab=new-admission">
              New Admission
            </MobileMenuLink>
            <MobileMenuLink href="/admission?tab=admission-enquiry">
              Admission Enquiry
            </MobileMenuLink>
            <MobileMenuLink href="/admission?tab=admission-process">
              Admission Process
            </MobileMenuLink>
            <MobileMenuLink href="/admission?tab=document-checklist">
              Document Checklist
            </MobileMenuLink>
            <MobileMenuLink href="/admission?tab=contact-us">
              Contact Us
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem href="#" title="R&D" hasDropdown>
            <MobileMenuLink href="/research-and-development?tab=about">
              Research and Department
            </MobileMenuLink>
            <MobileMenuLink href="/research-and-development?tab=mou">
              MOU
            </MobileMenuLink>
            <MobileMenuLink href="/research-and-development?tab=research-paper">
              Research Paper
            </MobileMenuLink>
            <MobileMenuLink href="/research-and-development?tab=activities">
              Activities
            </MobileMenuLink>
            <MobileMenuLink href="/research-and-development?tab=projects">
              Projects
            </MobileMenuLink>
            <MobileMenuLink href="/research-and-development?tab=meetings">
              Meetings
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem href="#" title="IQAC" hasDropdown>
            <MobileMenuLink href="/iqac?tab=composition">
              Composition
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=policy">Policy</MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=best-practices">
              Best Practices
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=syllabus-feedback">
              Syllabus Feedback
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=academic-calender">
              Academic Calender
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=iqac-reports">
              IQAC Reports
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=annual-reports">
              IQAC Reports
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=ssr-2018-documents">
              SSR 2018 Documents
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=ssr-2018-reports">
              SSR 2018 Reports
            </MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=audit">Audit</MobileMenuLink>
            <MobileMenuLink href="/iqac?tab=quality-initiatives">
              {" "}
              Quality Initiatives
            </MobileMenuLink>
          </MobileMenuItem>
          <MobileMenuItem href="#" title="NAAC" hasDropdown>
            <MobileMenuLink href="/naac?tab=ipp">
              Institute Perspective Planning
            </MobileMenuLink>
            <MobileMenuLink href="/naac?tab=ssr-3">SSR-3 Cycle</MobileMenuLink>
            <MobileMenuLink href="/naac?tab=ssr-4">SSR-4 Cycle</MobileMenuLink>
            <MobileMenuLink href="/naac?tab=dvv">DVV</MobileMenuLink>
            <MobileMenuLink href="/naac?tab=iiaq">IIAQ</MobileMenuLink>
            <MobileMenuLink href="/naac?tab=certificate">
              Certificate
            </MobileMenuLink>
            <MobileMenuLink href="/naac?tab=student-satisfactory-survey">
              Student Satisfactory Survey
            </MobileMenuLink>
            <MobileMenuLink href="/naac?tab=undertakings">
              Undertakings
            </MobileMenuLink>
          </MobileMenuItem>

          <MobileMenuItem href="#" title="Committees" hasDropdown>
            {uniqueCommittees.map((committee: any) => (
              <MobileMenuLink key={committee._id} href={committee.url}>
                {committee.name}
              </MobileMenuLink>
            ))}
          </MobileMenuItem>
          <MobileMenuItem href="/examination" title="Examination" />
          <MobileMenuItem href="/notices" title="Notices" />
          <MobileMenuItem href="/alumini" title="Alumini" />
          <MobileMenuItem href="/library" title="Library" />
          <MobileMenuItem href="/contact-us" title="Contact Us" />
          <MobileMenuItem href="https://dashboard.qviple.com/" title="Login" />
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default MainMenu;
