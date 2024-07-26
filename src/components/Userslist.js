import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Select, DatePicker } from "antd";
import { GoPencil } from "react-icons/go";
import { MdDoDisturb } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
import { ImDownload3 } from "react-icons/im";
import moment from "moment";

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

const Userslist = ({ list }) => {
  const [data, setData] = useState(list);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setData(list);
  }, [list]);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (selectedRows.length > 0) {
      setSelectedData(selectedRows[0]);
    } else {
      setSelectedData(null);
    }
  };

  const handleOpenModal = () => {
    form.setFieldsValue({
      ...selectedData,
      Creaton: moment(selectedData.Creaton, "MMM DD,YYYY"),
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedData = data.map((item) =>
          item.key === selectedData.key
            ? {
                ...item,
                ...values,
                Creaton: values.Creaton.format("MMM DD,YYYY"),
              }
            : item
        );
        setData(updatedData);
        setIsModalVisible(false);
        setSelectedData(null);
        setSelectedRowKeys([]);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            onClick={handleOpenModal}
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
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="edit_user"
          initialValues={selectedData}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="UserName"
            label="User Name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EmailAddress"
            label="Email Address"
            rules={[
              { required: true, message: "Please input the email address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Group"
            label="Group"
            rules={[{ required: true, message: "Please select the group!" }]}
          >
            <Select>
              <Select.Option value="Office">Office</Select.Option>
              <Select.Option value="Managers">Managers</Select.Option>
              <Select.Option value="Head Office">Head Office</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
              <Select.Option value="Locked">Locked</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Creaton"
            label="Created on"
            rules={[
              { required: true, message: "Please select the creation date!" },
            ]}
          >
            <DatePicker format="MMM DD,YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Userslist;
