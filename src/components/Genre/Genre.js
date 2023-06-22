import React from 'react'
import { Link } from 'react-router-dom'

const Genre = () => {
  return (
    <main>

      <div className='container'>
        <div className='genre-grid'>

          <div className="row">
            <div className="column">
              <div className='animation'>
                <Link to={'/search?genre=Literature'}><p>Literature</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Food'}><p>Food</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Motorsports'}><p>Motorsports</p></Link>
              </div>
            </div>
            <div className="column">
              <div className='animation'>
                <Link to={'/search?genre=Movies'}><p>Movies</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Music'}><p>Music</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Nature'}><p>Nature</p></Link>
              </div>
            </div>
            <div className="column">
              <div className='animation'>
                <Link to={'/search?genre=Sports'}><p>Sports</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Tech'}><p>Tech</p></Link>
              </div>
              <div className='animation'>
                <Link to={'/search?genre=Travelling'}><p>Travelling</p></Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>

  )
}

export default Genre