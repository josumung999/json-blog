import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function CreatePostForm() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add New Post</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm min-h-[70vh]">
          <DrawerHeader>
            <DrawerTitle>Create a Post</DrawerTitle>
            <DrawerDescription>
              Use the form below to create a post
            </DrawerDescription>
          </DrawerHeader>
          <div className="">
            <p>Post form Here</p>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
