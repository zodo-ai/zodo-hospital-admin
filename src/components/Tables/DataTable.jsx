import { Table } from "antd";
import { onShowSizeChange, itemRender } from "../Pagination";
import PropTypes from "prop-types";
const DataTable = (props) => {
  const { columns, dataSource, loading } = props;
  console.log("DATA ",dataSource);
  
  return (
    <div className="table-responsive">
      <Table
        pagination={dataSource.length > 10 ? {
          total: dataSource.length,
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
          itemRender: itemRender,
        }: false}
        columns={columns}
        dataSource={dataSource || []}
        loading={loading}
        // scroll={{ y: 300 }}
        
        // rowSelection={rowSelection}
        // rowKey={(record) => record.id}
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.node,
  dataSource: PropTypes.node,
  loading: PropTypes.bool,
};

export default DataTable;
