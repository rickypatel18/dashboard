import { AccordionDemo } from "@/components/Accordian";
import { DrawerDemo } from "@/components/DrawerDemo";
import { UserMenu } from "@/components/MenubarDemo";
import { SelectDemo } from "@/components/SelectDemo";
import { ThemeToggle } from "@/components/ThemeToggle";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-2">
      <p>
        ss Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
        excepturi dignissimos eos impedit, numquam nam non, doloribus placeat
        consequuntur assumenda et perspiciatis cupiditate! Tempore ad provident
        perspiciatis aliquam, molestias nulla.
      </p>
      {/* <AccordionDemo/> */}
      {/* <DrawerDemo/>
      <SelectDemo/> */}
      {/* <ThemeToggle/> */}
      <UserMenu/>
    </div>
  );
};

export default page;
