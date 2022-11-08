import { useEffect, useState } from "react";
import { AllowedTo, useAbac } from "react-abac";
import BaseRequest from "./Axios.config";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    // const { data } = await BaseRequest.get("/posts", { retry: 3 });
    // setPosts(data);
    const posts = [
      {
        id: 1,
        title: "title 1",
        description: "description 1 []",
        owner: {
          id: 1,
        },
      },
      {
        id: 2,
        title: "title 2",
        description: "description 2 []",
        owner: {
          id: 1,
        },
      },
    ];

    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
    return () => null;
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <AllowedTo perform={"CONSULTAR"}>
        <div className="mt-20 grid grid-flow-col">
          {posts &&
            posts.map((p) => (
              <div key={p.id} className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{p?.title}</div>
                  <p className="text-gray-700 text-base">{p?.description}</p>
                </div>

                <AllowedTo perform={"MODIFICAR"} data={p}>
                  <div className="px-6 pt-4 pb-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => alert("Editar")}
                    >
                      Editar
                    </button>
                  </div>
                </AllowedTo>

                <div className="px-6 pt-4 pb-2">
                  <ButtonDelete post={p} />
                </div>
              </div>
            ))}
        </div>
      </AllowedTo>
    </div>
  );
};

const ButtonDelete = ({ post }) => {
  const { userHasPermissions } = useAbac();
  if (userHasPermissions("ELIMINAR", post)) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert("Deletar")}
      >
        Deletar
      </button>
    );
  }
  return <></>;
};

export default Posts;
