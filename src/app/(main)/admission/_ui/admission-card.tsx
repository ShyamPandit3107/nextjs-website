import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdmissionCard({
  onClick,
  data,
  user,
}: {
  onClick: any;
  data: any;
  user: any;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);
  const handleClick2 = (id: string) => {
    onClick(id);
    window.scrollTo(0, 0);
  };

  if (user === "desktop") {
    return (
      <Card className="my-2 cursor-pointer bg-background hover:bg-secondary shadow-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-primary underline">
            <span>{data?.type || data.applicationName}</span>
            {data?.type && (
              <Button
                // className="hover:text-primary border-[2px] border-primary"
                variant="ghost"
                size="sm"
                onClick={handleClick}
              >
                {open ? <ChevronUp /> : <ChevronDown />}
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!data?.type && (
            <>
              <p>Available Seats: {data.applicationSeats || "NA"}</p>
              <p className="mb-2">Last Date: {data.lastDate || "NA"}</p>
              <Button
                className="hover:text-primary border-[2px] border-primary"
                onClick={() => handleClick2(data?._id)}
              >
                View Details
              </Button>
            </>
          )}
          {open &&
            data?.apps?.map((item: any) => (
              <Card key={item?._id} className="mt-2 bg-background shadow-md">
                <CardContent>
                  <h3 className="font-semibold">{item?.applicationName}</h3>
                  <p>Available Seats: {item?.applicationSeats}</p>
                  <p>Last Date: {item?.ApplicationLastDate}</p>
                  <Button
                    className="hover:text-primary border-[2px] border-primary"
                    onClick={() => handleClick2(item?._id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Link href="/admission?tab=admission-process">
        <Card className="my-2">
          <CardContent>
            <h3 className="font-semibold">
              {data.applicationName || data.type}
            </h3>
            <p>Available Seats: {data.applicationSeats || "NA"}</p>
            <p>Last Date: {data.applicationLastDate || "NA"}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
