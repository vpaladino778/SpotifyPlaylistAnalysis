import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const styles = {
    root: {
        maxWidth: '50vh',
        margin: 'auto',
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
                    <Header as='h3'>Container</Header>
                    <p>
                        A container is a fixed width element that wraps your site's content. It remains a constant
                        size and uses <b>margin</b> to center. Containers are the simplest way to center page
                        content inside a grid.
                    </p>                           
                </Container>
            </div>
        )
    }
}