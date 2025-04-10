import Card from "@/components/ui/Card";
import { MdAccountCircle } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import TabContent from "@/components/ui/Tabs/TabContent";



export const Profile = () => {
  return (
    <div className="flex gap-2 mt-5 ">
      {/* Profile Card */}

      <div className="w-1/4">
        <Card className="lg:col-span-1">
          <div className="p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar size={100} className="mr-4" />


              <Button
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white"
              >
                <FiEdit />
              </Button>
            </div>
            <h3 className="text-lg font-medium mb-1">User Name</h3>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-sm text-gray-500">Reporting to</p>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        {/* Frequently Used Section */}
        <Card >
          <div className=" text-xl font-bold">
            <span className="text-gray-500 font-semibold">Frequently Used</span>
          </div>
          <div className="grid grid-cols-4 mt-2 gap-4">
            <CgProfile className="h-12 w-12" />
            <CgProfile className="h-12 w-12" />
            <CgProfile className="h-12 w-12" />
            <CgProfile className="h-12 w-12" />
          </div>
        </Card>
        <Card >
          <div className=" text-xl font-bold">
            <span className="text-gray-500 font-semibold">Company Policies</span>
          </div>
          <div className="">
            No Record Found
          </div>
        </Card>
      </div>

      <div className="mt-4 w-1/4">
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1">Notification</TabNav>
            <TabNav value="tab2">Approvals</TabNav>

          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              <p>
                If builders built buildings the way programmers
                wrote programs, then the first woodpecker that came
                along would destroy civilization. (Gerald Weinberg)
              </p>
            </TabContent>
            <TabContent value="tab2">
              <p>
                A computer lets you make more mistakes faster than
                any invention in human history with the possible
                exceptions of handguns and tequila. (Mitch
                Radcliffe).
              </p>
            </TabContent>

          </div>
        </Tabs>
      </div>

    </div>
  );
};
