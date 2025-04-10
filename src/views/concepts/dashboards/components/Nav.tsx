import { Card } from "@/components/ui";
import { CiCalendar } from "react-icons/ci";
import { IoStopwatchOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { LuTarget } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsBullseye } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
export const Nav = () => {
  const nav = [
    { name: "HR Foundation", icon: IoStopwatchOutline },
    { name: "Workforce Management", icon: BsCalendar },
    { name: "Compensation for Payroll", icon: BsCoin },
    { name: "Employe Management", icon: MdOutlineManageAccounts },
    { name: "Performance Management", icon: BsBullseye }
  ];

  return (
    <div >
      <div className=" flex gap-2 overflow-x-scroll">


        {nav.map((item) => (
          <div className="w-1/4">

            <Card key={item.name} className="w-50" >
              <div className="flex items-center justify-center gap-2 p-4">

                <item.icon className="text-4xl" />
                <span className="text-md"> {item.name} </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
