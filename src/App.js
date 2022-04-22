import logo from './logo.svg';
import './App.css';
import { useState } from "react";


function App() {
  const [state, _setState] = useState({
    listData: [{ title: "test", body: "hello", id: 121313 }]
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data
    });
  };
  const handleDelete = (item) => {
    const newData = state.listData.filter((e) => e.id !== item.id);
    setState({
      listData: newData
    });
  };
  const handleUpdate = (item) => {
    setState({
      title: item.title,
      body: item.body,
      id: item.id,
      isUpdate: true
    });
  };
  const handleCreateOrUpdate = () => {
    if (state?.isUpdate) {
      let item = state.listData.find((item) => item.id === state.id);
      item.title = state.title;
      item.body = state.body;
      setState({
        listData: [...state.listData],
        isUpdate: false,
        title: "",
        body: "",
        id: ""
      });
    } else {
      const data = [
        ...state.listData,
        {
          id: Math.trunc(Math.random() * 100000),
          title: state.title,
          body: state.body
        }
      ];
      setState({
        listData: data,
        isUpdate: false,
        title: "",
        body: ""
      });
    }
  };
  return (
    <div className="App">
      <div className="header">
        <div>
          <div>Title</div>
          <div>
            <input
              value={state?.title}
              onChange={(e) =>
                setState({
                  title: e.target.value
                })
              }
            />
          </div>
          <div>
            <button onClick={handleCreateOrUpdate}>
              {state?.isUpdate ? "Update" : "Create"}
            </button>
          </div>
        </div>
        <div>
          <div>body</div>
          <div>
            <input
              value={state?.body}
              onChange={(e) =>
                setState({
                  body: e.target.value
                })
              }
            />
          </div>
          <div></div>
        </div>
      </div>
      <div className="body">
        {(state?.listData || []).map((item, index) => {
          return (
            <ListItem
              key={index}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}
const ListItem = ({ item, onDelete, onUpdate }) => {
  return (
    <div>
      <div onClick={() => onUpdate(item)}>
        <div>{item?.title}</div>
        <div>{item?.body}</div>
      </div>
      <div>
        <button onClick={() => onDelete(item)}>Delete</button>
        <button onClick={() => onUpdate(item)}>Update</button>
      </div>
    </div>
  );
};

export default App;