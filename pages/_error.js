import React from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    return (
      <Layout title='Oh no :('>
        { 
          statusCode === 404 ? 
            <div className='message'>
              <h1>This page doen't exist :(</h1>
              <p><Link href='/'><a> Go to Home</a></Link></p>
            </div>
          : <div className='message'>
              <h1>There was an error :(</h1>
              <p>Try again in a few seconds</p>
            </div>
        }
        <style jsx>{`
          .message {
            padding: 100px 30px;
            text-align: center;            
          }
          h1 {
            margin-bottom: 2em;
          }
          a {
            color: #8756ca;
          }
        `}</style>
      </Layout>
    )
  }
}