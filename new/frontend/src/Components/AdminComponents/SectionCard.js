import { useNavigate } from 'react-router-dom';

export default function SectionCard({ title , addPath, deletePath }) {
  const navigate = useNavigate();
  const RedirectForm=()=>{
      navigate(addPath)
  }
  const RedirectDelete=()=>{
      navigate(deletePath)
  }
  return (
    <div style={styles.card}>
      <h5 style={styles.heading}>{title}</h5>
      <button onClick={RedirectForm} className="btn btn-add">Add</button>
      <button onClick={RedirectDelete} className="btn btn-delete">Delete</button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'var(--containerBackground)',
    color: 'var(--containerTextColor)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    minWidth: '200px',
    textAlign: 'center',
    display: 'inline-block',
    margin: '0.5vh',
    position: 'relative',
    transition: 'all 0.3s ease-in',
  },
  heading: {
    color: 'var(--containerTextColor)',
    marginBottom: '15px',
  }
};
