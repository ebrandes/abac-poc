import { useEffect, useState } from "react";
import { AbacProvider, AllowedTo } from "react-abac";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Axios.config";
import Clients from "./Clients";
import Posts from "./Posts";
import { RULES } from "./rules";
import { useUserContext } from "./User.context";

function App() {
  const { user } = useUserContext();
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const returnFromBFF = [
      {
        program: "CLIENTES",
        description: "Módulo de clientes",
        permissions: [
          {
            code: "E",
            description: "ELIMINAR",
          },
          {
            code: "I",
            description: "INCLUIR",
          },
          {
            code: "M",
            description: "MODIFICAR",
          },
          {
            code: "C",
            description: "CONSULTAR",
          },
        ],
      },
      {
        program: "CLIENTES_DETALLES",
        description: "Clientes: pestaña detalles del cliente",
        permissions: [
          {
            code: "E",
            description: "ELIMINAR",
          },
          {
            code: "M",
            description: "MODIFICAR",
          },
          {
            code: "C",
            description: "CONSULTAR",
          },
          {
            code: "I",
            description: "INCLUIR",
          },
        ],
      },
      {
        program: "CLIENTES_ACCIONES",
        description: "Clientes: pestaña acciones del cliente",
        permissions: [
          {
            code: "C",
            description: "CONSULTAR",
          },
          {
            code: "E",
            description: "ELIMINAR",
          },
          {
            code: "I",
            description: "INCLUIR",
          },
          {
            code: "M",
            description: "MODIFICAR",
          },
        ],
      },
      {
        program: "USUARIOS_ROLES",
        description: "Usuários: configuraciones de roles, programas y permisos",
        permissions: [
          {
            code: "M",
            description: "MODIFICAR",
          },
          {
            code: "C",
            description: "CONSULTAR",
          },
          {
            code: "E",
            description: "ELIMINAR",
          },
          {
            code: "I",
            description: "INCLUIR",
          },
        ],
      },
      {
        program: "CLIENTES_RESUMEN",
        description: "Clientes: pestaña Resumen del cliente",
        permissions: [
          {
            code: "E",
            description: "ELIMINAR",
          },
          {
            code: "I",
            description: "INCLUIR",
          },
          {
            code: "M",
            description: "MODIFICAR",
          },
          {
            code: "C",
            description: "CONSULTAR",
          },
        ],
      },
      {
        program: "CLIENTES_RIESGOS",
        description: "Clientes: pestaña riesgo del cliente",
        permissions: [
          {
            code: "C",
            description: "CONSULTAR",
          },
        ],
      },
      null,
    ];

    // arr.reduce(function (acc, cur, i) {
    //   acc[i] = cur;
    //   return acc;
    // }, {});

    const mainRules = returnFromBFF?.reduce((acc, cur, i) => {
      acc[cur?.program] = cur?.permissions?.reduce((acc, cur, i) => {
        acc[cur.description] = true;
        return acc;
        // [p.description]: true,
      }, {});
      return acc;
    }, {});

    setRules(mainRules);
    console.log("R: ", mainRules);
    console.log("RULE: ", RULES);

    // const userPermissions = Object.entries(rules).map(([_, value]) => value);
    // const rx = Object.entries(rules).map(([_, value]) => value)

    // const userRoles = userPermissions.map((up) => {
    //   if (up) {
    //     return Object.keys(up)[0];
    //   }
    //   return '';
    // });
    // debugger;
    // setRules(rx);
    // setUser({
    //   ...user,
    //   roles: userRoles,
    // });
    // console.log(userPermissions.map(up => Object.keys(up)))
    // debugger;

    // setRules(mainRoles);
    // setUser({ ...user, roles: permissions });
  }, []);

  return (
    <AbacProvider user={user} roles={user?.roles} rules={rules}>
      <Router>
        <Routes>
          <Route path="/users" element={<Clients />} />
          <Route exact path="/" element={<Posts />} />
        </Routes>
      </Router>
    </AbacProvider>
  );
}

export default App;
