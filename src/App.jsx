import { Calendar, Layout, Badge } from "antd";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});

  const wrapperStyle = {
    width: "100%",
    height: "100vh",
    border: "1px solid #d9d9d9",
  };

  const handleDateSelect = (value) => {
    const date = value.format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  const handleContentChange = (e) => {
    const updatedNotes = { ...notes, [selectedDate]: e.target.value };
    setNotes(updatedNotes);
  };

  const cellRender = (current, info) => {
    const date = current.format("YYYY-MM-DD");
    const hasNotes = notes[date];
    if (info.type === "date") {
      return (
        <div className="notes-cell">
          {hasNotes && (
            <Badge count="📝" style={{ backgroundColor: "#52c41c" }} />
          )}
        </div>
      );
    }
    return info.originNode;
  };

  return (
    <Layout style={wrapperStyle}>
      <Header
        style={{
          fontSize: "2rem",
          background: "#001529",
          color: "#fff",
          paddingLeft: "2rem",
          margin: "0",
        }}
      >
        <h1 style={{ margin: 0, color: "#fff" }}>AntDesign Calendar</h1>
      </Header>

      <Layout>
        <Sider width={300} style={{ background: "#fff", padding: "20px" }}>
          <h2>Details for {selectedDate}</h2>
          <textarea
            value={notes[selectedDate] || ""}
            onChange={handleContentChange}
            placeholder="Enter your notes..."
            style={{
              width: "100%",
              height: "200px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "4px",
            }}
          />
        </Sider>
        <Layout style={{ padding: "0 20px" }}>
          <Content style={{ background: "#fff", padding: "20px" }}>
            <Calendar
              fullscreen={true}
              onSelect={handleDateSelect}
              cellRender={cellRender}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
