import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { type TableComponents, TableVirtuoso } from "react-virtuoso";
import type { TemperatureData } from "./types.ts";

interface ColumnData {
  dataKey: keyof TemperatureData;
  label: string;
  numeric?: boolean;
  width?: number;
}

const columns: ColumnData[] = [
  {
    width: 100,
    label: "観測所番号",
    dataKey: "観測所番号",
  },
  {
    width: 200,
    label: "都道府県",
    dataKey: "都道府県",
  },
  {
    width: 200,
    label: "地点",
    dataKey: "地点",
  },
  {
    width: 50,
    label: "11月18日の最高気温(℃)",
    dataKey: "18日の最高気温(℃)",
    numeric: true,
  },
  {
    width: 130,
    label: "平年差（℃）",
    dataKey: "平年差（℃）",
    numeric: true,
  },
  {
    width: 130,
    label: "前日差（℃）",
    dataKey: "前日差（℃）",
    numeric: true,
  },
];

const VirtuosoTableComponents: TableComponents<TemperatureData> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: TemperatureData) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align={column.numeric || false ? "right" : "left"}>
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export function MyTemperatureTable({ rows }: { rows: TemperatureData[] }) {
  return (
    <Paper style={{ height: 600, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
