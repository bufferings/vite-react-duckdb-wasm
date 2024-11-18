import { TextField } from "@mui/material";
import type * as arrow from "apache-arrow";
import type { AsyncDuckDB } from "duckdb-wasm-kit";
import { useState } from "react";
import { useAsync, useDebounce } from "react-use";
import { MySpinner } from "./MySpinner.tsx";
import { MyTemperatureTable } from "./MyTemperatureTable.tsx";
import { useInitializedDuckDB } from "./useInitializedDuckDB.tsx";

const TABLE_NAME = "my_table";

export function HelloDockDB() {
  const { value: db, loading, error } = useInitializedDuckDB(TABLE_NAME);

  if (loading) {
    return <MySpinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <MyDuckDB db={db} />;
}

interface MyDuckDBProps {
  db: AsyncDuckDB;
}

function MyDuckDB({ db }: MyDuckDBProps) {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  useDebounce(
    () => {
      setSearchText(inputText);
    },
    500,
    [inputText],
  );

  const [result, setResult] = useState<arrow.Table | null>(null);

  useAsync(async () => {
    const conn = await db.connect();
    try {
      const pstmt = await conn.prepare(
        `select * from ${TABLE_NAME} WHERE 都道府県 like ? OR 地点 like ?`,
      );
      const sanitized = searchText.replace("%", "");
      const params = Array(2).fill(`%${sanitized}%`);
      const arrowTable = await pstmt.query(...params);
      // @ts-ignore
      setResult(arrowTable);
    } finally {
      await conn.close();
    }
  }, [searchText]);

  return (
    <>
      <TextField
        id="outlined-search"
        label="都道府県・地点"
        type="search"
        onChange={(e) => setInputText(e.target.value)}
        margin="normal"
        sx={{ width: "50ch" }}
      />
      <MyResultTable result={result} />
    </>
  );
}

interface MyResultTableProps {
  result: arrow.Table | null;
}

function MyResultTable({ result }: MyResultTableProps) {
  console.dir(result);
  if (!result) {
    return null;
  }

  const rows = result.toArray().map((row) => row.toJSON());
  return <MyTemperatureTable rows={rows} />;
}
