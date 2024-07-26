import React, { useState } from "react";
import { Button, Table } from "antd";
import { GoPencil } from "react-icons/go";
import { MdDoDisturb } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { ImDownload3 } from "react-icons/im";

export const data = [
  {
    key: "1",
    name: "Ramy Mohsen",
    UserName: "ramy.mohsen",
    EmailAddress: "ramy.mohsen@gogle.com",
    Group: "Office",
    Status: "Locked",
    Creaton: "Dec 10,2022",
  },
  {
    key: "2",
    name: "Hisham Hagag",
    UserName: "hisham.hagag",
    EmailAddress: "hisham.hagag@like.com",
    Group: "Managers",
    Status: "Inactive",
    Creaton: "Oct 22,2018",
  },
  {
    key: "3",
    name: "Khaled Adam",
    UserName: "khaled.adam",
    EmailAddress: "khaled.adam@like.com",
    Group: "Office",
    Status: "Active",
    Creaton: "Oct 15,2018",
  },
  {
    key: "4",
    name: "كريم فاروق",
    UserName: "kareem.farouk",
    EmailAddress: "kareem.farouk@nuvb.net",
    Group: "Office",
    Status: "Active",
    Creaton: "Jun 17,2022",
  },
  {
    key: "5",
    name: "Nour Hamdy",
    UserName: "nour.hamdy",
    EmailAddress: "nour.hamdy@lisi.com",
    Group: "Managers",
    Status: "Active",
    Creaton: "Sep 9,2019",
  },
  {
    key: "6",
    name: "حنان فوزي",
    UserName: "hanan.fawzy",
    EmailAddress: "hanan.fawzy@buno.net",
    Group: "Head Office",
    Status: "Active",
    Creaton: "Sep 21,2022",
  },
  {
    key: "7",
    name: "ايمان ادم",
    UserName: "iman.adam",
    EmailAddress: "iman.adam@fadok.net",
    Group: "Office",
    Status: "Active",
    Creaton: "Dec 27,2022",
  },
  {
    key: "8",
    name: "Mayar Farouq",
    UserName: "mayar.farouq",
    EmailAddress: "mayar.farouq@share.net",
    Group: "Head Office",
    Status: "Active",
    Creaton: "Feb 14,2022",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => {
      const initials = text
        .split(" ")
        .map((word) => word[0])
        .filter((char) => char)
        .join("")
        .toUpperCase();
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={styles.circle}>{initials}</div>
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      );
    },
  },
  {
    title: "User Name",
    dataIndex: "UserName",
  },
  {
    title: "Email Address",
    dataIndex: "EmailAddress",
  },
  {
    title: "Group",
    dataIndex: "Group",
  },
  {
    title: "Status",
    dataIndex: "Status",
  },
  {
    title: "Created on",
    dataIndex: "Creaton",
  },
];

const styles = {
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: 15,
    marginRight: 8,
  },
};

const Datalist = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {hasSelected ? `${selectedRowKeys.length} selected` : "0 selected"}
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            <GoPencil color="black" />
          </Button>
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            <MdDoDisturb color="black" />
          </Button>
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            <FaUnlockAlt color="black" />
          </Button>
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Assign to profile
          </Button>
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Assign to Group
          </Button>
          <Button
            type="default"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            <TbDotsVertical color="black" />
          </Button>
          <Button
            type="text"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            unselect all
          </Button>
        </div>
        <Button
          type="default"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          <ImDownload3 color="black" />
        </Button>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Datalist;
