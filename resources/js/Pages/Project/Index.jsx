import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Index = ({ auth, projects, queryParams = null }) => {
    queryParams = queryParams || {};

    const handleFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        console.log(queryParams);

        router.get(route("project.index"), queryParams);
    };

    const handleNameSearch = (name, e) => {
        if (e.key !== "Enter") return;

        handleFieldChange(name, e.target.value);
    };

    const handleOrder = (name) => {
        if(name === queryParams.sort_field){
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("project.index"), queryParams);
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th
                                            onClick={(e) => handleOrder("id")}
                                            className="px-3 py-2"
                                        >
                                            id
                                        </th>
                                        <th className="px-3 py-2">image</th>
                                        <th
                                            onClick={(e) => handleOrder("name")}
                                            className="px-3 py-2"
                                        >
                                            name
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                handleOrder("status")
                                            }
                                            className="px-3 py-2"
                                        >
                                            status
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                handleOrder("created_at")
                                            }
                                            className="px-3 py-2"
                                        >
                                            created date
                                        </th>
                                        <th
                                            onClick={(e) =>
                                                handleOrder("due_date")
                                            }
                                            className="px-3 py-2"
                                        >
                                            due date
                                        </th>
                                        <th className="px-3 py-2">
                                            created by
                                        </th>
                                        <th className="px-3 py-2 text-right">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                defaultValue={queryParams.name}
                                                className="w-full text-white placeholder-shown:text-white/55"
                                                placeholder="Enter the name"
                                                onBlur={(e) =>
                                                    handleFieldChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    handleNameSearch("name", e)
                                                }
                                            ></TextInput>
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                defaultValue={
                                                    queryParams.status
                                                }
                                                className="w-full"
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select status
                                                </option>
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="in_progress">
                                                    In progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2 "></th>
                                    </tr>
                                </thead>
                                <tbody className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-transparent dark:text-gray-400 border-b-2 border-gray-500">
                                    {projects.data.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="text-nowrap normal-case"
                                        >
                                            <td className="px-3 py-2">
                                                {project.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={project.image_path}
                                                    alt="img"
                                                    className="w-32 min-w-32"
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-wrap">
                                                {project.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={
                                                        "py-2 px-3 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.created_at}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.createdBy.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route(
                                                        "project.edit",
                                                        project.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "project.destroy",
                                                        project.id
                                                    )}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
