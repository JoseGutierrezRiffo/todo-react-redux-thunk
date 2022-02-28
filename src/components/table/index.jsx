import React from "react";
import { Button, Table } from "antd";

const TableComponent = ({ data, columns, handleAdd, loading }) => {
  return (
    <div className="container">
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        +
      </Button>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default TableComponent;
