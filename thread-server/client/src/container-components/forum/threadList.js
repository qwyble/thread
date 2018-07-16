import React from 'react';
import {Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';



class ThreadList extends React.Component{
  render(){
    return(
      <Table.Body>
        {this.props.threads.map((t, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Link
                  to={{
                    pathname: `/forum/thread/${t.id}`,
                    state: {
                      id: t.id,
                    }
                  }}
                >
                  {t.subject}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {t.userName}
              </Table.Cell>
              <Table.Cell>
                {t.category}
              </Table.Cell>
              <Table.Cell>
                {t.replies}
              </Table.Cell>
              <Table.Cell>
                {t.subs}
              </Table.Cell>
              <Table.Cell>
                {t.date ? t.date.slice(0, 10) : ''}
              </Table.Cell>
            </Table.Row>
        ))}
      </Table.Body>
    )
  }
}

export default ThreadList;
