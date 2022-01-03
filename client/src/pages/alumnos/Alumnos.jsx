import "./alumnos.scss";
import { Table } from "antd";
import columns from "./Columns";

const Alumnos = () => {
  return (
    <>
      <h2 className="title__admin">Lista de Alumnos</h2>
      <Table columns={columns} />
    </>
  );
};

export default Alumnos;
