import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOneNoticeDetail } from "@/api/api-hooks";
import { imageExtensionVerify } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import PDFViewer from "@/components/ui/PDFViewer";
import SubHeading from "@/components/ui/sub-heading";
import Content from "@/components/ui/content";
import { imageShowUrl } from "@/lib/BaseUrl";
import { FileIcon } from "lucide-react";
import ImageViewer from "@/components/ui/image-viewer";

// Assuming these are available or you'll create them
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function OneNotices({ id }: { id: string }) {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState([]);
  const [document, setDocument] = useState([]);
  const [active, setActive] = useState(null);
  const { data: oneNoticeDetail } = useOneNoticeDetail(id);
  console.log(oneNoticeDetail);
  useEffect(() => {
    if (oneNoticeDetail?.announcement?.createdAt) {
      setDate(new Date(oneNoticeDetail.announcement.createdAt));
      setImage(
        oneNoticeDetail.announcement.announcementDocument?.filter(
          (item: any) =>
            item.documentType === "image/png" ||
            item.documentType === "image/jpeg" ||
            imageExtensionVerify(item?.documentKey)
        ) || []
      );
      setDocument(
        oneNoticeDetail.announcement.announcementDocument?.filter(
          (item: any) =>
            item.documentType === "application/pdf" ||
            !imageExtensionVerify(item?.documentKey)
        ) || []
      );
    }
  }, [oneNoticeDetail]);
  const [viewPdf, setViewPdf] = useState<any>();

  if (!oneNoticeDetail) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4">
      <Heading className="mb-2">
        {oneNoticeDetail.announcement?.insAnnTitle}
      </Heading>
      {viewPdf ? (
        <PDFViewer file={viewPdf} setActive={setViewPdf} />
      ) : (
        <div>
          <SubHeading>{`${daysOfWeek[date.getDay()]} ${date.toLocaleString(
            "en-US",
            {
              month: "short",
            }
          )} ${date.getDate()}, ${date.getFullYear()}`}</SubHeading>
          <Content>{oneNoticeDetail.announcement?.insAnnDescription}</Content>
          <div className="my-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {image.map((item: { documentKey?: string }, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <ImageViewer
                    src={`${imageShowUrl}/${item?.documentKey}`}
                    alt="Notice image"
                    width={300}
                    height={200}
                    className="w-full h-36 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {document?.map((item: any) => (
              <Card className="w-full" key={item?._id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <FileIcon className="h-10 w-10 text-blue-500" />
                    <div>
                      <p className="font-medium">{item?.documentName}</p>
                      <p className="text-sm text-gray-500">
                        {item?.documentType}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setViewPdf(item?.documentKey)}
                    className="border-primary hover:border-primary hover:border-[2px]  hover:text-primary "
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
