import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ClusterizeJS from 'clusterize.js';

class ClusterizedContainer extends React.Component {

    constructor(props) {
        super(props);
        this.contentElem = null;
        this.clusterize = null;
        this.state = { };
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        const clusterizeOptions = {
            rows: this.props.children.map(row => ReactDOMServer.renderToString(row)),
            contentElem: this.contentElem,
            show_no_data_row: false
        };

        if (typeof this.props.scrollId !== 'undefined') {
            clusterizeOptions.scrollId = this.props.scrollId;
        } else {
            clusterizeOptions.scrollElem = this.props.scrollElem;
        }

        this.clusterize = new ClusterizeJS(clusterizeOptions);
    }

    componentWillUnmount() {
        if (this.clusterize) {
            this.clusterize.destroy(true);
            this.clusterize = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length === 0) {
            this.clusterize.clear();
        } else if (nextProps.children !== this.props.children && this.clusterize !== null) {
            this.clusterize.update(nextProps.children.map(row => ReactDOMServer.renderToString(row)));
        }
    }

    render() {
        const Tag = this.props.tag;
        return (
            <Tag
                className={this.props.className}
                style={this.props.style}
                onClick={this.props.onClick}
                ref={node => { this.contentElem = node; }}
            />
        );
    }
}

ClusterizedContainer.defaultProps = {
    children: [],
    style: { outline: 'none' },
    onClick: null,
    tag: 'div'
};

export default ClusterizedContainer;
