import './style.css'
import Tooltip from './Tooltip';

function TooltipTest() {
  return (
    <div className='new-container'>
      <h1>Tooltip</h1>
      <Tooltip delay={500} content={"Tooltip Content"} children={<p>Hover Me</p>} />
    </div>
  );
}

export default TooltipTest;