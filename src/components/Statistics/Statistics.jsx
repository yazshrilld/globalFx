import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import {
  csoStatisticsFn,
  legalStatisticsFn,
  solicitorStatisticsFn,
} from "utils/ApiFactory/statistics";
import { resolveUserRoleAccess } from "utils/resolveUserRoleAccess";

const Statistics = () => {
  const { user } = useContext(UserContext);
  // const myRole = resolveUserRoleAccess(user.role);
  
  const userRole = sessionStorage.getItem("__role");
  const myRole = resolveUserRoleAccess(userRole); 
  // console.log("CheckRole: ", myRole);
  // TODO: replace this across the wholw app before pushing to prod.   const myRole = resolveUserRoleAccess(user.role);

  const queryFns = {
    1: () => solicitorStatisticsFn(user.solicitorId),
    // 2: () => csoStatisticsFn("ymusa@providusbank.com"),
    2: () => csoStatisticsFn(user.email),
    3: () => legalStatisticsFn(),
    4: () => legalStatisticsFn(),
    5: () => legalStatisticsFn(),
  };

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: queryFns[myRole],

    select: (data) => {
      // console.log("dataFromSolicitors :", data);
      return data?.data?.data;
    },

    onError: (error) => {
      // console.log("StatisticsDataError: ", error);
    },
  });

  return (
    <div className="grid grid-cols-4 gap-6 px-8 py-6 mb-10 rounded-xl bg-white">
      {isLoading
        ? [...Array(4).keys()].map((itm) => (
            <Skeleton
              key={itm}
              variant="rounded"
              width="100%"
              animation="wave"
              height={116}
              sx={{ bgColor: "gray.200" }}
            />
          ))
        : Object.entries(statistics || {}).map(([name, count]) => (
            <div
              key={name}
              className="px-[18px] py-[20px] rounded-[10px] bg-primary"
            >
              <p className="text-[2rem] text-darkYellow font-bold mb-2">
                {count}
              </p>
              <p className="text-sm text-dark font-bold capitalize">
                {name
                  .replace(/[A-Z]/g, (c) => `${" "}${c.toLowerCase()}`)
                  .replace("number of", "")}
              </p>
            </div>
          ))}
    </div>
  );
};

export default Statistics;
