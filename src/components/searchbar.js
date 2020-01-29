import React from 'react'
import { Input } from 'semantic-ui-react'

export default class SearchBar extends React.Component {

    render() {
        return(
            <React.Fragment>
                  <Input style={{width: '30vw'}} placeholder='Enter a playlist link or ID...' />
            </React.Fragment>
        )
    }
}