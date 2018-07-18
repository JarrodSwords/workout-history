import React from 'react';
import * as personResource from 'resources/person-resource';

export class PersonProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { person: null };
    }

    componentDidMount() {
        const { personId } = this.props;
        personResource.fetch(personId)
            .then(person => {
                this.setState({ person });
            })
            .catch(err => {
                console.log(err.message)
            });
    }

    render() {
        return <div>
            {this.props.render(this.state)}
        </div>;
    }
}
