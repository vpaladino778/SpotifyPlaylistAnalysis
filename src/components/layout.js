import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import SearchBar from './searchbar'

const styles = {
    root: {
        textAlign: 'center'
    }
}
export default class Layout extends React.Component {

    render() {
        return (
            <div style={styles.root}>
                <Container text textAlign='center'>
                    <Header as='h1'>
                        Using Grid
                    </Header>
                    <SearchBar/>
                </Container>
            </div>
        )
    }
}