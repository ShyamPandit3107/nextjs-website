import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
const ContactUs = ({ contacts }: any) => {
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  console.log(contacts);
  return (
    <div>
      <Heading className="mb-2">Contact Us</Heading>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts?.map((contact: any) => (
          <Card key={contact._id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {contact.contact_person_name
                    ? contact.contact_person_name
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")
                        .toUpperCase()
                    : "N/A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{contact.contact_person_name || "N/A"}</CardTitle>
                <CardDescription>
                  {contact.contact_department_name || "N/A"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-start mb-2 px-0 hover:bg-transparent"
                onClick={() => handleEmailClick(contact.contact_person_email)}
                disabled={!contact.contact_person_email}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span className="truncate">
                  {contact.contact_person_email || "N/A"}
                </span>
              </Button>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{contact.contact_person_mobile || "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
