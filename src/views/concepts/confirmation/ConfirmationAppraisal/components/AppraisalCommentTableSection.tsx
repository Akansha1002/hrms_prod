import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from '@/components/ui/Input'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { AppraisalCommentField } from "../types";

type AppraisalCommentTableProps = {
  data: AppraisalCommentField[];
}

const { Tr, Td, TBody, THead, Th } = Table;

const columnHelper = createColumnHelper<AppraisalCommentField>();

const columns = [
  columnHelper.accessor("goals", {
    header: "Goals",
    cell: () => {
      return (
        <div>
          <Input
            textArea
            type="text"
          />
        </div>
      );
    }
  }),
  columnHelper.accessor("achievements", {
    header: "Achievements",
    cell: () => {
      return (
        <div>
          <Input
            textArea
            type="text"
          />
        </div>
      );
    }
  }),
  columnHelper.accessor("approverComments", {
    header: "Approver Comments",
    cell: () => {
      return (
        <div>
          <Input
            textArea
            type="text"
          />
        </div>
      );
    }
  }),
  {
    header: 'Action',
    id: 'action',
  },
];
const AppraisalCommentTableSection = ({ data = [] }: AppraisalCommentTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Card>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}

export default AppraisalCommentTableSection