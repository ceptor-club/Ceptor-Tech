import React from "react";
import { useState, useEffect } from "react";

export default function HelpToggle() {
  const [noHelp, setNoHelp] = useState(false); //no help state ie. please hide help menus...

  useEffect(() => {
    if (noHelp) {
      console.log("noHelp: ", noHelp);
      //hide help menus
    }
  }, [noHelp]);

  return (
    <div>
      <p id="helpmenu" className="text-sm">
        Help!?{" "}
      </p>
      {/* a simple tailwind toggle switch for tooltip help */}
      {noHelp ? (
        <div>no help </div>
      ) : (
        <div>
          <input
            type="checkbox"
            id="helptoggle"
            className="hidden hover:inline-flex"
            placeholder="Help? Toggle!"
            title="Help! Toggle"
            onClick={(e) =>
              console.log("is help! toggle checked? ", e.target.checked)
            }
          />
          <label htmlFor="helptoggle" className="ml-2">
            {"<--"}Toggle!
          </label>{" "}
          No want help?
          <input
            type="checkbox"
            id="nohelptoggle"
            className="hidden hover:inline-flex"
            onClick={(e) =>
              // console.log(
              //   "is NO TOGGLE! toggle checked? ",
              //   e.target.checked
              // )
              setNoHelp(e.target.checked)
            }
          />
          <label htmlFor="nohelptoggle" className="ml-2">
            {"<-"}Toggle!
          </label>
        </div>
      )}
    </div>
  );
}
