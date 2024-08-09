"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import Link from "next/link";
import { useStore } from "@/store";
import { useIqacAuthority } from "@/api/api-hooks";
import { useRouter } from "next/router";
export function TopMenu() {
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

  return (
    <Menubar className="md:flex justify-end bg-primary text-primary-foreground border-none hidden">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/admission?tab=new-admission">New Admission</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/notices">Notices</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/alumini">Alumini</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/library">Library</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/contact-us">Contact Us </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          IQAC{" "}
          {/* <ChevronDown className="text-primary-foreground hover:text-accent-foreground" /> */}
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem>
            <Link href="/iqac?tab=composition">Composition</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/iqac?tab=policy">Policy</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/iqac?tab=best-practices">Best Practices</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/iqac?tab=syllabus-feedback">Syllabus Feedback</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/iqac?tab=academic-calender">Academic Calender</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Reports</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Link href="/iqac?tab=iqac-reports">IQAC Reports</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/iqac?tab=annual-reports">Annual Reports</Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>SSR 2018</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Link href="/iqac?tab=ssr-2018-documents">Documents</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/iqac?tab=ssr-2018-reports">Reports</Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            <Link href="/iqac?tab=audit">Audit</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/iqac?tab=quality-initiatives">
              Quality Initiatives
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          NAAC{" "}
          {/* <ChevronDown className="text-primary-foreground hover:text-accent-foreground" /> */}
        </MenubarTrigger>

        <MenubarContent className="bg-background">
          <MenubarItem>
            <Link href="/naac?tab=ipp">Institute Perspective Planning</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=ssr-3">SSR-3 Cycle</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=ssr-4">SSR-4 Cycle</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=dvv">DVV</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=iiaq">IIAQ</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=certificate">Certificate</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=student-satisfactory-survey">
              Student Satisfactory Survey
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/naac?tab=undertakings">Undertakings</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          Committee{" "}
          {/* <ChevronDown className="text-primary-foreground hover:text-accent-foreground" /> */}
        </MenubarTrigger>
        <MenubarContent>
          {uniqueCommittees.map((committee: any, index: number) => (
            <MenubarItem key={index}>
              <Link href={committee.url}>{committee.name}</Link>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="https://dashboard.qviple.com/">Login</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
