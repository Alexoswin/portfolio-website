

export default function SectionCard({ title }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <button className="btn btn-add">Add</button>
      <button className="btn btn-delete">Delete</button>
    </div>
  );
}

const styles = {
  card: {
    
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    minWidth: '200px',
    textAlign: 'center',
    display: 'inline-block',
    margin: '5vh'
  }
};
