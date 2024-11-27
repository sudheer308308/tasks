import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";

const Userstable = () => {
    const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );

      const total = response.headers.get("x-total-count");
      const users = await response.json();

      setData(users.map((user) => ({ key: user.id, ...user })));
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize,
        total: parseInt(total, 10),
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } 
      setLoading(false);
    
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
  ];

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>User Data</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          onChange={handleTableChange}
          bordered
        />
      </Spin>
    </>
  );
}
export default Userstable;