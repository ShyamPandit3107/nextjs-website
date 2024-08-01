"use client";
import { useWebsiteInfoByInstitute } from "@/api/api-hooks";
import { useStore } from "@/store";
import React from "react";

import Image from "next/image";
import CarouselComponent from "@/components/home/carousel-component";
import AboutIns from "@/components/home/about-ins";
import FounderMessage from "@/components/home/founder-message";
import Notices from "@/components/home/notices";
import Events from "@/components/home/events";
const Page = () => {
  const id = useStore((state) => state.id);
  const { data: websiteInfoByInstitute } = useWebsiteInfoByInstitute(id);
  return (
    <div className="w-full">
      {websiteInfoByInstitute?.one_ins?.landing_control?.home_background_object
        ?.images.length > 0 && (
        <CarouselComponent
          images={
            websiteInfoByInstitute?.one_ins?.landing_control
              ?.home_background_object?.images
          }
        />
      )}
      {websiteInfoByInstitute?.one_ins?.landing_control
        ?.home_about_institute_object && (
        <AboutIns
          home_object={
            websiteInfoByInstitute?.one_ins?.landing_control
              ?.home_about_institute_object
          }
        />
      )}
      {websiteInfoByInstitute?.one_ins?.landing_control
        ?.about_society_dynamic && (
        <FounderMessage
          data={
            websiteInfoByInstitute?.one_ins?.landing_control
              ?.about_society_dynamic
          }
        />
      )}
      <Notices />
      <Events />
    </div>
  );
};

export default Page;
