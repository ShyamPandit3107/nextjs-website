import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useStore } from "@/store";
import { useAdmissionDetails, useAdmissionSiteInfo } from "@/api/api-hooks";
import { fileShowUrl, imageShowUrl } from "@/lib/BaseUrl";
import { getId } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";

export default function AdmissionProcess() {
  const admissionId = useStore((state) => state.ids.admissionId);
  const { data: admissionDetails, error: detailsError } = useAdmissionDetails({
    aid: admissionId,
    sid: "",
  });
  const { data: admissionGetSiteInfo, error: siteInfoError } =
    useAdmissionSiteInfo(admissionId);

  const [deviceType, setDeviceType] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      setDeviceType("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDeviceType("iphone");
    } else {
      setDeviceType("");
    }
  }, []);

  if (detailsError || siteInfoError) {
    return <div>Error loading data</div>;
  }

  if (!admissionDetails || !admissionGetSiteInfo) {
    return <div>Loading...</div>;
  }
  console.log(admissionDetails);
  console.log(admissionGetSiteInfo);
  console.log(deviceType);
  return (
    <Card className="my-4 bg-background">
      <CardContent>
        <Heading className="mb-2">Admission Process</Heading>

        {deviceType && (
          <div className="flex justify-center items-center mb-4">
            <Button asChild>
              <Link
                href={
                  deviceType === "android"
                    ? "https://play.google.com/store/apps/details?id=com.mithakalminds.qviple"
                    : "https://apps.apple.com/in/app/qviple-your-education-online/id6463501865"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className={`fa-brands fa-${
                    deviceType === "android" ? "android" : "apple"
                  } mr-2`}
                ></i>
                Download
              </Link>
            </Button>
          </div>
        )}
        <div className="my-4 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-primary mb-4">Scan QR</h2>
          <Tabs
            defaultValue="en"
            className="w-full max-w-md flex flex-col items-center justify-center"
            // onValueChange={(value) => setLanguage(value)}
          >
            <TabsList className="grid w-full grid-cols-3 bg-primary text-primary-foreground">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="hi">हिंदी</TabsTrigger>
              <TabsTrigger value="mh">मराठी</TabsTrigger>
            </TabsList>
            <TabsContent value="en">
              <ImageViewer
                src={`${imageShowUrl}/${admissionDetails?.admission?.app_qr_code}`}
                alt="QR Code English"
                width={320}
                height={320}
              />
            </TabsContent>
            <TabsContent value="hi">
              <ImageViewer
                src={`${imageShowUrl}/${admissionDetails?.admission?.app_hindi_qr_code}`}
                alt="QR Code Hindi"
                width={320}
                height={320}
              />
            </TabsContent>
            <TabsContent value="mh">
              <ImageViewer
                src={`${imageShowUrl}/${admissionDetails?.admission?.app_marathi_qr_code}`}
                alt="QR Code Marathi"
                width={320}
                height={320}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col items-center justify-center my-4">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Watch Video
          </h2>
          <Carousel className="w-full max-w-3xl">
            <CarouselContent>
              {admissionGetSiteInfo?.admission_site?.video_gallery?.map(
                (video: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center justify-center w-full">
                      <iframe
                        src={`${
                          video?.video
                            ? fileShowUrl + "/" + video?.video
                            : "https://www.youtube.com/embed/" +
                              getId(video?.link)
                        }`}
                        title={video?.title}
                        className="w-full aspect-video"
                        allowFullScreen
                      />
                      <h6 className="mt-2 text-center">{video?.title}</h6>
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </CardContent>
    </Card>
    // <h1>Admission Process</h1>
  );
}
