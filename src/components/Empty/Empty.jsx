import './Empty.scss'

export default function Empty(props) {
  return <p className="empty">{props.children}</p>;
}