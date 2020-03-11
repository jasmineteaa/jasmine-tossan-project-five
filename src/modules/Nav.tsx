import * as React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = (): JSX.Element => {
  return (
    <div className="topBar">
      <div className="wrapper clearfix">
        <div className="barContent">
          <div className="logo">
            {/* @@TODO SVG imports */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px"><g><path d="M8,34h2v4H8ZM4,49.382V44.618l2-1v6.764ZM8,54V40h2V54Zm8-16v2H14v2h2v2H14v2h2v2H14v2h2v2H14v2h2v2H12V38ZM56,22H54V20h2ZM8,20h2v2H8Zm2,8H8V24h2ZM53.44,14.1C50.024,12.426,40.422,10,32,10s-18.024,2.426-21.44,4.1l-.56.275V18H8V12.641A61.881,61.881,0,0,1,32,8a61.881,61.881,0,0,1,24,4.641V18H54V14.377ZM56,24v4H54V24ZM54,34h2v4H54ZM52,56H48V54h2V52H48V50h2V48H48V46h2V44H48V42h2V40H48V38h4Zm4-2H54V40h2Zm4-4.618-2,1V43.618l2,1Z" /><path d="M40.469,40.435a6.046,6.046,0,0,0-7.794,0,1,1,0,0,1-1.35,0,6.044,6.044,0,0,0-7.794,0,4.4,4.4,0,0,0,0,6.675L32,54.66,40.479,47.1a4.4,4.4,0,0,0-.01-6.667ZM27,45H25V43h2Zm4,3H29V46h2Z" /><rect x="8" y="30" width="2" height="2" /><rect x="54" y="30" width="2" height="2" /></g><text x="0" y="79" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Smalllike</text><text x="0" y="84" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
            <p className="company">Music Thing</p>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/playlist">Playlist</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

  )
}


export default Nav;
