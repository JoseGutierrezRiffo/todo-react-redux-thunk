import React, { useEffect, useState } from "react";
import { Form, Modal, Tag, Space, Button, Input, Switch } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TableComponent from "./components/table";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodoAction,
  deleteTodoAction,
  listTodoAction,
  updateTodoAction,
} from "./actions/todoActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todos);

  const [form] = Form.useForm();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { confirm } = Modal;

  useEffect(() => {
    dispatch(listTodoAction());
  }, []);

  // FUNC MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    cleanForm();
  };

  const handleAdd = () => {
    showModal();
  };

  const handleEdit = (value) => {
    setSelectedTodo(value);
    form.setFieldsValue(value);
    showModal();
  };

  // FUNC NOTIFICACION
  const showConfirmDelete = (id) => {
    confirm({
      title: "¿Desea eliminar este registro?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteTodoAction(id));
      },
    });
  };

  const handleDelete = (id) => {
    showConfirmDelete(id);
  };

  const onFinish = (values) => {
    if (selectedTodo !== null) {
      dispatch(
        updateTodoAction({
          ...values,
          id: selectedTodo.id,
        })
      );
      setIsModalVisible(false);
      cleanForm();
    } else {
      dispatch(createTodoAction(values));
      setIsModalVisible(false);
      cleanForm();
    }
  };

  const cleanForm = () => {
    form.setFieldsValue({ description: "", currentState: null });
    setSelectedTodo(null);
  };

  const columns = [
    {
      title: "Nro Tarea",
      dataIndex: "id",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Descripcion",
      dataIndex: "description",
    },
    {
      title: "Fecha de Ingreso",
      dataIndex: "dateAdmission",
    },
    {
      title: "Vigencia",
      dataIndex: "currentState",

      render: (text) => {
        return (
          <>
            <Tag key={text?.id}>{text ? "Vigente" : "No Vigente"}</Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, text) => {
        return (
          <Space size="middle">
            <Button type="link" onClick={() => handleEdit(text)}>
              Editar
            </Button>
            <Button type="link" onClick={() => handleDelete(text.id)}>
              Eliminar
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="App">
      <TableComponent
        data={todos}
        columns={columns}
        loading={isLoading}
        handleAdd={handleAdd}
      />
      <Modal
        title={selectedTodo === null ? "Crear Registro" : "Editar Registro"}
        visible={isModalVisible}
        onCancel={handleCancel}
        maskClosable={false}
        footer={false}
      >
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={selectedTodo}
        >
          <Form.Item
            label="Descripcion"
            name="description"
            rules={[
              {
                required: true,
                message: "Debes ingresar una descripcion",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="currentState"
            label="Vigente"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {selectedTodo ? "EDITAR REGISTRO" : "CREAR NUEVO REGISTRO"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
