import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
    const paginationLinks = links.map((link, index) => (
        <Link
            preserveScroll
            key={link.label} 
            href={link.url || "#"} 
            className={
                "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
                (link.active ? "bg-gray-950 " : " ") +
                (!link.url
                    ? "!text-gray-500 cursor-not-allowed "
                    : "hover:bg-gray-950")
            }
            dangerouslySetInnerHTML={{ __html: link.label }} 
        ></Link>
    ));

    return <nav className="mx-auto">{paginationLinks}</nav>;
};

export default Pagination;
