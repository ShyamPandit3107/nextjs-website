import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOneEvent } from "@/api/api-hooks";
import { imageShowUrl } from "@/lib/BaseUrl";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";

// Assume this hook is implemented elsewhere

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function OneEvent({ evid }: { evid: string }) {
  const { data: oneEvent } = useOneEvent(evid);
  console.log(oneEvent);
  const eventDate = React.useMemo(() => {
    return oneEvent?.event_date ? new Date(oneEvent.event_date) : null;
  }, [oneEvent?.event_date]);

  const formattedDate = React.useMemo(() => {
    if (!eventDate) return "";
    return `${daysOfWeek[eventDate.getDay()]} ${eventDate.toLocaleString(
      "en-US",
      { month: "short" }
    )} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;
  }, [eventDate]);

  if (!oneEvent) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full  mx-auto bg-background">
      <CardHeader>
        <CardTitle>
          <Heading>{oneEvent?.one_event.event_name}</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <p className="text-lg font-semibold mb-2">{formattedDate}</p>
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold">Event Guest:</span>{" "}
                {oneEvent?.one_event?.event_guest}
              </p>
              <p>
                <span className="font-semibold">Event Place:</span>{" "}
                {oneEvent?.one_event?.event_place}
              </p>
              <div>
                <span className="font-semibold">Department:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {oneEvent?.one_event?.for_department?.map(
                    (dept: any, index: number) => (
                      <p key={index} className="text-sm ">
                        {index + 1} ) {dept.dName}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <p className="mt-4">{oneEvent?.one_event?.event_description}</p>
          </div>
          <div className="w-full md:w-1/3">
            <div className="relative w-full h-48 md:h-64">
              <ImageViewer
                src={`${imageShowUrl}/${oneEvent?.one_event?.event_banner}`}
                alt={oneEvent?.one_event?.event_name}
                // layout="fill"
                // objectFit="cover"
                className="rounded-md w-full h-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
