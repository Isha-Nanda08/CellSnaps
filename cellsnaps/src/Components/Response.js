import ReactMarkdownWithHtml from 'react-markdown';
import '../Styles/Response.css'
const MyComponent = (props) => {
  const markdownContent = props.text;
  return (
    <div className='response_container'>
      <ReactMarkdownWithHtml>{markdownContent}</ReactMarkdownWithHtml>
    </div>
  );
};

export default MyComponent;