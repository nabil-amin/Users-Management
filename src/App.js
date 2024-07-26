import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Input,
  theme,
  Cascader,
  AutoComplete,
  Modal,
  Form,
} from "antd";
import { MdDashboard } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import "./App.css";
import Datalist from "./components/data";
import { data as initialData } from "./components/data";
const { Header, Content, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, children, className) {
  return {
    key,
    children,
    label,
    className,
  };
}

const uniqueFullname = [...new Set(initialData.map((item) => item.name))].map(
  (Fullname) => ({ value: Fullname, label: Fullname })
);
const uniqueUsername = [
  ...new Set(initialData.map((item) => item.UserName)),
].map((UserName) => ({ value: UserName, label: UserName }));

const uniqueGroups = [...new Set(initialData.map((item) => item.Group))].map(
  (group) => ({ value: group, label: group })
);

const uniqueStatuses = [...new Set(initialData.map((item) => item.Status))].map(
  (status) => ({ value: status, label: status })
);

const uniqueData = [...new Set(initialData.map((item) => item.Creaton))].map(
  (Creaton) => ({ value: Creaton, label: Creaton })
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("3");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(initialData);
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  const items = [
    getItem(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: collapsed && "fit-content",
        }}
      >
        <MdDashboard
          size={20}
          style={{
            marginRight: 8,
            height: "auto",
          }}
        />
        {!collapsed && <div>Dashboard</div>}
      </div>,
      "dashboard",
      null,
      selectedKey === "dashboard" ? "custom-selected" : ""
    ),
    getItem(
      "Settings",
      "settings",
      null,
      selectedKey === "settings" ? "custom-selected" : ""
    ),
    getItem(
      "ATM Setting",
      "sub1",
      [
        getItem(
          "empty",
          "1",
          null,
          selectedKey === "1" ? "custom-selected" : ""
        ),
      ],
      selectedKey === "sub1" ? "custom-selected" : ""
    ),
    getItem(
      "Business Setup",
      "sub2",
      [
        getItem(
          "empty",
          "2",
          null,
          selectedKey === "2" ? "custom-selected" : ""
        ),
      ],
      selectedKey === "sub2" ? "custom-selected" : ""
    ),
    getItem(
      "User Management",
      "sub3",
      [
        getItem(
          "Users",
          "3",
          null,
          selectedKey === "3" ? "custom-selected" : ""
        ),
        getItem(
          "Profiles",
          "4",
          null,
          selectedKey === "4" ? "custom-selected" : ""
        ),
        getItem(
          "Group",
          "5",
          null,
          selectedKey === "5" ? "custom-selected" : ""
        ),
      ],
      selectedKey === "sub3" ? "custom-selected" : ""
    ),
    getItem(
      "License Management",
      "15",
      null,
      selectedKey === "15" ? "custom-selected" : ""
    ),
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    const newUser = {
      key: (data.length + 1).toString(),
      name: values.name,
      UserName: values.name.toLowerCase().replace(" ", "."),
      EmailAddress: values.email,
      Group: values.group[0],
      Status: values.status[0],
      Creaton: new Date().toLocaleDateString(),
    };
    setData([...data, newUser]);
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ padding: "16px", textAlign: "center" }}>
          <img
            src="../unnamed.png"
            alt="logo"
            style={{ width: collapsed ? "40px" : "100px", height: "auto" }}
          />
        </div>
        <div style={{ padding: "16px" }}>
          <Search
            placeholder="Quick access"
            size="middle"
            style={{ width: "100%" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            marginTop: "24px",
            marginLeft: "20px",
            overflow: "initial",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              User Management
            </p>
            <Button
              type="primary"
              style={{
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
              }}
              size="large"
              onClick={showModal}
            >
              + Add New
            </Button>
          </div>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <AutoComplete
              options={uniqueFullname}
              style={{ width: "20%" }}
              placeholder={
                <>
                  <SearchOutlined style={{ marginRight: 8 }} />
                  Search
                </>
              }
            />
            <AutoComplete
              options={uniqueUsername}
              style={{ width: "10%" }}
              placeholder="User Name"
            />
            <Cascader
              options={uniqueStatuses}
              value="Any"
              style={{ width: "110px" }}
            />
            <Cascader
              options={uniqueData}
              value="All Time"
              style={{ width: "110px" }}
            />
            <Button type="text" className="button">
              All Filter
            </Button>
            <div style={{ width: "100%" }}>
              <Datalist data={data} />
            </div>
          </div>
        </Content>
      </Layout>
      <Modal
        className="modal"
        title={
          <div className="modal-header-title">
            <span className="modal-title-text">Add New User</span>
            <IoMdClose size={25} className="modal-close-icon" />
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          <div className="modal-footer">
            <Button key="reset" type="text" onClick={handleReset}>
              Reset Fields
            </Button>
            <div className="footer-buttons">
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="custom-selected"
                key="submit"
                type="primary"
                onClick={() => form.submit()}
              >
                Add User
              </Button>
            </div>
          </div>
        }
        width={400}
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Enter Full Name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="name"
            label="User Name"
            rules={[{ required: true, message: "Enter User Name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: "Enter User email address" }]}
          >
            <Input placeholder="Enter User email address" />
          </Form.Item>
          <Form.Item
            name="group"
            label="User Group"
            rules={[{ required: true, message: "Choose User Group" }]}
          >
            <Cascader options={uniqueGroups} placeholder="Choose User Group" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Assign Profile"
            rules={[{ required: true, message: "Choose Profile" }]}
          >
            <Cascader options={uniqueStatuses} placeholder="Choose Profile" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;
