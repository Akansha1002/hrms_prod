import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { Controller, Control, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Upload } from "@/components/ui/Upload";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import { TbTrash } from "react-icons/tb";

type FeedbackRatingTableProps = {
    control: Control<any>;
    errors: any;
}

const ActionColumn = ({ onDelete }: { onDelete: () => void }) => (
    <Tooltip title="Delete">
        <div
            className="text-xl cursor-pointer select-none font-semibold"
            role="button"
            onClick={onDelete}
        >
            <TbTrash />
        </div>
    </Tooltip>
);

const FeedbackRatingTable = ({
    control,
}: FeedbackRatingTableProps) => {
     const { Tr, Td, TBody, THead, Th } = Table;
    return (
        <div>FeedbackRatingTable</div>
    )
}

export default FeedbackRatingTable