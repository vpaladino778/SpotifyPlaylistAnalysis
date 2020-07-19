import React from "react";
import { Accordion, Grid, Icon, List, Header} from "semantic-ui-react";
import * as $ from "jquery";

export default class GenreListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header size="small">Genre: {this.props.genre}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header size="small">Percentage: {this.props.numSongs}</Header>
            {/* <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Song Names:
              </Accordion.Title>
              
              <Accordion.Content active={activeIndex === 0}>
                <List>
                  <List.Item>Apples</List.Item>
                  <List.Item>Pears</List.Item>
                  <List.Item>Oranges</List.Item>
                </List>
              </Accordion.Content>
            </Accordion> */}
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
