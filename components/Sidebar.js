export default function Sidebar() {
  return (
    <div style={{
      width: "300px", 
      flexDirection: "column", 
      gap: 24, 
      display: "flex", 
      padding: "32px", 
      backgroundColor: "#67003E", 
      height: "100vh"
    }}>
      <div style={{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between"
      }}>
        <p style={{fontSize: 28, fontWeight: 800}}>Love Talks</p>
        <img 
          width={32} 
          height={32} 
          src="./write.svg" 
          style={{
            width: 32, 
            height: 32, 
            padding: 8, 
            backgroundColor: "#fff", 
            borderRadius: 8, 
            cursor: "pointer"
          }}
        />
      </div>
      <div style={{
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        padding: 12, 
        backgroundColor: "rgba(255, 255, 255, 0.2)", 
        borderRadius: 8
      }}>
        <div style={{
          display: "flex", 
          alignItems: "center", 
          flexDirection: "row", 
          gap: 8
        }}>
          <span style={{
            height: 24, 
            width: 24, 
            padding: 2, 
            alignItems: 'center', 
            textAlign: "center", 
            justifyContent: "center", 
            backgroundColor: "#fff", 
            borderRadius: 4
          }}>❤️</span>
          <p style={{opacity: 0.9}}>New Talk</p>
        </div>
        <p style={{opacity: 0.4}}>Draft</p>
      </div>
    </div>
  );
} 