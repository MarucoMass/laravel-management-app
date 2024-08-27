import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const TableHeading = ({
    name,
    sortField = null,
    sortDirection = null,
    sortable = true,
    handleOrder = () => {},
    children,
}) => {
    return (
        <th onClick={(e) => handleOrder(name)}>
            <div className="p-3 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sortField === name && sortDirection === "asc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-1 " +
                                (sortField === name && sortDirection === "desc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
};

export default TableHeading;
