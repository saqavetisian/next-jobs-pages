import React, {ReactNode} from "react";
import {clsx} from "clsx";
import ClientPortal from "./ClientPortal";

const Drawer = ({
                  open,
                  setOpen,
                  children
                }: { open: boolean, setOpen: (open: boolean) => void, children?: ReactNode }) => {
  return (
    <ClientPortal selector="portal-element">
      <div className="z-20 relative">
        <div
          className="absolute z-10"
          aria-labelledby="slide-over"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(!open)}
        >

          <div
            className={clsx(
              "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
              {
                "opacity-100 duration-500 ease-in-out visible": open
              },
              {"opacity-0 duration-500 ease-in-out invisible": !open}
            )}
          />
        </div>
        <div className={clsx({"fixed overflow-hidden": open}, "z-30")}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="pointer-events-none fixed max-w-full inset-y-0 right-0"
            >
              <div
                className={clsx(
                  "max-w-[400px] w-full pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                  {["translate-x-full"]: !open},
                  {["translate-x-0"]: open}
                )}
              >
                <div
                  className={clsx(
                    "flex flex-col h-full bg-white p-4 shadow-xl rounded-tl-lg rounded-bl-lg"
                  )}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
};

export default Drawer;
